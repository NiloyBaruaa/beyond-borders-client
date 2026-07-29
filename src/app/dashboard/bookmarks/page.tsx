'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Bookmarks() {
  const router = useRouter();
  const [savedVideos, setSavedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) return router.push('/');

    const fetchData = async () => {
      try {
        // 1. Fetch user data to get bookmarked IDs
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        const bookmarkedIds = userData.bookmarkedVideos || [];

        // 2. Fetch all modules to find the matching videos
        const modRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const allModules = await modRes.json();

        // 3. Match them up
        let extractedVideos: any[] = [];
        allModules.forEach((mod: any) => {
          mod.videos?.forEach((vid: any) => {
            if (bookmarkedIds.includes(vid.videoId)) {
              extractedVideos.push({ ...vid, moduleId: mod.moduleId, moduleTitle: mod.title });
            }
          });
        });

        setSavedVideos(extractedVideos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-gray-800">
        <div className="text-2xl font-bold tracking-wider text-primaryAccent cursor-pointer" onClick={() => router.push('/dashboard')}>
          SAWN BD <span className="text-sm font-normal text-gray-500">Library</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-400 hover:text-white transition bg-gray-800 px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-6">
            <span className="text-4xl">⭐</span>
            <div>
              <h1 className="text-3xl font-bold">Saved Bookmarks</h1>
              <p className="text-gray-400">Quickly access the videos you saved for review.</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-primaryAccent animate-pulse mt-20">Loading Library...</div>
          ) : savedVideos.length === 0 ? (
            <div className="bg-cardBg border border-gray-800 p-12 rounded-xl text-center">
              <p className="text-gray-500 mb-4">You have not bookmarked any videos yet.</p>
              <button onClick={() => router.push('/dashboard')} className="bg-primaryAccent hover:bg-purple-500 text-white px-6 py-2 rounded transition">
                Explore Curriculum
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVideos.map((vid, idx) => (
                <div key={idx} className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden hover:border-primaryAccent transition group">
                  <div className="aspect-video bg-[#111] flex items-center justify-center relative">
                    <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform">▶</span>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {vid.duration || 'Video'}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primaryAccent font-bold uppercase tracking-wider mb-1 block">Module {vid.moduleId}: {vid.moduleTitle}</span>
                    <h3 className="font-bold text-white text-lg line-clamp-2 mb-4">{vid.title}</h3>
                    <button 
                      onClick={() => router.push(`/dashboard/class/${vid.moduleId}`)}
                      className="w-full bg-darkBg border border-gray-700 hover:bg-gray-800 text-white py-2 rounded text-sm transition"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
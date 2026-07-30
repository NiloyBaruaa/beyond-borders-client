'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import WatermarkPlayer from '@/app/Components/WatermarkPlayer';

// Helper to extract the 11-character YouTube ID from any link format
const extractYouTubeId = (url: string) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url; 
};

export default function Classroom({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const moduleId = resolvedParams.moduleId;

  const [moduleData, setModuleData] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) return router.push('/');

    const fetchModuleData = async () => {
      try {
        // 1. Fetch the user to get their email for the Watermark
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setStudentEmail(userData.email);
        }

        // 2. Fetch the modules
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error("Failed to fetch modules");
        
        const data = await response.json();
        const current = data.find((m: any) => m.moduleId === parseInt(moduleId));
        
        if (current) {
          setModuleData(current);
          if (current.videos && current.videos.length > 0) {
            setActiveVideo(current.videos[0]); // Auto-play first video
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchModuleData();
  }, [moduleId, router]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primaryAccent animate-pulse">Loading Classroom...</div>;
  if (!moduleData) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Module not found.</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col h-screen overflow-hidden">
      {/* NAVBAR */}
      <header className="bg-[#0a0a0a] border-b border-gray-800 py-4 px-6 flex justify-between items-center shrink-0">
        <div className="text-xl font-bold tracking-wider text-white">
          Module {moduleId}: <span className="text-primaryAccent">{moduleData.title}</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
          Back to Dashboard
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* MAIN VIDEO PLAYER */}
        <main className="flex-1 bg-black flex flex-col relative overflow-y-auto">
          {activeVideo ? (
            <div className="w-full bg-black">
              {/* THE NEW ANTI-PIRACY PLAYER */}
              <WatermarkPlayer 
                youtubeId={extractYouTubeId(activeVideo.videoUrl)} 
                email={studentEmail || "Student"} 
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-[#0a0a0a] flex items-center justify-center border-b border-gray-800">
              <p className="text-gray-500">No video selected or available.</p>
            </div>
          )}

         <div className="p-8 max-w-4xl flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{activeVideo?.title || moduleData.title}</h1>
              <p className="text-gray-400 leading-relaxed mb-8">{moduleData.description}</p>
            </div>
            
            {activeVideo && (
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/toggle-bookmark`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
                      body: JSON.stringify({ videoId: activeVideo.videoId })
                    });
                    if (res.ok) alert("Bookmark status updated! (Check your Bookmark Library)");
                  } catch (e) {}
                }}
                className="bg-darkBg border border-gray-700 hover:border-primaryAccent text-white px-4 py-2 rounded flex items-center gap-2 transition shrink-0 ml-4"
              >
                <span>⭐</span> Save to Library
              </button>
            )}
          </div>
        </main>

        {/* PLAYLIST SIDEBAR */}
        <aside className="w-96 bg-[#0a0a0a] border-l border-gray-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-800">
            <h3 className="font-bold text-lg mb-1">Course Content</h3>
            <p className="text-xs text-gray-500">{moduleData.videos?.length || 0} Videos • {moduleData.quizzes?.length || 0} Questions</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {moduleData.videos?.map((vid: any, idx: number) => (
              <div 
                key={vid.videoId}
                onClick={() => setActiveVideo(vid)}
                className={`p-4 rounded-lg cursor-pointer transition flex gap-4 ${activeVideo?.videoId === vid.videoId ? 'bg-primaryAccent/10 border border-primaryAccent' : 'bg-cardBg border border-gray-800 hover:border-gray-600'}`}
              >
                <div className="mt-1">
                  {activeVideo?.videoId === vid.videoId ? <span className="text-primaryAccent">▶</span> : <span className="text-gray-500">{idx + 1}</span>}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${activeVideo?.videoId === vid.videoId ? 'text-primaryAccent' : 'text-white'}`}>{vid.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{vid.duration || 'Video'}</p>
                </div>
              </div>
            ))}
          </div>

         {/* ASSESSMENT BUTTON */}
          <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
            <button 
              onClick={() => router.push(`/dashboard/quiz/${moduleId}`)}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold text-lg py-4 rounded-xl transition-transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] flex justify-center items-center gap-2"
            >
              <span>📝</span> Take Module Assessment
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
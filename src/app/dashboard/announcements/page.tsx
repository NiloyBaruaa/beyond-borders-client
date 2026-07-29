'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentAnnouncements() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [activePost, setActivePost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndMarkRead = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/announcements`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
        });
        const data = await res.json();
        setAnnouncements(data.posts);
        if (data.posts.length > 0) setActivePost(data.posts[0]); // Auto-select first
        
        // Silently mark as read so the notification dot clears
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/announcements/read`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
        });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchAndMarkRead();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#050505] text-primaryAccent flex justify-center items-center">Loading Communications...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-gray-800 shrink-0">
        <div className="text-2xl font-bold tracking-wider text-primaryAccent">
          Official <span className="text-white">Broadcasts</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Back to Dashboard</button>
      </header>

      <div className="flex flex-1 overflow-hidden p-6 gap-6 max-w-7xl mx-auto w-full">
        {/* LEFT PANE: LIST */}
        <aside className="w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {announcements.length === 0 ? <p className="text-gray-500">No broadcasts available.</p> : announcements.map((post) => (
            <div 
              key={post._id} 
              onClick={() => setActivePost(post)}
              className={`p-4 rounded-xl cursor-pointer transition border ${activePost?._id === post._id ? 'bg-primaryAccent/10 border-primaryAccent' : 'bg-cardBg border-gray-800 hover:border-gray-600'}`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-warningRed/20 p-2 rounded text-warningRed mt-1">📢</div>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${activePost?._id === post._id ? 'text-primaryAccent' : 'text-white'}`}>{post.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{new Date(post.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* RIGHT PANE: READING AREA */}
        <main className="w-2/3 bg-cardBg border border-gray-800 rounded-xl p-8 overflow-y-auto shadow-2xl">
          {activePost ? (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{activePost.title}</h1>
              <div className="flex items-center gap-2 mb-8 pb-6 border-b border-gray-800">
                <div className="h-8 w-8 bg-primaryAccent rounded-full flex items-center justify-center text-xs font-bold">{activePost.author.charAt(0)}</div>
                <span className="text-sm font-bold text-gray-300">{activePost.author}</span>
                <span className="text-sm text-gray-500 mx-2">•</span>
                <span className="text-sm text-gray-500">{new Date(activePost.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                {activePost.content}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">Select a broadcast to read.</div>
          )}
        </main>
      </div>
    </div>
  );
}
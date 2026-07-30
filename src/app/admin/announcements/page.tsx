'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAnnouncements() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/announcements`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      setPosts(await res.json());
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/announcements/${currentId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/announcements`;
      
      await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ title, content })
      });
      
      // Reset
      setTitle(''); setContent(''); setIsEditing(false); setCurrentId('');
      fetchPosts();
    } catch (e) { alert("Error saving broadcast"); }
  };

  const handleEdit = (post: any) => {
    setIsEditing(true);
    setCurrentId(post._id);
    setTitle(post.title);
    setContent(post.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this broadcast?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      fetchPosts();
    } catch (e) { alert("Error deleting"); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-primaryAccent">Broadcast Manager</h1>
          <button onClick={() => router.push('/admin/system')} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Back to System Core</button>
        </div>

        <div className="bg-cardBg p-8 rounded-xl border border-gray-800 mb-10 shadow-2xl">
          <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Broadcast' : 'Deploy New Broadcast'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Headline Title" className="w-full bg-darkBg border border-gray-700 p-4 rounded-lg font-bold text-white focus:border-primaryAccent outline-none" />
            <textarea required rows={6} value={content} onChange={e => setContent(e.target.value)} placeholder="Write your full message here... (Line breaks will be saved)" className="w-full bg-darkBg border border-gray-700 p-4 rounded-lg text-white focus:border-primaryAccent outline-none"></textarea>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-primaryAccent hover:bg-purple-500 text-white font-bold py-3 rounded-lg">
                {isEditing ? 'Update Broadcast' : 'Send to All Recruits'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setTitle(''); setContent(''); }} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Live History</h2>
          {Array.isArray(posts) && posts.map((post: any) => (
            <div key={post._id} className="bg-darkBg border border-gray-800 p-6 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(post)} className="text-neonBlue hover:text-blue-400 font-bold text-sm">Edit</button>
                <button onClick={() => handleDelete(post._id)} className="text-warningRed hover:text-red-400 font-bold text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
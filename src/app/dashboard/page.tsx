'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'course' | 'conceptual'>('course');

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) return router.push('/');

    const fetchDashboardData = async () => {
      try {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error("Not authorized");
        setStudent(await userRes.json());

        // Fetch Modules and Sessions
        const contentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const contentData = await contentRes.json();
        
        setModules(contentData.modules.sort((a: any, b: any) => a.moduleId - b.moduleId));
        setSessions(contentData.sessions); 

        const annRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/announcements`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setHasUnread((await annRes.json()).hasUnread);
      } catch (err) {
        localStorage.removeItem('bootcamp_token');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primaryAccent font-bold tracking-widest animate-pulse">LOADING...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-gray-800 sticky top-0 z-40 shadow-md">
        <div className="text-2xl font-bold tracking-wider text-white">
          SAWN <span className="text-primaryAccent">BD</span>
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 p-2 rounded-lg transition relative">
            {hasUnread && <span className="absolute top-1 left-1 h-3 w-3 bg-warningRed border-2 border-[#0a0a0a] rounded-full animate-pulse z-10"></span>}
            <div className="h-10 w-10 bg-primaryAccent rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              {student?.name?.charAt(0)}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold">{student?.name}</span>
              <span className="text-xs text-gray-400">💎 {student?.gems} Gems</span>
            </div>
            <span className="text-gray-400 text-xs">▼</span>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-[#111] border border-gray-800 rounded-xl shadow-2xl py-4 z-50">
              <div className="px-6 pb-4 border-b border-gray-800 mb-2 text-center">
                <div className="h-16 w-16 bg-primaryAccent rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-3 shadow-lg">
                  {student?.name?.charAt(0)}
                </div>
                <h4 className="font-bold text-white">{student?.name}</h4>
                <p className="text-xs text-gray-500 mb-3">ID: BB-{student?._id?.substring(0, 4).toUpperCase()}</p>
              </div>
              <ul className="flex flex-col text-sm text-gray-300">
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/profile');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">Profile</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">My Classes</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/bookmarks');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">Bookmark Library</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/helpdesk');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">Helpdesk</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/student-analytics');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">Student Analytics</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/leaderboard');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition">Leaderboard</li>
                <li onClick={() => {setIsProfileOpen(false); router.push('/dashboard/announcements');}} className="px-6 py-3 hover:bg-gray-800 hover:text-primaryAccent cursor-pointer transition border-b border-gray-800 pb-4 flex justify-between items-center">
                  Announcements {hasUnread && <span className="text-[10px] bg-warningRed text-white px-1.5 py-0.5 rounded animate-pulse">New</span>}
                </li>
                <li onClick={() => { localStorage.removeItem('bootcamp_token'); router.push('/'); }} className="px-6 pt-4 pb-2 hover:text-warningRed cursor-pointer transition mt-2">Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-white">
            Welcome Back <span className="text-primaryAccent">{student?.name?.split(' ')[0]}</span>
          </h1>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800 mb-8">
            <button 
              onClick={() => setActiveTab('course')}
              className={`px-8 py-4 font-bold text-sm transition-all relative ${activeTab === 'course' ? 'text-primaryAccent' : 'text-gray-500 hover:text-gray-300'}`}
            >
              🚀 Level 1 Course
              {activeTab === 'course' && <span className="absolute bottom-0 left-0 w-full h-1 bg-primaryAccent rounded-t-md"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('conceptual')}
              className={`px-8 py-4 font-bold text-sm transition-all relative ${activeTab === 'conceptual' ? 'text-primaryAccent' : 'text-gray-500 hover:text-gray-300'}`}
            >
              🎥 Conceptual Session
              {activeTab === 'conceptual' && <span className="absolute bottom-0 left-0 w-full h-1 bg-primaryAccent rounded-t-md"></span>}
            </button>
          </div>

          {/* Tab 1: Course Grid */}
          {activeTab === 'course' && (
            <div className="animate-fade-in">
              {modules.length === 0 ? (
                <div className="text-center text-gray-500 p-12 bg-cardBg rounded-xl border border-gray-800">No modules deployed yet.</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modules.map((mod) => {
                    const isCompleted = student?.completedModules?.includes(mod.moduleId);
                    return (
                      <div key={mod.moduleId} onClick={() => router.push(`/dashboard/class/${mod.moduleId}`)} className="bg-cardBg border border-gray-800 rounded-2xl p-6 cursor-pointer hover:border-primaryAccent transition-all hover:-translate-y-1 group relative overflow-hidden flex flex-col h-full shadow-lg">
                        <div className="absolute top-0 right-0 m-4">
                          {isCompleted ? <span className="bg-successGreen/20 text-successGreen text-xs font-bold px-2 py-1 rounded">Completed</span> : <span className="bg-gray-800 text-gray-400 text-xs font-bold px-2 py-1 rounded">In Progress</span>}
                        </div>
                        <h3 className="text-xs font-bold text-primaryAccent uppercase tracking-widest mb-2 mt-2">Module {mod.moduleId}</h3>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-neonBlue transition">{mod.title}</h4>
                        <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1">{mod.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-800 pt-4 mt-auto">
                          <span className="flex items-center gap-1">🎥 {mod.videos?.length || 0} Videos</span>
                          <span className="flex items-center gap-1">📝 {mod.quizzes?.length || 0} Questions</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Conceptual Sessions */}
          {activeTab === 'conceptual' && (
            <div className="animate-fade-in space-y-6 max-w-4xl">
              {sessions.length === 0 ? (
                <div className="text-center text-gray-500 p-12 bg-cardBg rounded-xl border border-gray-800">No conceptual sessions scheduled yet.</div>
              ) : (
                sessions.map((session) => (
                  <div key={session._id} className="bg-cardBg border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg hover:border-primaryAccent transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-warningRed/20 text-warningRed text-xs font-bold px-2 py-1 rounded border border-warningRed/30">LIVE SESSION</span>
                        <span className="text-sm text-gray-400">Cohort Batch {session.batchNumber}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{session.description}</p>
                      <div className="flex items-center gap-4 text-sm font-bold text-primaryAccent">
                        <span>📅 {session.date}</span>
                        <span>⏰ {session.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col w-full md:w-auto gap-3 shrink-0">
                      {session.zoomLink && (
                        <a href={session.zoomLink} target="_blank" rel="noreferrer" className="bg-neonBlue hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-center transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          Join Live Zoom
                        </a>
                      )}
                      {session.recordedVideoUrl && (
                        <a href={session.recordedVideoUrl} target="_blank" rel="noreferrer" className="bg-darkBg border border-primaryAccent hover:bg-primaryAccent text-white font-bold py-3 px-8 rounded-xl text-center transition-colors">
                          Watch Recording
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Mentorship Scheduler Section */}
          <section className="mt-16 border-t border-gray-800 pt-12 mb-12">
            <div className="bg-cardBg border border-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Book Your 1:1 Live Mock Interview</h2>
              <p className="text-gray-400 mb-8">Select a time slot below to practice your embassy interview directly with Niloy.</p>
              
              <div className="w-full h-[600px] rounded-xl overflow-hidden bg-white">
                <iframe 
                  src="https://cal.com/niloy-baruaa/mock-interview" 
                  className="w-full h-full border-none"
                ></iframe>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
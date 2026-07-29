'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentAnalytics() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [totalModulesCount, setTotalModulesCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) return router.push('/');

    const fetchAnalyticsData = async () => {
      try {
        // Fetch Live User Data
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        setStudent(userData);

        // Fetch Live Module Count
        const modRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const modData = await modRes.json();
        
        // Prevent division by zero if admin hasn't created modules yet
        setTotalModulesCount(modData.length > 0 ? modData.length : 1);

      } catch (err) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primaryAccent font-bold tracking-widest animate-pulse">COMPILING DATA...</div>;

  // --- DYNAMIC CALCULATIONS ---
  // 1. Progress Percentage
  const completedModulesCount = student?.completedModules?.length || 0;
  const progressPercent = Math.round((completedModulesCount / totalModulesCount) * 100) || 0;
  
  // 2. Average Quiz Marks
  const quizScores = student?.quizScores || [];
  let totalAchieved = 0;
  let totalPossible = 0;
  
  quizScores.forEach((quiz: any) => {
      totalAchieved += quiz.score;
      totalPossible += quiz.total;
  });
  
  const avgQuizMark = totalPossible > 0 ? Math.round((totalAchieved / totalPossible) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-gray-800">
        <div className="text-2xl font-bold tracking-wider text-primaryAccent cursor-pointer" onClick={() => router.push('/dashboard')}>
          SAWN BD <span className="text-sm font-normal text-gray-500">Analytics</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-400 hover:text-white transition bg-gray-800 px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold mb-8">Performance Tracker</h1>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* HEALTH CHECK (DONUT CHART) */}
            <div className="md:col-span-2 bg-[#0d0d0d] rounded-2xl border border-gray-800 p-8 shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl font-bold">Health Check</h2>
                <div className="h-6 w-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400 cursor-help" title="Tracks your progress against the live curriculum.">i</div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <div 
                  className="w-56 h-56 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                  style={{ background: `conic-gradient(#8B5CF6 ${progressPercent}%, #1f2937 ${progressPercent}% 100%)` }}
                >
                  <div className="w-44 h-44 bg-[#0d0d0d] rounded-full flex flex-col items-center justify-center z-10">
                    <span className="text-4xl font-extrabold">{progressPercent}%</span>
                    <span className="text-xs text-gray-400 mt-1">Total Progress</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-warningRed text-xl">🎯</span>
                    <span className="text-gray-300">Modules Unlocked: {completedModulesCount} / {totalModulesCount}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primaryAccent text-xl">📊</span>
                    <span className="text-gray-300">Quizzes Passed: {quizScores.length}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-successGreen text-xl">⭐</span>
                    <span className="text-gray-300">Bookmarks Saved: {student?.bookmarkedVideos?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUIZ & GEM BLOCKS */}
            <div className="space-y-6">
              <div className="bg-[#0d0d0d] rounded-2xl border border-gray-800 p-8 text-center h-full flex flex-col justify-center shadow-lg">
                <h3 className="text-xl font-bold mb-4">Total Wealth</h3>
                <span className="text-5xl font-black text-primaryAccent">{student?.gems}</span>
                <span className="text-sm text-gray-500 mt-2">Gems Earned</span>
              </div>
              
              <div className="bg-[#0d0d0d] rounded-2xl border border-gray-800 p-8 text-center h-full flex flex-col justify-center shadow-lg">
                <h3 className="text-xl font-bold mb-4">Exam Average</h3>
                <span className="text-5xl font-black text-white">{avgQuizMark}%</span>
                <span className="text-sm text-gray-500 mt-2">Overall Accuracy</span>
              </div>
            </div>

          </div>

          {/* RECENT QUIZZES */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
             <div className="bg-[#0d0d0d] rounded-2xl border border-gray-800 p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6">Recent Assessments</h3>
                {quizScores.length === 0 ? (
                  <p className="text-gray-500">No assessments taken yet.</p>
                ) : (
                  <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {quizScores.map((q: any, idx: number) => (
                      <li key={idx} className="flex justify-between items-center bg-[#111] p-4 rounded-lg border border-gray-800">
                        <span className="text-gray-300 font-semibold">Module {q.moduleId} Final Exam</span>
                        <span className={`${q.score === q.total ? 'bg-successGreen/20 text-successGreen' : 'bg-warningRed/20 text-warningRed'} px-3 py-1 rounded font-bold`}>
                          {q.score}/{q.total}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
             </div>

             <div className="bg-[#0d0d0d] rounded-2xl border border-gray-800 p-8 shadow-lg flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold mb-2">Pace Control</h3>
                <p className="text-gray-400 text-sm mb-6">Maintain your momentum to stay on top of the Leaderboard.</p>
                <div className="text-6xl mb-4 text-neonBlue">⏱️</div>
                <button onClick={() => router.push('/dashboard/leaderboard')} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded transition">
                  View Hall of Fame
                </button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
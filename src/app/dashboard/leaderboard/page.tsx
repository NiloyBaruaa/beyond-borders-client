'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Leaderboard() {
  const router = useRouter();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) {
      router.push('/');
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/leaderboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setLeaders(data);
        }
      } catch (err) {
        console.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-darkBg flex items-center justify-center text-neonBlue">Loading Hall of Fame...</div>;

  return (
    <div className="min-h-screen bg-darkBg text-white font-sans flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 bg-cardBg border-b border-gray-800">
        <div className="text-2xl font-bold tracking-wider text-primaryAccent cursor-pointer" onClick={() => router.push('/dashboard')}>
          SAWN BD <span className="text-sm font-normal text-gray-500">Flight Deck</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-400 hover:text-white transition">
          ← Back to Curriculum
        </button>
      </header>

      {/* LEADERBOARD CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent to-neonBlue mb-4">
              Hall of Fame
            </h1>
            <p className="text-gray-400">The top recruits with the highest Gem count. Compete, complete modules, and secure your spot.</p>
          </div>

          <div className="bg-cardBg rounded-2xl border border-gray-800 shadow-[0_0_30px_rgba(139,92,246,0.05)] overflow-hidden">
            {leaders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No recruits found on the radar.</div>
            ) : (
              <ul className="divide-y divide-gray-800">
                {leaders.map((student, index) => (
                  <li key={student._id} className={`flex items-center justify-between p-6 transition-colors hover:bg-[#111] ${index === 0 ? 'bg-primaryAccent/5 border-l-4 border-primaryAccent' : index === 1 ? 'bg-neonBlue/5 border-l-4 border-neonBlue' : index === 2 ? 'bg-successGreen/5 border-l-4 border-successGreen' : ''}`}>
                    <div className="flex items-center gap-6">
                      <div className={`text-2xl font-black w-8 text-center ${index === 0 ? 'text-primaryAccent' : index === 1 ? 'text-neonBlue' : index === 2 ? 'text-successGreen' : 'text-gray-600'}`}>
                        #{index + 1}
                      </div>
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl ${index === 0 ? 'bg-primaryAccent text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-darkBg border border-gray-700 text-gray-300'}`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${index < 3 ? 'text-white' : 'text-gray-300'}`}>{student.name}</h3>
                        <p className="text-xs text-gray-500">Recruit</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-darkBg px-4 py-2 rounded-full border border-gray-800">
                      <span className="text-xl">💎</span>
                      <span className="font-bold text-lg">{student.gems}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
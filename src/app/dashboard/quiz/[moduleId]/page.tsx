'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizEngine({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const moduleId = resolvedParams.moduleId;

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{questionId: number, selectedOptionIndex: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) return router.push('/');

    const initializeAssessment = async () => {
      try {
        // 1. SECURITY CHECK: Has the student already taken this quiz?
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        const pastRecord = userData.quizScores?.find((q: any) => q.moduleId === parseInt(moduleId));

        if (pastRecord) {
          // Lock the UI! They used the back button or clicked a dead link.
          setResult({ 
            score: pastRecord.score, 
            total: pastRecord.total, 
            gemsEarned: 'Claimed', 
            alreadyTaken: true 
          });
          setLoading(false);
          return;
        }

        // 2. If secure, fetch the quiz data
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error("Failed to fetch modules");
        
        const data = await response.json();
        const currentModule = data.find((m: any) => m.moduleId === parseInt(moduleId));
        
        if (currentModule && currentModule.quizzes) {
          setQuizzes(currentModule.quizzes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initializeAssessment();
  }, [moduleId, router]);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => {
      const existing = prev.filter(a => a.questionId !== questionId);
      return [...existing, { questionId, selectedOptionIndex: optionIndex }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length < quizzes.length) return alert("Please answer all questions before submitting.");
    setSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/submit-quiz`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` 
        },
        body: JSON.stringify({ moduleId: parseInt(moduleId), answers })
      });
      
      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.msg); 
        router.push('/dashboard/student-analytics');
      }
    } catch (err) {
      alert("Error submitting quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-neonBlue font-bold tracking-widest animate-pulse">INITIALIZING ASSESSMENT...</div>;

  // RESULT / LOCKED SCREEN
  if (result) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-sans p-4">
        <div className="bg-cardBg border border-gray-800 p-12 rounded-2xl text-center max-w-lg w-full shadow-[0_0_50px_rgba(139,92,246,0.15)]">
          <div className="text-6xl mb-6">{result.alreadyTaken ? '🔒' : '🏆'}</div>
          <h1 className="text-3xl font-extrabold mb-2">
            {result.alreadyTaken ? 'Assessment Locked' : 'Assessment Complete'}
          </h1>
          <p className="text-gray-400 mb-8">
            {result.alreadyTaken 
              ? 'You have already completed the assessment for this module. Retakes are not permitted.' 
              : 'Your results have been logged to the server.'}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-darkBg border border-gray-800 p-6 rounded-xl">
              <span className="block text-4xl font-black text-white mb-1">{result.score}/{result.total}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Score</span>
            </div>
            <div className="bg-darkBg border border-primaryAccent/30 p-6 rounded-xl">
              <span className="block text-4xl font-black text-primaryAccent mb-1">{result.alreadyTaken ? '---' : `+${result.gemsEarned}`}</span>
              <span className="text-xs text-primaryAccent uppercase tracking-widest">Gems Earned</span>
            </div>
          </div>
          
          <button onClick={() => router.push('/dashboard/student-analytics')} className="w-full bg-primaryAccent hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-transform hover:scale-105">
            View My Analytics
          </button>
        </div>
      </div>
    );
  }

  // QUIZ TAKING SCREEN
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="bg-[#0a0a0a] border-b border-gray-800 py-6 text-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold">Module {moduleId} <span className="text-primaryAccent">Final Assessment</span></h1>
        <p className="text-sm text-gray-400 mt-1">Answer all {quizzes.length} questions to earn Gems. No retakes.</p>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-8 space-y-8 mt-4">
        {quizzes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No assessment available for this module yet.</div>
        ) : (
          <>
            {quizzes.map((quiz, qIdx) => (
              <div key={quiz.questionId} className="bg-cardBg border border-gray-800 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6"><span className="text-primaryAccent mr-2">{qIdx + 1}.</span> {quiz.question}</h3>
                <div className="space-y-3">
                  {quiz.options.map((opt: string, oIdx: number) => {
                    const isSelected = answers.find(a => a.questionId === quiz.questionId)?.selectedOptionIndex === oIdx;
                    return (
                      <div 
                        key={oIdx} 
                        onClick={() => handleSelect(quiz.questionId, oIdx)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-4 ${isSelected ? 'bg-primaryAccent/10 border-primaryAccent text-white' : 'bg-darkBg border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'}`}
                      >
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primaryAccent' : 'border-gray-600'}`}>
                          {isSelected && <div className="h-2.5 w-2.5 bg-primaryAccent rounded-full"></div>}
                        </div>
                        <span className="font-medium">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <button 
              onClick={handleSubmit} 
              disabled={submitting}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-2xl mb-20 ${answers.length === quizzes.length ? 'bg-successGreen text-black hover:bg-green-500' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              {submitting ? 'Authenticating Results...' : 'Submit Assessment'}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gemAmount, setGemAmount] = useState('5');

  const [gradeForm, setGradeForm] = useState({ assignmentId: '', marks: '', feedback: '' });
  const [overridePassword, setOverridePassword] = useState('');
  const fetchStudent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/student/${studentId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      setStudent(await res.json());
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchStudent(); }, [studentId]);

  const handleGems = async (action: 'add' | 'subtract') => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/student/${studentId}/gems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ amount: gemAmount, action })
      });
      fetchStudent(); // Refresh data
    } catch (e) { alert("Error adjusting gems"); }
  };

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/student/${studentId}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ assignmentId: gradeForm.assignmentId, marksObtained: gradeForm.marks, feedback: gradeForm.feedback })
      });
      setGradeForm({ assignmentId: '', marks: '', feedback: '' });
      fetchStudent(); // Refresh data
    } catch (e) { alert("Error grading assignment"); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  const handlePasswordOverride = async () => {
    if (!overridePassword) return alert('Enter a new password.');
    if (!confirm('Are you sure you want to forcefully overwrite this student\'s password?')) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/student/${studentId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ newPassword: overridePassword })
      });
      alert('Password overridden successfully. Tell the student to log in with the new password.');
      setOverridePassword('');
    } catch (e) { alert("Error resetting password"); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{student.name}</h1>
            <p className="text-gray-400">{student.email} • ID: BB-{student._id.substring(0, 6)}</p>
          </div>
          <button onClick={() => router.push('/admin/students')} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">← Back to Roster</button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COL: PERSONAL INFO */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cardBg border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-neonBlue">Personal Intel</h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><span className="text-gray-500 block text-xs uppercase">Phone</span>{student.phone}</li>
                <li><span className="text-gray-500 block text-xs uppercase">DOB</span>{student.personalDetails?.dob || 'Not provided'}</li>
                <li><span className="text-gray-500 block text-xs uppercase">Passport</span>{student.personalDetails?.passportNo || 'Not provided'}</li>
                <li><span className="text-gray-500 block text-xs uppercase">University</span>{student.personalDetails?.currentUniversity || 'Not provided'}</li>
                <li><span className="text-gray-500 block text-xs uppercase">Target</span>{student.personalDetails?.targetCountry || 'Not provided'}</li>
              </ul>
            </div>

            <div className="bg-cardBg border border-gray-800 rounded-xl p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 text-warningRed">Security Override</h2>
              <p className="text-xs text-gray-500 mb-4">Forcefully change this student's password if they are locked out.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="New Password" value={overridePassword} onChange={e => setOverridePassword(e.target.value)} className="flex-1 bg-darkBg border border-gray-700 rounded p-2 text-sm text-white outline-none" />
                <button onClick={handlePasswordOverride} className="bg-warningRed hover:bg-red-600 text-white font-bold px-4 py-2 rounded text-sm transition">
                  Overwrite
                </button>
              </div>
            </div>

            <div className="bg-cardBg border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-warningRed">Gem Control</h2>
              <div className="text-4xl font-black mb-4">💎 {student.gems}</div>
              <div className="flex gap-2 mb-2">
                <input type="number" value={gemAmount} onChange={e => setGemAmount(e.target.value)} className="w-20 bg-darkBg border border-gray-700 rounded p-2 text-center" />
                <button onClick={() => handleGems('add')} className="flex-1 bg-successGreen hover:bg-green-600 text-black font-bold rounded">Add</button>
                <button onClick={() => handleGems('subtract')} className="flex-1 bg-warningRed hover:bg-red-600 text-white font-bold rounded">Sub</button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Adjusting gems updates leaderboard instantly.</p>
            </div>
          </div>

          {/* RIGHT COL: ACADEMICS & GRADING */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cardBg border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-primaryAccent">Academic Progress</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-darkBg p-4 rounded border border-gray-800">
                  <div className="text-sm text-gray-500">Modules Cleared</div>
                  <div className="text-2xl font-bold">{student.completedModules.length}</div>
                </div>
                <div className="bg-darkBg p-4 rounded border border-gray-800">
                  <div className="text-sm text-gray-500">Quizzes Passed</div>
                  <div className="text-2xl font-bold">{student.quizScores.length}</div>
                </div>
              </div>
            </div>

            <div className="bg-cardBg border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-successGreen">Evaluate Assignment</h2>
              <form onSubmit={handleGrade} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Module / Assign ID" required value={gradeForm.assignmentId} onChange={e => setGradeForm({...gradeForm, assignmentId: e.target.value})} className="bg-darkBg border border-gray-700 p-3 rounded" />
                  <input type="number" placeholder="Marks (0-100)" required value={gradeForm.marks} onChange={e => setGradeForm({...gradeForm, marks: e.target.value})} className="bg-darkBg border border-gray-700 p-3 rounded" />
                </div>
                <textarea placeholder="Commander Feedback (will be sent to student)" required rows={3} value={gradeForm.feedback} onChange={e => setGradeForm({...gradeForm, feedback: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded"></textarea>
                <button type="submit" className="w-full bg-successGreen text-black font-bold py-3 rounded">Submit Evaluation & Award Gems</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
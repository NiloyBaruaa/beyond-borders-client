'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for the grading modal
  const [activeGrading, setActiveGrading] = useState<any>(null);
  const [marks, setMarks] = useState<number>(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bootcamp_token');
    if (!token) {
      router.push('/'); 
      return;
    }

    const loadAdminData = async () => {
      try {
        // Fetch all students (Backend will block this if token is not an admin)
        const response = await fetch('http://https://beyond-borders-server.onrender.com/api/api/admin/dashboard-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          // If they aren't an admin, kick them to the student dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error("Admin Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [router]);

  const handleGradeSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('bootcamp_token');
      const payload = {
        studentId: activeGrading.studentId,
        assignmentId: activeGrading.assignmentId,
        marks: marks === 0 ? null : marks,
        status: marks === 0 ? 'resubmit_requested' : 'graded'
      };

      const response = await fetch('http://https://beyond-borders-server.onrender.com/api/api/admin/grade-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        alert("Failed to submit grade.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setActiveGrading(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-darkBg flex items-center justify-center text-warningRed text-xl font-bold tracking-widest">Verifying Commander Clearance...</div>;
  }

  // Extract all pending assignments across all students
  const pendingAssignments = students.flatMap(student => 
    student.assignments
      .filter((a: any) => a.status === 'pending')
      .map((a: any) => ({ ...a, studentName: student.name, studentId: student._id }))
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* TOP NAVIGATION BAR */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-warningRed/30 shadow-[0_4px_20px_rgba(239,68,68,0.1)]">
        <div className="text-2xl font-bold tracking-wider text-warningRed">COMMANDER CONTROL ROOM</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">System Status: <span className="text-successGreen font-bold">ONLINE</span></span>
          <button 
            onClick={() => { localStorage.removeItem('bootcamp_token'); router.push('/'); }}
            className="text-xs bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pending Submissions</h1>
              <p className="text-gray-400">Review SOPs and Mock Interviews. Issue grades carefully.</p>
            </div>
            <div className="bg-[#111] border border-gray-800 px-6 py-3 rounded-lg text-center">
              <span className="block text-3xl font-bold text-warningRed">{pendingAssignments.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">In Queue</span>
            </div>
          </div>

          {/* SUBMISSIONS TABLE */}
          <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
            {pendingAssignments.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <span className="text-4xl mb-4 block">☕</span>
                <p>No pending assignments. The queue is clear.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#0a0a0a] border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="p-4">Recruit Name</th>
                    <th className="p-4">Module</th>
                    <th className="p-4">Submitted At</th>
                    <th className="p-4">Assets</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {pendingAssignments.map((assignment: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-900/50 transition-colors">
                      <td className="p-4 font-bold">{assignment.studentName}</td>
                      <td className="p-4 text-gray-300">Mod {assignment.assignmentId}</td>
                      <td className="p-4 text-sm text-gray-500">{new Date(assignment.submittedAt).toLocaleDateString()}</td>
                      <td className="p-4 space-y-2">
                        <a href={assignment.submissionLink} target="_blank" rel="noreferrer" className="block text-xs text-neonBlue hover:underline">📄 View SOP Doc</a>
                        <a href={assignment.liveLink} target="_blank" rel="noreferrer" className="block text-xs text-primaryAccent hover:underline">🎥 View Mock Video</a>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setActiveGrading(assignment)}
                          className="bg-warningRed/10 text-warningRed hover:bg-warningRed hover:text-white border border-warningRed/50 font-bold py-2 px-6 rounded text-sm transition-all"
                        >
                          EVALUATE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* GRADING MODAL */}
      {activeGrading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">Evaluate Recruit</h2>
            <p className="text-gray-400 text-sm mb-6">Evaluating <span className="text-white font-bold">{activeGrading.studentName}</span> for Module {activeGrading.assignmentId}.</p>
            
            <label className="block text-sm font-medium text-gray-300 mb-3">Assign Marks:</label>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[60, 50, 30].map(val => (
                <button
                  key={val}
                  onClick={() => setMarks(val)}
                  className={`py-3 rounded border font-bold transition-all ${marks === val ? 'bg-successGreen text-black border-successGreen scale-[1.02]' : 'bg-darkBg text-gray-400 border-gray-700 hover:border-gray-500'}`}
                >
                  {val} Marks
                </button>
              ))}
              <button
                onClick={() => setMarks(0)} // 0 acts as our trigger for Resubmit
                className={`py-3 rounded border font-bold transition-all ${marks === 0 ? 'bg-warningRed text-white border-warningRed scale-[1.02]' : 'bg-darkBg text-gray-400 border-gray-700 hover:border-gray-500'}`}
              >
                Penalty: Resubmit
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setActiveGrading(null)}
                className="flex-1 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleGradeSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-neonBlue hover:bg-blue-600 text-white font-bold py-3 rounded shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Confirm Grade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EnrollmentApprovals() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/enrollment/pending`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      if (!res.ok) throw new Error('Failed to fetch');
      setRequests(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} this request?`)) return;
    
    setActionStatus(`Processing ${action}...`);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/enrollment/${action}/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      const data = await res.json();
      
      if (res.ok) {
        setActionStatus(`✅ ${data.message}`);
        fetchRequests(); // Refresh the list
      } else {
        setActionStatus(`❌ ${data.message}`);
      }
    } catch (e) {
      setActionStatus(`❌ Error processing request.`);
    }
    setTimeout(() => setActionStatus(''), 4000);
  };

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center animate-pulse tracking-widest font-bold">LOADING PAYMENT QUEUE...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mt-10">
        
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-successGreen tracking-tight">Payment Verification</h1>
            <p className="text-gray-500 text-sm mt-1">Review transaction IDs, approve students, and automatically dispatch welcome emails.</p>
          </div>
          <button onClick={() => router.push('/admin/system')} className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition">Back to Core</button>
        </header>

        {actionStatus && (
            <div className="mb-6 p-4 rounded-xl text-center font-bold bg-darkBg border border-gray-700 shadow-lg text-white">
                {actionStatus}
            </div>
        )}

        <div className="bg-cardBg border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 font-bold uppercase text-xs tracking-wider bg-[#090909]">
                <th className="p-5">Recruit Details</th>
                <th className="p-5">Transaction ID</th>
                <th className="p-5">Payment Method</th>
                <th className="p-5 text-right">Commander Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {requests.length > 0 ? (
                requests.map((req: any) => (
                  <tr key={req._id} className="hover:bg-gray-900/40 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-white">{req.name}</p>
                      <p className="text-xs text-gray-400">{req.email} • {req.phone}</p>
                    </td>
                    <td className="p-5 font-black tracking-widest text-neonBlue">{req.transactionId}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider ${req.paymentMethod === 'bKash' ? 'bg-pink-900/30 text-pink-500 border border-pink-900/50' : 'bg-orange-900/30 text-orange-500 border border-orange-900/50'}`}>
                        {req.paymentMethod}
                      </span>
                    </td>
                    <td className="p-5 text-right flex justify-end gap-3">
                      <button onClick={() => handleAction(req._id, 'reject')} className="bg-darkBg text-warningRed border border-gray-800 hover:bg-warningRed hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">Reject</button>
                      <button onClick={() => handleAction(req._id, 'approve')} className="bg-successGreen hover:bg-green-600 text-black px-6 py-2 rounded-lg text-sm font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform active:scale-95">Verify & Admit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-16 text-gray-500 font-bold text-sm">📭 No pending enrollment requests. The queue is clear.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Helpdesk() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ category: 'Technical Issue', subject: '', details: '' });

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/helpdesk`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      setTickets(await res.json());
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/helpdesk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify(form)
      });
      setForm({ category: 'Technical Issue', subject: '', details: '' });
      setIsCreating(false);
      fetchTickets(); // Refresh the board
    } catch (e) { alert("Error submitting ticket"); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center">Loading Community Forum...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-gray-800">
        <div className="text-2xl font-bold tracking-wider text-primaryAccent">
          Community <span className="text-white">Helpdesk</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Back to Dashboard</button>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Support Forum</h1>
              <p className="text-gray-400">Search for answers or ask the Commander directly. Visible to all recruits.</p>
            </div>
            <button onClick={() => setIsCreating(!isCreating)} className="bg-primaryAccent hover:bg-purple-500 text-white font-bold py-2 px-6 rounded shadow-lg transition">
              {isCreating ? 'Cancel' : '+ Ask a Question'}
            </button>
          </div>

          {isCreating && (
            <div className="bg-cardBg p-8 rounded-xl border border-gray-800 mb-8 animate-fade-in shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-white">Post to Community Helpdesk</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Issue Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white focus:border-primaryAccent outline-none">
                    <option>Technical Issue (Video/Website)</option>
                    <option>Curriculum Query (SOP/Docs)</option>
                    <option>Visa Application Guidance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Subject</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Brief summary of the issue" className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white focus:border-primaryAccent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Details</label>
                  <textarea rows={5} required value={form.details} onChange={e => setForm({...form, details: e.target.value})} placeholder="Describe your problem in detail..." className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white focus:border-primaryAccent outline-none"></textarea>
                </div>
                <button type="submit" className="bg-successGreen hover:bg-green-500 text-black font-bold py-3 px-8 rounded mt-4">Post Question</button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {tickets.length === 0 ? <p className="text-center text-gray-500 py-10">No questions asked yet.</p> : tickets.map((ticket) => (
              <div key={ticket._id} className="bg-cardBg rounded-xl border border-gray-800 p-6 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-400 uppercase">{ticket.studentName.charAt(0)}</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{ticket.subject}</h3>
                      <p className="text-xs text-gray-500">{ticket.studentName} • {new Date(ticket.createdAt).toLocaleDateString()} • {ticket.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${ticket.status === 'Resolved' ? 'bg-successGreen/10 text-successGreen border border-successGreen/30' : 'bg-warningRed/10 text-warningRed border border-warningRed/30'}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{ticket.details}</p>
                
                {ticket.adminReply && (
                  <div className="mt-4 bg-primaryAccent/10 border-l-4 border-primaryAccent p-4 rounded-r-lg">
                    <div className="text-xs font-bold text-primaryAccent mb-1 flex items-center gap-2"><span>🛡️</span> COMMANDER REPLY</div>
                    <p className="text-gray-200">{ticket.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
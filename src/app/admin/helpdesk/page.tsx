'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHelpdesk() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/helpdesk`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      setTickets(await res.json());
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleReply = async (id: string) => {
    if (!replyText[id]) return alert("Reply cannot be empty.");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/helpdesk/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ reply: replyText[id] })
      });
      fetchTickets(); // Refresh
      setReplyText(prev => ({ ...prev, [id]: '' }));
    } catch (e) { alert("Error posting reply"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this ticket permanently from the forum?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/helpdesk/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      fetchTickets();
    } catch (e) { alert("Error deleting ticket"); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-primaryAccent">Forum Moderation Core</h1>
            <p className="text-gray-400">Answer student queries or delete vulgar/duplicate posts.</p>
          </div>
          <button onClick={() => router.push('/admin/system')} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Back to System Core</button>
        </div>

        <div className="space-y-6">
          {tickets.length === 0 ? <p className="text-center text-gray-500 py-10">No active tickets.</p> : tickets.map((ticket) => (
            <div key={ticket._id} className="bg-cardBg rounded-xl border border-gray-800 p-6 shadow-md relative">
              
              {/* DELETE BUTTON (TOP RIGHT) */}
              <button 
                onClick={() => handleDelete(ticket._id)}
                className="absolute top-6 right-6 text-warningRed hover:text-red-400 text-sm font-bold flex items-center gap-1"
              >
                ✕ DELETE POST
              </button>

              <div className="mb-4 pr-32">
                <span className={`text-xs font-bold px-2 py-1 rounded inline-block mb-2 ${ticket.status === 'Resolved' ? 'bg-successGreen/10 text-successGreen' : 'bg-warningRed/10 text-warningRed'}`}>
                  {ticket.status} • {ticket.category}
                </span>
                <h3 className="font-bold text-white text-xl">{ticket.subject}</h3>
                <p className="text-xs text-gray-500 mb-3">Posted by: <span className="text-white font-bold">{ticket.studentName}</span></p>
                <p className="text-gray-300 leading-relaxed bg-darkBg p-4 rounded border border-gray-800">{ticket.details}</p>
              </div>
              
              {ticket.adminReply ? (
                <div className="mt-4 bg-primaryAccent/10 border-l-4 border-primaryAccent p-4 rounded">
                  <div className="text-xs font-bold text-primaryAccent mb-1">YOUR PREVIOUS REPLY:</div>
                  <p className="text-gray-200">{ticket.adminReply}</p>
                </div>
              ) : (
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <textarea 
                    rows={3} 
                    placeholder="Type official reply here..." 
                    value={replyText[ticket._id] || ''}
                    onChange={(e) => setReplyText(prev => ({ ...prev, [ticket._id]: e.target.value }))}
                    className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white focus:border-primaryAccent outline-none mb-3"
                  ></textarea>
                  <button onClick={() => handleReply(ticket._id)} className="bg-primaryAccent hover:bg-purple-500 text-white font-bold py-2 px-6 rounded">
                    Post Reply & Resolve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
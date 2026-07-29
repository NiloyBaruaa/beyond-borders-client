'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffManagement() {
  const router = useRouter();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  
  const [form, setForm] = useState({ name: '', email: '', tempPassword: '' });

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/staff`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      
      if (res.status === 403) {
        // Kick them out if a standard admin tries to sneak into this URL
        router.replace('/admin/system');
        return;
      }
      
      setStaff(await res.json());
      setLoading(false);
    } catch (e) { 
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [router]);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Deploying new staff credentials...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/add-staff`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` 
        },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Staff member added. They can now log in.');
        setForm({ name: '', email: '', tempPassword: '' });
        fetchStaff(); // Refresh the list
      } else {
        setStatus('❌ ' + data.message);
      }
    } catch (e) { 
        setStatus('❌ Error connecting to server.'); 
    }
    
    // Clear status message after 4 seconds
    setTimeout(() => setStatus(''), 4000);
  };

  const handleRemoveStaff = async (id: string, role: string) => {
    if (role === 'superadmin') return alert('You cannot delete the Super Admin.');
    if (!confirm('Are you sure you want to permanently revoke access for this admin?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/remove-staff/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      
      if (res.ok) {
        fetchStaff(); // Refresh the list
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (e) { 
        alert("Error communicating with server."); 
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] text-warningRed flex justify-center items-center font-bold tracking-widest animate-pulse">CHECKING SUPERADMIN CLEARANCE...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto mt-10">
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-warningRed tracking-tight">Staff Command</h1>
            <p className="text-gray-500 text-sm mt-1">Authorize or revoke administrative access to the platform.</p>
          </div>
          <button 
            onClick={() => router.push('/admin/system')} 
            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg"
          >
            Back to Core
          </button>
        </header>

        {status && (
            <div className={`mb-6 p-4 rounded-xl text-center font-bold shadow-lg border ${status.includes('✅') ? 'bg-green-900/20 text-green-400 border-green-900/50' : 'bg-red-900/20 text-red-400 border-red-900/50'}`}>
                {status}
            </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* LEFT: STAFF CREATION FORM */}
          <div className="md:col-span-1 bg-cardBg p-6 rounded-2xl border border-gray-800 shadow-2xl h-fit">
            <h2 className="text-xl font-bold mb-6 text-neonBlue border-b border-gray-800 pb-2">Deploy New Admin</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded-lg text-white focus:border-neonBlue focus:outline-none transition-colors" placeholder="e.g. Operations Team" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded-lg text-white focus:border-neonBlue focus:outline-none transition-colors" placeholder="admin@beyondborders.com" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Temporary Password</label>
                  <input type="text" required value={form.tempPassword} onChange={e => setForm({...form, tempPassword: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded-lg text-white focus:border-neonBlue focus:outline-none transition-colors" placeholder="Setup a secure password" />
              </div>
              
              <button type="submit" className="w-full bg-neonBlue hover:bg-blue-600 text-white font-extrabold py-3.5 rounded-lg transition-transform active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-2">
                Authorize Access
              </button>
            </form>
          </div>

          {/* RIGHT: ACTIVE STAFF ROSTER */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">Active Personnel</h2>
            
            {staff.map((member) => (
              <div key={member._id} className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-lg ${member.role === 'superadmin' ? 'bg-warningRed/5 border-warningRed/30' : 'bg-cardBg border-gray-800 hover:border-gray-600'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-white">{member.name}</h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black tracking-widest uppercase border ${member.role === 'superadmin' ? 'bg-warningRed text-white border-warningRed' : 'bg-neonBlue/10 text-neonBlue border-neonBlue/30'}`}>
                        {member.role === 'superadmin' ? 'Commander' : 'Admin'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
                
                {member.role !== 'superadmin' && (
                  <button 
                    onClick={() => handleRemoveStaff(member._id, member.role)} 
                    className="bg-darkBg border border-gray-700 text-warningRed hover:bg-warningRed hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full sm:w-auto"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
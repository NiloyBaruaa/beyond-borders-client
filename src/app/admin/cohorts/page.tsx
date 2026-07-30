'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CohortManager() {
  const router = useRouter();
  const [config, setConfig] = useState({ activeBatch: 1, latestCompletedBatch: 1 });
  const [sessionForm, setSessionForm] = useState({ title: '', description: '', date: '', time: '', zoomLink: '', recordedVideoUrl: '', batchNumber: 1 });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // We fetch global modules to extract the config data from our smart route
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/modules`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
        });
        const data = await res.json();
        if (data.config) setConfig({ activeBatch: data.config.activeBatch, latestCompletedBatch: data.config.latestCompletedBatch });
        setLoading(false);
      } catch (e) { console.error(e); }
    };
    fetchConfig();
  }, []);

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Updating Global Cohort Rules...');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify(config)
      });
      setStatus('✅ Global rules updated! Alumni routing is now active.');
    } catch (e) { setStatus('❌ Error updating rules.'); }
  };

  const handleDeploySession = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Deploying Session...');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/admin/conceptual-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify({ ...sessionForm, batchNumber: parseInt(sessionForm.batchNumber.toString()) })
      });
      setStatus('✅ Session Deployed to Student Dashboards!');
      setSessionForm({ title: '', description: '', date: '', time: '', zoomLink: '', recordedVideoUrl: '', batchNumber: config.activeBatch });
    } catch (e) { setStatus('❌ Error deploying session.'); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Cohort & Live Session <span className="text-primaryAccent">Core</span></h1>
            <p className="text-gray-400">Manage global batch routing and deploy live Zoom links.</p>
          </div>
          <button onClick={() => router.push('/admin/system')} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Back to System Core</button>
        </header>

        {status && <div className="mb-6 p-4 rounded bg-darkBg border border-primaryAccent text-primaryAccent font-bold">{status}</div>}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* PANEL 1: BATCH ROUTING (THE BRAIN) */}
          <div className="bg-cardBg p-8 rounded-xl border border-warningRed shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <h2 className="text-xl font-bold mb-2 text-warningRed">Global Routing Logic</h2>
            <p className="text-sm text-gray-400 mb-6">This controls what students see. Alumni will be redirected to the "Latest Completed Batch" content.</p>
            
            <form onSubmit={handleUpdateConfig} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Current Active Cohort (Batch #)</label>
                <p className="text-xs text-gray-500 mb-2">New students are assigned to this batch. They only see content for this exact batch.</p>
                <input type="number" value={config.activeBatch} onChange={e => setConfig({...config, activeBatch: parseInt(e.target.value)})} className="w-full bg-darkBg border border-warningRed/50 p-4 rounded text-xl font-bold text-center text-white outline-none" />
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <label className="block text-sm font-bold text-gray-300 mb-2">Latest Completed Cohort (Batch #)</label>
                <p className="text-xs text-gray-500 mb-2">Any student from an OLDER batch will automatically see the curriculum and recordings for THIS batch.</p>
                <input type="number" value={config.latestCompletedBatch} onChange={e => setConfig({...config, latestCompletedBatch: parseInt(e.target.value)})} className="w-full bg-darkBg border border-gray-700 p-4 rounded text-xl font-bold text-center text-white outline-none focus:border-neonBlue" />
              </div>
              
              <button type="submit" className="w-full bg-warningRed hover:bg-red-600 text-white font-bold py-4 rounded-lg transition shadow-lg">Save Routing Rules</button>
            </form>
          </div>

          {/* PANEL 2: CONCEPTUAL SESSION DEPLOYER */}
          <div className="bg-cardBg p-8 rounded-xl border border-primaryAccent">
            <h2 className="text-xl font-bold mb-2 text-primaryAccent">Deploy Conceptual Session</h2>
            <p className="text-sm text-gray-400 mb-6">Schedule a live Zoom call or upload a past recording to a specific cohort.</p>
            
            <form onSubmit={handleDeploySession} className="space-y-4 text-sm">
              <input type="text" required placeholder="Session Title (e.g. Profile Building Masterclass)" value={sessionForm.title} onChange={e => setSessionForm({...sessionForm, title: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
              <textarea required rows={2} placeholder="Brief Description" value={sessionForm.description} onChange={e => setSessionForm({...sessionForm, description: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Date</label>
                  <input type="date" required value={sessionForm.date} onChange={e => setSessionForm({...sessionForm, date: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Time (e.g. 09:00 PM)</label>
                  <input type="text" required placeholder="09:00 PM" value={sessionForm.time} onChange={e => setSessionForm({...sessionForm, time: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                </div>
              </div>

              <div>
                 <label className="text-xs text-gray-500">Live Zoom Link (Optional)</label>
                 <input type="url" placeholder="https://zoom.us/j/..." value={sessionForm.zoomLink} onChange={e => setSessionForm({...sessionForm, zoomLink: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
              </div>

              <div>
                 <label className="text-xs text-gray-500">Recorded Video URL (Optional - Add this after the live ends)</label>
                 <input type="url" placeholder="https://youtube.com/..." value={sessionForm.recordedVideoUrl} onChange={e => setSessionForm({...sessionForm, recordedVideoUrl: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
              </div>

              <div className="pt-2 border-t border-gray-800 mt-2">
                 <label className="text-xs text-primaryAccent font-bold block mb-1">Target Cohort (Batch Number)</label>
                 <input type="number" required value={sessionForm.batchNumber} onChange={e => setSessionForm({...sessionForm, batchNumber: parseInt(e.target.value)})} className="w-full bg-primaryAccent/10 border border-primaryAccent p-3 rounded text-white font-bold" />
              </div>

              <button type="submit" className="w-full bg-primaryAccent hover:bg-purple-500 text-white font-bold py-4 rounded-lg transition mt-4">Deploy to Dashboards</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
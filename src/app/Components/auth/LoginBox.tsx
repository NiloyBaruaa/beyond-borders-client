'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginBox() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  // 1. The Initial Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        // Updated to catch all error formats
        setError(data.message || data.msg || "Authentication failed.");
      }
    } catch (err) {
      setError("Server is offline. Please check your connection.");
    }
  };

  // 2. The OTP Verification (FIXED DYNAMIC ROUTING & ERROR HANDLING)
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join(''); 

    try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          otp: fullOtp, 
          deviceId: localStorage.getItem('bb_device_id') 
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Save the token
        localStorage.setItem('bootcamp_token', data.token);
        
        // Read the role from the backend response
        const userRole = data.user?.role;
        
        // DYNAMIC ROUTING: Route based on clearance level
        if (userRole === 'superadmin' || userRole === 'admin') {
          router.push('/admin/system'); // Commander & Staff go here
        } else {
          router.push('/dashboard'); // Standard recruits go here
        }
      } else {
        // THE FIX: Catching both 'message' and 'msg' so no errors are invisible!
        setError(data.message || data.msg || "Verification failed. Contact support.");
      }
    } catch (err) {
      setError("Server error during verification.");
    }
  };

  // 3. OTP Input Logic
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkBg px-4">
      <div className="w-full max-w-md rounded-2xl bg-cardBg p-8 shadow-2xl border border-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">SAWN BD</h1>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1 ? "Enter your credentials to access the bootcamp." : "Enter the 4-digit code sent to your device."}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded border border-warningRed bg-red-900/20 p-3 text-center text-sm text-warningRed">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-darkBg border border-gray-700 px-4 py-3 text-white focus:border-primaryAccent focus:outline-none focus:ring-1 focus:ring-primaryAccent transition-all"
                placeholder="commander@beyondborders.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-darkBg border border-gray-700 px-4 py-3 text-white focus:border-primaryAccent focus:outline-none focus:ring-1 focus:ring-primaryAccent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primaryAccent px-4 py-3 font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Secure Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-bold rounded-lg bg-darkBg border border-gray-700 text-white focus:border-neonBlue focus:outline-none focus:ring-1 focus:ring-neonBlue transition-all"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-neonBlue px-4 py-3 font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Verify & Enter
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
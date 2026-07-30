'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginBox() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Upgraded to 6 digits to match your backend OTP generator
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. The Initial Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log("📍 [1] Login Button Clicked. Reaching out to server...");

    try {
      // Fixed URL: Removed the malformed 'http://https://' and double '/api/api'
      const response = await fetch('https://beyond-borders-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📍 [2] Server Response:", response.status, data);

      if (response.ok) {
        setStep(2);
      } else {
        setError(data.message || data.msg || "Authentication failed.");
      }
    } catch (err) {
      console.error("🔴 [CRASH] Fetch Failed:", err);
      setError("Server is offline. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. The OTP Verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const fullOtp = otp.join(''); 

    try {
      const response = await fetch('https://beyond-borders-server.onrender.com/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          otp: fullOtp
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Save the token
        localStorage.setItem('bootcamp_token', data.token);
        
        // Route based on clearance level
        const userRole = data.user?.role;
        if (userRole === 'superadmin' || userRole === 'admin') {
          router.push('/admin/system'); 
        } else {
          router.push('/dashboard'); 
        }
      } else {
        setError(data.message || data.msg || "Verification failed.");
      }
    } catch (err) {
      setError("Server error during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. OTP Input Logic
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input (Upgraded to handle 6 inputs)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkBg px-4">
      <div className="w-full max-w-md rounded-2xl bg-cardBg p-8 shadow-2xl border border-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">SAWN BD</h1>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1 ? "Enter your credentials to access the bootcamp." : "Enter the 6-digit code sent to your device."}
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
              disabled={isLoading}
              className="w-full rounded-lg bg-primaryAccent px-4 py-3 font-semibold text-white hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-darkBg border border-gray-700 text-white focus:border-neonBlue focus:outline-none focus:ring-1 focus:ring-neonBlue transition-all"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-neonBlue px-4 py-3 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify & Enter'}
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
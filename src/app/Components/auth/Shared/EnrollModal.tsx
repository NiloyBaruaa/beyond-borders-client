'use client';

import { useState } from 'react';
import {
  X,
  ShieldCheck,
  Loader2,
  CreditCard,
  Sparkles,
} from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollModal({
  isOpen,
  onClose,
}: EnrollModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    transactionId: '',
    paymentMethod: 'bKash',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus('Submitting request...');

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://https://beyond-borders-server.onrender.com/api'
        }/api/enrollment/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ ' + data.message);

        setTimeout(() => {
          onClose();
          setStatus('');
        }, 3000);
      } else {
        setStatus('❌ ' + data.message);
      }
    } catch (err) {
      setStatus('❌ Server connection failed.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-md p-4">

      {/* Modal */}
      <div className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0F] shadow-[0_0_100px_rgba(139,92,246,0.25)]">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative flex flex-col justify-center border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-12">

            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
              <Sparkles size={16} />
              Premium Enrollment
            </div>

            <h1 className="max-w-md text-5xl font-black leading-tight text-white">
              Secure Your
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                {' '}
                Seat
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-400">
              Complete your payment and verify your enrollment instantly.
              Your student dashboard access will be activated after successful
              verification.
            </p>

            {/* Payment Card */}
            <div className="mt-10 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 p-6 backdrop-blur-xl">

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <CreditCard size={16} />
                  Payment Information
                </div>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  Personal
                </span>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  Official Number
                </p>

                <h2 className="mt-2 text-4xl font-black tracking-wider text-white">
                  01632785301
                </h2>

                <p className="mt-4 text-sm text-gray-300">
                  Send exactly{' '}
                  <span className="font-bold text-white">৳1500</span> using
                  bKash or Nagad.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 text-emerald-400"
              />

              <div>
                <p className="font-semibold text-emerald-300">
                  Secure Verification
                </p>

                <p className="mt-1 text-sm leading-relaxed text-emerald-200/80">
                  Your transaction will be manually verified for maximum
                  security and fraud prevention.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center p-8 lg:p-12">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Enrollment Form
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Fill in your information carefully.
              </p>
            </div>

            {/* STATUS */}
            {status && (
              <div
                className={`mb-6 rounded-2xl border px-4 py-4 text-sm font-semibold ${
                  status.includes('✅')
                    ? 'border-green-500/20 bg-green-500/10 text-green-400'
                    : 'border-red-500/20 bg-red-500/10 text-red-400'
                }`}
              >
                {status}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Phone Number
                </label>

                <input
                  type="text"
                  required
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                />
              </div>

              {/* Payment + TxID */}
              <div className="grid grid-cols-3 gap-4">

                {/* Method */}
                <div className="col-span-1">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Method
                  </label>

                  <select
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition-all focus:border-purple-500"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                  </select>
                </div>

                {/* TxID */}
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Transaction ID
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="TXN8392D"
                    value={form.transactionId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        transactionId: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold uppercase tracking-[0.2em] text-white placeholder:text-gray-500 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={loading}
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 px-6 py-5 text-lg font-bold text-white shadow-[0_10px_40px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Verify Payment & Enroll'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
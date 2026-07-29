'use client';
import Navbar from "../Components/auth/Shared/Navbar";

import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar></Navbar>
      
      <div className="bg-[#0a0a0a] border-b border-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy <span className="text-primaryAccent">Policy</span></h1>
          <p className="text-gray-400">Last updated: May 16, 2026</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-8 py-16 text-gray-300 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p>When you enroll in the SAWN BD Bootcamp, we collect information that you voluntarily provide to us. This includes your name, email address, phone number, and any documents (such as drafts of your SOP or CV) that you submit for review on our platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect strictly to provide, maintain, and improve our services. Specifically, your data is used to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
            <li>Generate and secure your Flight Deck student account.</li>
            <li>Send you important administrative emails, including OTP login codes.</li>
            <li>Review your submitted assignments and provide personalized feedback.</li>
            <li>Track your progress on the Hall of Fame Leaderboard.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Data Security & Sharing</h2>
          <p>Your data is secured using industry-standard encryption. We do not sell, trade, or rent your personal identification information to others. Video recordings of mock interviews are kept strictly confidential and are only shared between you and your designated mentor.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact our support team via the Helpdesk or email us directly at support@beyondborders.com.</p>
        </section>
      </main>
    </div>
  );
}
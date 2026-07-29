'use client';
import Navbar from "../Components/auth/Shared/Navbar";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      
      <div className="bg-[#0a0a0a] border-b border-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & <span className="text-primaryAccent">Conditions</span></h1>
          <p className="text-gray-400">Please read these terms carefully before using our platform.</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-8 py-16 text-gray-300 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using the SAWN BD platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of SAWN BD. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Account Security</h2>
          <p>You are responsible for safeguarding the OTP codes you use to access the Service. Sharing your account access with non-enrolled individuals will result in immediate termination of your account without a refund.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Code of Conduct</h2>
          <p>We maintain a strict code of conduct within our Facebook community and support channels. Any form of harassment, spam, or unprofessional behavior will not be tolerated and may lead to account suspension.</p>
        </section>
      </main>
    </div>
  );
}
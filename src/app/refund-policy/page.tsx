'use client';
import Navbar from "../Components/auth/Shared/Navbar";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      
      <div className="bg-[#0a0a0a] border-b border-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refund <span className="text-primaryAccent">Policy</span></h1>
          <p className="text-gray-400">Our transparent guarantee for all recruits.</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-8 py-16 text-gray-300 space-y-8 leading-relaxed">
        <div className="bg-cardBg border border-gray-800 p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">The 3-Day Risk-Free Guarantee</h2>
          <p className="mb-4">We are confident in the value of the SAWN BD Bootcamp. However, if you log into the platform, watch the first module, and feel that this program is not the right fit for you, we offer a strict <strong>3-Day Money-Back Guarantee</strong>.</p>
          <p>To be eligible for a refund, you must submit a request within 72 hours of your account being activated. We will refund 100% of your enrollment fee, no questions asked.</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Non-Refundable Circumstances</h2>
          <p>Refunds will <strong>not</strong> be issued under the following conditions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
            <li>The refund request is made after 72 hours of account activation.</li>
            <li>You have downloaded premium resources (BB Books, SOP Templates) from the platform.</li>
            <li>Your account was terminated due to a violation of our Terms & Conditions (e.g., sharing account access).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
          <p>To request a refund, please open a ticket in the Helpdesk or email support@beyondborders.com with your enrolled email address and phone number. Refunds are processed back to the original payment method (e.g., bKash) within 3-5 business days.</p>
        </section>
      </main>
    </div>
  );
}
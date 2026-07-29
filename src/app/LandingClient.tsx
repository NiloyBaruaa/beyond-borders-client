"use client";
import { useState } from "react";
import Navbar from "./Components/auth/Shared/Navbar";
import EnrollModal from "./Components/auth/Shared/EnrollModal";

export default function LandingClient({ content }: { content: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primaryAccent selection:text-white">
      <Navbar />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="inline-block bg-darkBg border border-gray-700 px-6 py-2 rounded-full text-sm font-bold text-primaryAccent mb-6">
          {content.heroTag}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 max-w-5xl">
          {content.heroTitlePart1} <br className="hidden md:block" />
          <span className="text-primaryAccent">{content.heroTitlePart2}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-10">
          {content.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="bg-neonBlue hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-1"
          >
            {content.heroBtnText} (৳{content.coursePrice})
          </button>
          <a
            href="#curriculum"
            className="bg-darkBg border border-gray-700 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
          >
            কোর্স কারিকুলাম দেখো
          </a>
        </div>
      </section>

      {/* ---------------- IMPACT STATS ---------------- */}
      <section
        id="impact"
        className="border-y border-gray-900 bg-[#0a0a0a] py-12"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">
            {content.impactTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <div>
              <span className="block text-4xl md:text-6xl font-extrabold text-white mb-2">
                {content.stat1Number}
              </span>
              <span className="text-gray-500 font-semibold uppercase">
                {content.stat1Text}
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-6xl font-extrabold text-neonBlue mb-2">
                {content.stat2Number}
              </span>
              <span className="text-gray-500 font-semibold uppercase">
                {content.stat2Text}
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-6xl font-extrabold text-successGreen mb-2">
                {content.stat3Number}
              </span>
              <span className="text-gray-500 font-semibold uppercase">
                {content.stat3Text}
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-6xl font-extrabold text-primaryAccent mb-2">
                {content.stat4Number}
              </span>
              <span className="text-gray-500 font-semibold uppercase">
                {content.stat4Text}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PAIN VS SOLUTION ---------------- */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {content.painTitle} <span className="text-gray-700 px-4">|</span>{" "}
            {content.solutionTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {(content.pains || []).map((p: any, i: number) => (
              <div
                key={i}
                className="bg-cardBg p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-400 mb-6 border-b border-gray-800 pb-6 min-h-[100px]">
                  {p.pain}
                </p>
                <div className="text-successGreen text-lg font-bold mb-2 flex items-center gap-2">
                  {p.tag}
                </div>
                <p className="text-gray-300 text-sm">{p.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- X-FACTORS ---------------- */}
      <section className="bg-cardBg py-20 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-center text-primaryAccent font-bold tracking-widest mb-2 uppercase">
            {content.xFactorSubtitle}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {content.xFactorTitle}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.xFactors || []).map((x: any, i: number) => (
              <div
                key={i}
                className="bg-darkBg p-6 rounded-xl border border-gray-800"
              >
                <div className="text-3xl mb-4">{x.icon}</div>
                <h4 className="font-bold text-lg mb-2">{x.title}</h4>
                <p className="text-sm text-gray-400">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4 STEPS ---------------- */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            {content.stepsTitlePart1} <br />
            <span className="text-neonBlue">{content.stepsTitlePart2}</span>
          </h2>

          <div className="space-y-8 text-left">
            {(content.steps || []).map((s: any, i: number) => (
              <div
                key={i}
                className={`flex gap-6 items-start bg-cardBg p-6 rounded-2xl border ${
                  i === 3
                    ? "border-neonBlue shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                    : "border-gray-800"
                }`}
              >
                <div
                  className={`text-4xl font-black ${i === 3 ? "text-neonBlue" : "text-gray-700"}`}
                >
                  0{i + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">
                    {s.title}
                  </h4>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CURRICULUM ---------------- */}
      <section
        id="curriculum"
        className="bg-[#0a0a0a] py-20 md:py-32 border-y border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {content.curriculumTitlePart1}{" "}
            <span className="text-primaryAccent">
              {content.curriculumTitlePart2}
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.curriculum || []).map((c: any, i: number) => (
              <div
                key={i}
                className="bg-darkBg p-8 rounded-xl border border-gray-800 hover:border-primaryAccent transition"
              >
                <h4 className="text-2xl font-bold mb-3 text-white">
                  {c.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {content.projectsTitlePart1} <br />
            <span className="text-successGreen">
              {content.projectsTitlePart2}
            </span>{" "}
            {content.projectsTitlePart3}
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {(content.projects || []).map((p: any, i: number) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-6 items-center bg-cardBg p-8 rounded-2xl border ${
                  i === 2
                    ? "border-successGreen shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    : "border-gray-800"
                }`}
              >
                <div
                  className={`h-24 w-24 bg-darkBg border rounded-xl flex items-center justify-center text-4xl shadow-inner shrink-0 ${
                    i === 2 ? "border-successGreen" : "border-gray-700"
                  }`}
                >
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {p.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section
        id="testimonials"
        className="bg-[#0a0a0a] py-20 md:py-32 border-y border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {content.testimonialsTitle}
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            {content.testimonialsSubtitle}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.testimonials || []).map((t: any, i: number) => {
              const avatarColors = [
                "bg-primaryAccent",
                "bg-neonBlue",
                "bg-successGreen text-black",
                "bg-gray-600",
                "bg-purple-600",
                "bg-orange-500 text-black",
              ];
              const selectedColor = avatarColors[i % avatarColors.length];

              return (
                <div
                  key={i}
                  className="bg-darkBg p-8 rounded-xl border border-gray-800"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl ${selectedColor}`}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <h5 className="font-bold text-white">{t.name}</h5>
                      <p className="text-xs text-gray-400">{t.tag}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 italic">{t.review}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section
        id="faq"
        className="py-20 md:py-32 max-w-4xl mx-auto px-4 md:px-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          {content.faqTitlePart1}{" "}
          <span className="text-neonBlue">{content.faqTitlePart2}</span>
        </h2>

        <div className="space-y-4">
          {(content.faqs || []).map((faq: any, idx: number) => (
            <div
              key={idx}
              className="bg-cardBg border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 text-left font-bold flex justify-between items-center focus:outline-none"
              >
                {faq.q}
                <span className="text-primaryAccent text-xl">
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] py-24 text-center border-t border-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {content.ctaTitle}
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            {content.ctaSubtitle}
          </p>
          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="bg-primaryAccent hover:bg-purple-500 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-transform hover:scale-105 active:scale-95"
          >
            {content.ctaBtnText} (৳{content.coursePrice})
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#020202] py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold tracking-widest text-white mb-4">
              SAWN <span className="text-primaryAccent">BD</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{content.footerDesc}</p>
            <p className="text-gray-400 text-sm font-semibold">
              {content.footerLocation}
            </p>
            <p className="text-gray-400 text-sm">{content.footerEmail}</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-primaryAccent transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-primaryAccent transition"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  className="hover:text-primaryAccent transition"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-primaryAccent transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-primaryAccent transition"
                >
                  Terms & Condition
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              সোশ্যাল মিডিয়া
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400"
              >
                FB
              </a>
              <a
                href="#"
                className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400"
              >
                IG
              </a>
              <a
                href="#"
                className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400"
              >
                YT
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-500 text-xs">
                Developed with precise engineering standards.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs">
          {content.footerRights}
        </div>
      </footer>

      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}

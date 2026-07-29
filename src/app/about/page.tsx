"use client";

import { useRouter } from "next/navigation";
import Navbar from "../Components/auth/Shared/Navbar";
import img from "./Niloy.jpg";
import Image from "next/image";

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primaryAccent selection:text-white">
      <Navbar />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-gray-900 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primaryAccent/10 via-[#0a0a0a] to-[#050505]"></div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-block bg-darkBg border border-gray-700 px-6 py-2 rounded-full text-sm font-bold text-primaryAccent mb-6 tracking-widest uppercase">
            Behind the Mission
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Empowering Students to Go{" "}
            <span className="text-primaryAccent">SAWN BD</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            আমরা বিশ্বাস করি সঠিক গাইডলাইন, মেন্টরশিপ এবং আত্মবিশ্বাস থাকলে
            ইউরোপে উচ্চশিক্ষার স্বপ্ন পূরণ করা সবার জন্যই সম্ভব।
          </p>
        </div>
      </section>

      {/* ---------------- THE FOUNDER SECTION ---------------- */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image / Avatar Placeholder */}
            <div className="w-full lg:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primaryAccent/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative h-80 w-80 md:h-96 md:w-96 bg-darkBg border border-gray-800 rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="relative h-80 w-80 md:h-96 md:w-96">
                    <Image
                      src={img}
                      alt="About Image"
                      fill
                      className="object-cover rounded-[2rem]"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-gray-800 p-4 rounded-xl shadow-xl">
                  <p className="text-black font-bold text-lg ">
                    Niloy Barua 
                  </p>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                    Founder & Mentor
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-3/5 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Meet the <span className="text-neonBlue">Commander</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p>
                  Niloy Barua  is a highly driven educator,
                  tech-enthusiast, and a prestigious Stipendium Hungaricum
                  Scholar currently studying at the University of Nyíregyháza in
                  Hungary. His journey from Bangladesh to Europe
                  was paved with academic excellence, having achieved a GPA of
                  5.00 with perfect marks in Physics and Higher
                  Mathematics.
                </p>
                <p>
                  At his university, he actively serves as a Student Recruiter
                  and International Ambassador, providing essential mentorship
                  and admission guidance to prospective international
                  students. Furthermore, he is an Elected Student
                  Representative, passionately advocating for student concerns
                  and bridging the gap between the student body and university
                  administration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- EXPERTISE & LEADERSHIP ---------------- */}
      <section className="bg-cardBg py-20 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A Background Built on{" "}
              <span className="text-primaryAccent">Excellence</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              SAWN BD is backed by years of teaching, leadership, and
              digital infrastructure experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Box 1: Education */}
            <div className="bg-darkBg p-8 rounded-2xl border border-gray-800 hover:border-primaryAccent transition-colors group">
              <div className="h-16 w-16 bg-primaryAccent/10 text-primaryAccent rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Educator at Heart
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Before guiding students to Europe, Niloy served as a Physics
                Lecturer  and founded Physixtry, an educational
                platform dedicated to making complex scientific concepts
                accessible and engaging.
              </p>
            </div>

            {/* Box 2: Leadership */}
            <div className="bg-darkBg p-8 rounded-2xl border border-gray-800 hover:border-successGreen transition-colors group">
              <div className="h-16 w-16 bg-successGreen/10 text-successGreen rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🎖️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Strategic Leadership
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                His discipline and operational decision-making were forged in
                the Bangladesh National Cadet Corps (BNCC).
                Serving as a Regiment Cultural Sergeant  and
                volunteering during national crises like the 2024 floods, he knows how to lead teams under high pressure.
              </p>
            </div>

            {/* Box 3: Tech */}
            <div className="bg-darkBg p-8 rounded-2xl border border-gray-800 hover:border-neonBlue transition-colors group">
              <div className="h-16 w-16 bg-neonBlue/10 text-neonBlue rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                💻
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Digital Innovator
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Beyond teaching, Niloy is a skilled Web Developer who has built
                entire digital ecosystems and interactive platforms for academic
                institutions and clinical laboratories, bringing a seamless
                digital experience to SAWN BD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Let an experienced mentor and successful scholarship recipient guide
            you through the complex maze of European admissions and visas.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-primaryAccent hover:bg-purple-500 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-transform hover:scale-105 active:scale-95"
          >
            Explore the Bootcamp
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER (Simplified for About Page) ---------------- */}
      <footer className="bg-[#020202] py-8 border-t border-gray-900 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xl font-bold tracking-widest text-white mb-4">
            SWAN <span className="text-primaryAccent">BD</span>
          </div>
          <p>
            © 2026 SAWN BD with Niloy Baruaa. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../Components/auth/Shared/Navbar';
import EnrollModal from '../Components/auth/Shared/EnrollModal';

const DEFAULT_CONTENT = {
  sfHeroTitlePart1: "Heroes are",
  sfHeroTitlePart2: "Borderless",
  sfHeroDesc: "তুমি যদি কনফিডেন্ট হও, তবে লোকেশন কোনো ব্যারিয়ার নয়। আমাদের স্টুডেন্টরা ১৫+ দেশে সম্পূর্ণ স্কলারশিপ নিয়ে পড়াশোনা করছে। তাহলে আজই শুরু করে দাও তোমার ইউরোপের জার্নি।",
  
  sfStat1Num: "15+", sfStat1Label: "Countries",
  sfStat2Num: "50+", sfStat2Label: "Visa Approvals",
  sfStat3Num: "100%", sfStat3Label: "Self-Processed",
  sfStat4Num: "95%", sfStat4Label: "Success Ratio",

  sfPlacementTitle: "Our Heroes Placed At",
  sfPlacementDesc: "SAWN BD এর সুপার গাইডেড বুটক্যাম্পের স্টুডেন্টরা ইউরোপের বিভিন্ন দেশে ফুল ফান্ডিং নিয়ে পড়াশোনা করছে।",
  sfPlacements: [
    { country: "Germany", percent: "25.5%" },
    { country: "Hungary", percent: "18.3%" },
    { country: "Austria", percent: "15.2%" },
    { country: "Italy", percent: "12.4%" },
    { country: "Sweden", percent: "10.8%" },
    { country: "Poland", percent: "8.7%" }
  ],

  sfTestimonialTitle: "Successful Students",
  sfTestimonialDesc: "মাইন্ডসেট তৈরি করা থেকে শুরু করে এম্বাসি ফেস করা পর্যন্ত।",
  sfTestimonials: [
    { name: "Sadikur Rahman", country: "Hungary", university: "University of Nyíregyháza", feedback: "I was terrified of the embassy. My English wasn't perfect, and I thought they would reject me instantly. The mock interviews in this bootcamp completely changed my body language. When I faced the real officer, it felt easier than the bootcamp! The 1:1 mentorship helped me secure my spot with full confidence." },
    { name: "Fahim Faysal", country: "Germany", university: "Technical University of Munich", feedback: "এজেন্সি আমাকে বলেছিল আমার প্রোফাইলে ভিসা হবে না। SAWN BD এর গাইডলাইন ফলো করে আমি নিজে SOP লিখি এবং ইউনিভার্সিটি খুঁজি। আলহামদুলিল্লাহ, আজ আমি মিউনিখে। The strict deadline and assignment system kept me on track. I didn't know how to write an SOP before this. The platform is so professional." },
    { name: "Nusrat Jahan", country: "Austria", university: "University of Vienna", feedback: "The document mastery module saved my life. I was about to submit a terrible CV. The platform's gamified system with Gems made learning how to process files actually fun and addictive. I got my visa approved in just 14 days without paying a single penny to any agency." },
    { name: "Tanvir Ahmed", country: "Poland", university: "Warsaw University of Technology", feedback: "Everything is so structured. The bootcamp doesn't just spoon-feed you; it forces you to build your own confidence. The day of my embassy interview, I answered every question with zero hesitation. The visa Q&A cracker module is literally a lifesaver for Bangladeshi students." },
    { name: "Sabit Hossen", country: "Italy", university: "Sapienza University of Rome", feedback: "আমি নন-টেকনিক্যাল ব্যাকগ্রাউন্ড থেকে আসা একজন শিক্ষার্থী। প্রসেস কনফিউশন নিয়ে অনেক প্যারায় ছিলাম। কিন্তু কোর্সে এনরোল করার পর বিষয়গুলো আয়ত্তে আনা সহজ ছিল। এই সময়ে সুন্দর কমিউনিটি আমাকে শিখিয়েছে কিভাবে ডেডলাইন মেইন্টেইন করে কাজ করা যায়। আজ আমি ইতালিতে আমার মাস্টার্স শুরু করেছি।" },
    { name: "Sumyta Bentey", country: "Sweden", university: "KTH Royal Institute", feedback: "SAWN BD has been a game-changer in my journey. With its constant guidance, practical projects, and supportive community, I’ve grown tremendously. I’m truly grateful — their mentorship and structured learning helped me build confidence and finally crack my embassy interview!" },
    { name: "Dipok Kumar", country: "Finland", university: "Aalto University", feedback: "স্টাডি অ্যাব্রোড নিয়ে কেউ যদি নিজের উপর চ্যালেঞ্জ নিতে চায়, নিজের জীবনে একটা পরিবর্তন আনতে চায়, তার জন্য উত্তম উসিলা হতে পারে এই বুটক্যাম্প। আমি নিজে নিজে ফাইল প্রসেস করে ফিনল্যান্ডে এসেছি। এই জার্নিটা মোটেও সহজ ছিল না, কিন্তু মেন্টরদের অনবরত সাপোর্ট আমাকে লক্ষ্যে পৌঁছাতে সাহায্য করেছে।" },
    { name: "Sazid Ahamed", country: "Denmark", university: "Aarhus University", feedback: "First of all, I would like to thank the entire SAWN BD family. For me, this journey was not just a course, it was a continuous learning experience at every step. It has guided me with the right structure, mentorship, and resources to grow both technically and personally." }
  ],

  sfVideoTitle: "Details Interview Students",
  sfVideos: [
    { title: "একটাই লক্ষ্য ছিল ইউরোপে মাস্টার্স করতে হবে", views: "7.2K views", time: "2 months ago" },
    { title: "এজেন্সি ছাড়া নিজে ফাইল প্রসেস করার জার্নি", views: "12.9K views", time: "3 months ago" },
    { title: "ভিসা ইন্টারভিউতে নার্ভাসনেস কাটানোর উপায়", views: "6.6K views", time: "4 months ago" },
    { title: "ফুল-ফান্ডেড স্কলারশিপ কিভাবে পেলাম!", views: "37.2K views", time: "5 months ago" }
  ],

  sfCtaTitle: "তাহলে আর দেরি কেন?",
  sfCtaSubtitle: "শেখো প্রসেসিং, বদলে ফেলো ফিউচার",
  sfCtaDesc: "প্রযুক্তির এই যুগে সঠিক গাইডলাইন জানা মানে শুধু একটা স্কিল নয়, এটি একটা স্ট্রং ক্যারিয়ার গড়ার চাবিকাঠি। তোমার জন্য SAWN BD এমন একটা বুটক্যাম্প নিয়ে এসেছে, যেখানে তুমি শিখবে শুন্য থেকে প্রোফেশনাল লেভেল পর্যন্ত। এবং সেই শেখাটা দিয়ে তোমার স্টাডি অ্যাব্রোড নিশ্চিত করার দায়িত্ব তোমার নিজের হাতেই তুলে দিবো আমরা।",
  sfCtaBtn: "Enroll Now (৳1500)",

  sfFooterAddress: "📍 Level-4, Awal Centre, Banani, Dhaka",
  sfFooterPhone: "01700-000000"
};

export default function StudentFeedback() {
  const router = useRouter();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [dbContent, setDbContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/landing-content`);
        const data = await res.json();
        if (data && Object.keys(data).length > 2) {
          setDbContent(data);
        } else {
          setDbContent(DEFAULT_CONTENT);
        }
      } catch (e) {
        setDbContent(DEFAULT_CONTENT);
      }
    };
    fetchContent();
  }, []);

  if (!dbContent) return <div className="min-h-screen bg-[#050505]"></div>;

  const content = { ...DEFAULT_CONTENT, ...dbContent };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primaryAccent selection:text-white">
      <Navbar />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-[#0a0a0a] border-b border-gray-900 py-16 md:py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          {content.sfHeroTitlePart1} <span className="text-primaryAccent">{content.sfHeroTitlePart2}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
          {content.sfHeroDesc}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-darkBg p-6 rounded-2xl border border-gray-800">
            <span className="block text-4xl md:text-5xl font-extrabold text-white mb-2">{content.sfStat1Num}</span>
            <span className="text-gray-500 font-bold uppercase text-sm">{content.sfStat1Label}</span>
          </div>
          <div className="bg-darkBg p-6 rounded-2xl border border-gray-800">
            <span className="block text-4xl md:text-5xl font-extrabold text-neonBlue mb-2">{content.sfStat2Num}</span>
            <span className="text-gray-500 font-bold uppercase text-sm">{content.sfStat2Label}</span>
          </div>
          <div className="bg-darkBg p-6 rounded-2xl border border-gray-800">
            <span className="block text-4xl md:text-5xl font-extrabold text-successGreen mb-2">{content.sfStat3Num}</span>
            <span className="text-gray-500 font-bold uppercase text-sm">{content.sfStat3Label}</span>
          </div>
          <div className="bg-darkBg p-6 rounded-2xl border border-gray-800">
            <span className="block text-4xl md:text-5xl font-extrabold text-primaryAccent mb-2">{content.sfStat4Num}</span>
            <span className="text-gray-500 font-bold uppercase text-sm">{content.sfStat4Label}</span>
          </div>
        </div>
      </section>

      {/* ---------------- PLACEMENT STATS ---------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.sfPlacementTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{content.sfPlacementDesc}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {(content.sfPlacements || []).map((stat: any, idx: number) => (
            <div key={idx} className="bg-cardBg p-6 rounded-xl border border-gray-800 hover:border-primaryAccent transition">
              <h4 className="text-xl font-bold text-white mb-2">{stat.country}</h4>
              <span className="text-primaryAccent font-black text-2xl">{stat.percent}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- TESTIMONIAL GRID ---------------- */}
      <section className="bg-cardBg py-20 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.sfTestimonialTitle}</h2>
              <p className="text-gray-400">{content.sfTestimonialDesc}</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-gray-500 text-sm">Showing 01 of 5 Pages</span>
              <button className="block mt-2 text-primaryAccent font-bold hover:underline">All Batch Students</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.sfTestimonials || []).map((student: any, idx: number) => (
              <div key={idx} className="bg-darkBg p-6 rounded-xl border border-gray-800 flex flex-col h-full hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all">
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Batch 1</span>
                  <h4 className="text-lg font-bold text-white truncate">{student.name}</h4>
                  <p className="text-sm text-neonBlue truncate">{student.university}</p>
                  <p className="text-xs text-gray-400 mt-1">{student.country} Visa Approved</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300 italic line-clamp-6 leading-relaxed">
                    "{student.feedback}"
                  </p>
                </div>
                <button className="text-primaryAccent text-xs font-bold mt-4 text-left hover:underline">
                  See More
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <button className="px-6 py-2 bg-darkBg border border-gray-700 rounded text-gray-400 hover:text-white hover:border-gray-500 transition">Previous</button>
            <button className="px-6 py-2 bg-primaryAccent text-white rounded font-bold hover:bg-purple-500 transition">Next</button>
          </div>
        </div>
      </section>

      {/* ---------------- VIDEO INTERVIEWS ---------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">{content.sfVideoTitle}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(content.sfVideos || []).map((video: any, idx: number) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-video bg-cardBg border border-gray-800 rounded-xl relative overflow-hidden mb-4 group-hover:border-primaryAccent transition">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-white mb-1 line-clamp-2">{video.title}</h4>
              <p className="text-xs text-gray-400">{video.views} • {video.time}</p>
              <p className="text-xs text-primaryAccent mt-1">SAWN BD Bangladesh</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] py-24 text-center border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{content.sfCtaTitle}</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-neonBlue mb-6">{content.sfCtaSubtitle}</h3>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            {content.sfCtaDesc}
          </p>
          <button 
            onClick={() => setIsEnrollModalOpen(true)}
            className="bg-primaryAccent hover:bg-purple-500 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-transform hover:scale-105 active:scale-95"
          >
            {content.sfCtaBtn}
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#020202] py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold tracking-widest text-white mb-4">
              SWAN <span className="text-primaryAccent">BD</span>
            </div>
            <p className="text-gray-400 text-sm font-semibold mb-2">{content.sfFooterAddress || content.footerLocation}</p>
            <p className="text-gray-400 text-sm mb-2">{content.footerEmail}</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs mb-1">যেকোন জিজ্ঞাসায় ফোন করো</p>
              <p className="text-neonBlue font-bold">{content.sfFooterPhone}</p>
              <p className="text-gray-600 text-[10px]">(Sat - Thu, 10:00 AM to 7:00 PM)</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">লিঙ্কসমূহ</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-primaryAccent transition">About Us</a></li>
              <li><a href="#" className="hover:text-primaryAccent transition">Success Page</a></li>
              <li><a href="#" className="hover:text-primaryAccent transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">পলিসি</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="/refund-policy" className="hover:text-primaryAccent transition">Refund Policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-primaryAccent transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primaryAccent transition">Terms & Condition</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">সোশ্যাল মিডিয়া</h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400">FB</a>
              <a href="#" className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400">IG</a>
              <a href="#" className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400">YT</a>
              <a href="#" className="h-10 w-10 bg-darkBg border border-gray-800 rounded-full flex items-center justify-center hover:bg-primaryAccent hover:text-white transition-colors text-gray-400">IN</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center">
          <p>{content.footerRights}</p>
          <p className="mt-2 md:mt-0">Developed with precise engineering standards.</p>
        </div>
      </footer>

      <EnrollModal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} />
    </div>
  );
}
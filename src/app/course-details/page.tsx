'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "../Components/auth/Shared/Navbar";
import EnrollModal from "../Components/auth/Shared/EnrollModal";

const DEFAULT_CONTENT = {
  cdHeroTitlePart1: "Course",
  cdHeroTitlePart2: "Details",
  cdHeroDesc: "SAWN BD বুটক্যাম্পের সম্পূর্ণ কারিকুলাম। ৪ সপ্তাহের এই ইনটেনসিভ প্রোগ্রামে আমরা তোমাকে ইউরোপের যেকোনো এম্বাসি ফেস করার জন্য প্রস্তুত করব।",
  cdCurriculum: [
    {
      module: "Module 01: Mindset & Foundation",
      topics: [
        "ইউরোপিয়ান স্টাডি কালচার ও রিয়েলিটি চেক",
        "টাইম ম্যানেজমেন্ট ও প্রবাস জীবনের প্রস্তুতি",
        "ভিসা প্রসেসিং এর বেসিক রোডম্যাপ",
        "এজেন্সি ছাড়া নিজে ফাইল প্রসেস করার কনফিডেন্স বিল্ডআপ"
      ],
      description: "শুরুতেই আমরা ফোকাস করব তোমার মাইন্ডসেটের উপর। কারণ সঠিক মানসিক প্রস্তুতি ছাড়া স্টাডি অ্যাব্রোড জার্নিতে টিকে থাকা অসম্ভব।"
    },
    {
      module: "Module 02: Document Mastery",
      topics: [
        "ATS ফ্রেন্ডলি Europass CV তৈরি (হাতে-কলমে)",
        "Motivation Letter / SOP লেখার সিক্রেট স্ট্রাকচার",
        "Recommendation Letter ও অন্যান্য একাডেমিক ডকুমেন্টস গোছানো",
        "ফান্ডিং ও স্কলারশিপের জন্য স্পেশাল ফাইল প্রিপারেশন"
      ],
      description: "কপি-পেস্ট করা ডকুমেন্ট দিয়ে ভিসা হয় না। এই মডিউলে তুমি নিজের জীবনের গল্প দিয়ে একটি ১০০% ইউনিক ও প্রফেশনাল ফাইল রেডি করবে।"
    },
    {
      module: "Module 03: University Hunting",
      topics: [
        "সঠিক কোর্স ও ইউনিভার্সিটি খোঁজার হ্যাকস",
        "প্রফেসরদের ইমেইল করার প্রফেশনাল টেমপ্লেট",
        "ফুল-ফান্ডেড স্কলারশিপ পোর্টালে নেভিগেশন",
        "অফার লেটার কনফার্ম করার পরের ধাপ"
      ],
      description: "এজেন্সির উপর ভরসা না করে নিজের প্রোফাইল অনুযায়ী ইউরোপের টপ ইউনিভার্সিটিগুলো খুঁজে বের করার টেকনিক।"
    },
    {
      module: "Module 04: Embassy English & Body Language",
      topics: [
        "এম্বাসিতে ন্যাচারাল স্পোকেন ইংলিশের প্র্যাকটিস",
        "নার্ভাসনেস কাটানোর সাইকোলজিক্যাল ট্রিকস",
        "আই কন্ট্যাক্ট, পসচার এবং প্রফেশনাল ড্রেস কোড",
        "ভিসা অফিসারদের সাইকোলজি রিডিং"
      ],
      description: "শুধু ভালো রেজাল্ট থাকলেই হয় না, এম্বাসিতে নিজেকে প্রেজেন্ট করতে হয়। 'Look weak' করার দিন শেষ।"
    },
    {
      module: "Module 05: The Final Boss (Mock Interview)",
      topics: [
        "কমন ও আনকমন ভিসা ইন্টারভিউ প্রশ্নের উত্তর",
        "ফান্ডিং ও গ্যাপ ইয়ার রিলেটেড ট্রিকি প্রশ্ন হ্যান্ডেলিং",
        "লাইভ ওয়ান-টু-ওয়ান মক ইন্টারভিউ সেশন",
        "ফাইনাল ফিডব্যাক ও ইম্প্রুভমেন্ট প্ল্যান"
      ],
      description: "রিয়েল এম্বাসির আদলে তোমাকে প্রশ্ন করা হবে। এই মডিউল সাকসেসফুলি শেষ করলে ভিসা ইন্টারভিউ তোমার কাছে জাস্ট একটা সাধারণ আড্ডা মনে হবে।"
    }
  ],
  cdCtaTitle: "জার্নি শুরু করতে প্রস্তুত?",
  cdCtaDesc: "সিলেবাস তো দেখলে, এবার প্র্যাকটিক্যালি কাজ শুরু করার পালা। আজই জয়েন করো এবং নিজের প্রোফাইল রেডি করা শুরু করো।",
  cdCtaBtn: "এনরোলমেন্ট নিশ্চিত করো"
};

export default function CourseDetails() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [dbContent, setDbContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/auth/landing-content`);
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
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navbar />

      {/* HEADER SECTION */}
      <div className="bg-[#0a0a0a] border-b border-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {content.cdHeroTitlePart1} <span className="text-primaryAccent">{content.cdHeroTitlePart2}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.cdHeroDesc}
          </p>
        </div>
      </div>

      {/* CURRICULUM LISTING */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="space-y-8">
          {(content.cdCurriculum || []).map((item: any, index: number) => (
            <div key={index} className="bg-cardBg border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">{item.module}</h2>
              <p className="text-gray-400 mb-6 pb-6 border-b border-gray-800">{item.description}</p>
              
              <h3 className="text-sm font-bold text-primaryAccent uppercase tracking-widest mb-4">এই মডিউলে যা শিখবে:</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {(item.topics || []).map((topic: string, tIdx: number) => (
                  <li key={tIdx} className="flex items-start gap-3">
                    <span className="text-successGreen mt-1">✓</span>
                    <span className="text-gray-300">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 bg-gradient-to-r from-primaryAccent/20 to-neonBlue/20 border border-gray-800 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">{content.cdCtaTitle}</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{content.cdCtaDesc}</p>
          <button 
            onClick={() => setIsEnrollModalOpen(true)}
            className="bg-primaryAccent hover:bg-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-transform hover:scale-105"
          >
            {content.cdCtaBtn}
          </button>
        </div>
      </div>

      <EnrollModal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} />
    </div>
  );
}
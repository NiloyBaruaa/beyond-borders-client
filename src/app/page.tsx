"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Components/auth/Shared/Navbar";
import EnrollModal from "./Components/auth/Shared/EnrollModal";

// --- ডেটাবেজ খালি থাকলে প্রদর্শনের জন্য ১০০% নিখুঁত ডিফল্ট বাংলা ডেটা ---
const DEFAULT_CONTENT = {
  // ১. হিরো সেকশন
  heroTag: "🚀 ৪ সপ্তাহের সুপার গাইডেড Visa Bootcamp",
  heroTitlePart1: "শূন্য থেকে শুরু করে ইউরোপের",
  heroTitlePart2: "স্টাডি অ্যাব্রোড স্কলারশিপ!",
  heroSubtitle:
    "নিশ্চিত করো তোমার ভিসা এবং ইউরোপের জার্নি। ৪ সপ্তাহের সুপার গাইডেড Bootcamp, যেকোনো সমস্যায় ক্রেজি লেভেলের লাইভ Support, রিয়েল-লাইফ Mock Interview, ও প্রিমিয়াম গাইডলাইন— যার মাধ্যমে তুমি পাবে ইউরোপে নিজের স্বপ্ন পূরণের ১০০% কনফিডেন্স।",
  heroBtnText: "বুটক্যাম্পে জয়েন করো",
  coursePrice: "1500",

  // ২. ইম্প্যাক্ট স্ট্যাটস সেকশন
  impactTitle: "আমাদের স্টুডেন্টদের ইম্প্যাক্ট",
  stat1Number: "15+",
  stat1Text: "ইউরোপিয়ান দেশে",
  stat2Number: "100%",
  stat2Text: "ভিসা কনফিডেন্স",
  stat3Number: "50+",
  stat3Text: "সাকসেসফুল কেস",
  stat4Number: "95%",
  stat4Text: "স্কলারশিপ রেশিও",

  // ৩. পেইন বনাম সমাধান সেকশন
  painTitle: "তোমার প্যারা",
  solutionTitle: "আমাদের সমাধান",
  pains: [
    {
      pain: '"কী শিখব, কোথা থেকে শুরু করব, এম্বাসিতে কী প্রশ্ন করবে কিছুই বুঝি না। এজেন্সির কাছে গিয়ে ধোঁকা খাই।"',
      tag: "✅ গাইডলাইন রেডি",
      solution:
        "আমরা পুরোアウトলাইন, চেকলিস্ট আর গাইডলাইন রেডি করেই তোমার সাথে আছি। ফাইল প্রোসেসিং তুমি নিজেই করবে।",
    },
    {
      pain: '"ভিসা ইন্টারভিউতে নার্ভাস লাগে, ইংলিশে কথা বলতে ভয় পাই। স্কিল ও কনফিডেন্স নেই।"',
      tag: "✅ লাইভ মক ইন্টারভিউ",
      solution:
        "আমাদের লাইভ মক ইন্টারভিউ ও স্পোকেন ইংলিশ প্র্যাকটিসের মাধ্যমে তোমার এম্বাসি ফেস করার ভয় পুরোপুরি কেটে যাবে।",
    },
    {
      pain: '"রেগুলারিটি বজায় রাখতে পারি না – মাঝপথেই মোটিভেশন হারিয়ে থেমে যাই।"',
      tag: "✅ ক্রেজি সাপোর্ট সিস্টেম",
      solution:
        "ডেডিকেটেড লাইভ সাপোর্ট, এসাইনমেন্ট ডেডলাইন ও ২৪/৭ কমিউনিটি সাপোর্টে থেমে যাওয়ার কোনো চান্স নেই।",
    },
  ],

  // ৪. এক্স-ফ্যাক্টর সেকশন
  xFactorSubtitle: "Why Us?",
  xFactorTitle: "এই বুটক্যাম্পের X ফ্যাক্টর",
  xFactors: [
    {
      icon: "🎯",
      title: "১:১ মেন্টরশিপ",
      desc: "শুধু ভিডিও দিয়ে ছেড়ে দেওয়া নয়। প্রোফাইল অনুযায়ী গুগল মিটে বসে স্ট্রং ও উইক পয়েন্ট বের করে পার্সোনালাইজড প্ল্যান।",
    },
    {
      icon: "🎙️",
      title: "লাইভ সাপোর্ট সেশন",
      desc: "সপ্তাহে নির্দিষ্ট দিনে লাইভ সেশন। সরাসরি এম্বাসি অফিসারের মতো প্রশ্ন করা হবে এবং বডি ল্যাঙ্গুয়েজ ঠিক করা হবে।",
    },
    {
      icon: "💬",
      title: "২৪/৭ কমিউনিটি সাপোর্ট",
      desc: "দিন-রাত যেখানে তোমার যেকোনো সমস্যা থাকবে সহজেই পাবে সমাধান। ডেডিকেটেড ফেসবুক গ্রুপ ও হেল্পডেস্কে।",
    },
    {
      icon: "⚙️",
      title: "গাইডেড এনভায়রনমেন্ট",
      desc: "আমাদের সাথে শিখবে ৪টি উইকলি মডিউল, প্র্যাকটিক্যাল টাস্ক ও এসাইনমেন্টের মাধ্যমে একটি ডিসিপ্লিনড প্ল্যাটফর্মে।",
    },
  ],

  // ৫. ৪টি ধাপ সেকশন
  stepsTitlePart1: "ইউরোপ যাওয়ার",
  stepsTitlePart2: "৪টি সহজ ধাপ",
  steps: [
    {
      title: "ভর্তি হও",
      desc: "জয়েন হয়ে যাও SAWN BD Bootcamp-এ। ইউরোপের স্কলারশিপ স্টুডেন্টদের গাইডলাইনে নিজের যাত্রা শুরু করো।",
    },
    {
      title: "গাইডলাইন ও মেন্টরশীপ নাও",
      desc: "আমাদের ক্রেজি সাপোর্ট নিয়ে নিজের SOP, CV এবং ডকুমেন্টস রেডি করো। নোলেজ ও স্কিল নিয়ে পরের লাফ দেয়ার জন্য রেডি হয়ে যাও।",
    },
    {
      title: "লাইভ মক ইন্টারভিউ দাও",
      desc: "নার্ভাসনেস কাটিয়ে কনফিডেন্টলি ইংলিশে কথা বলা প্র্যাকটিস করো। এম্বাসির ভাইব আগেই ফেস করো।",
    },
    {
      title: "ভিসা ফেস করো ও টিকিট কাটো",
      desc: "আমাদের প্রমাণিত গাইডলাইনের মাধ্যমে তুমি পাবে ১০০% কনফিডেন্স। এম্বাসি ফেস করো এবং ইউরোপের স্টুডেন্ট লাইফ শুরু করো!",
    },
  ],

  // ৬. কারিকুলাম সেকশন
  curriculumTitlePart1: "তুমি কী",
  curriculumTitlePart2: "শিখবে?",
  curriculum: [
    {
      title: "Mindset & Reality",
      desc: "কেন ইউরোপ? ইউরোপের এডুকেশন সিস্টেম এবং স্টুডেন্ট লাইফের আসল রিয়েলিটি। মানসিক প্রস্তুতি ছাড়া এই জার্নি সম্ভব নয়, তাই শুরুতেই আমরা মাইন্ডসেট তৈরি করব।",
    },
    {
      title: "Document Mastery",
      desc: "কিভাবে প্রফেশনাল Europass CV বানাতে হয়, Motivational Letter (SOP) লেখার এ টু জেড সিক্রেট, এবং এম্বাসির জন্য নিখুঁতভাবে ফাইল গোছানোর চেকলিস্ট।",
    },
    {
      title: "University Hunting",
      desc: "এজেন্সির উপর ভরসা না করে নিজের প্রোফাইল অনুযায়ী সঠিক ইউনিভার্সিটি এবং ফুল-ফান্ডেড স্কলারশিপ খোঁজার টেকনিক।",
    },
    {
      title: "Embassy English",
      desc: 'শুধু IELTS নয়, এম্বাসিতে কথা বলার জন্য যে ধরনের স্মার্ট ও ন্যাচারাল স্পোকেন ইংলিশ দরকার, তার প্র্যাকটিস। "Look weak" করার দিন শেষ।',
    },
    {
      title: "Visa Q&A Cracker",
      desc: 'ভিসা অফিসাররা আসলে কী দেখে? "Why this country?" এর মতো কমন প্রশ্নগুলোর স্মার্ট উত্তর কীভাবে দিতে হয় এবং নার্ভাসনেস কাটানোর সাইকোলজিক্যাল ট্রিকস।',
    },
    {
      title: "Body Language",
      desc: "এম্বাসিতে ঢোকা থেকে শুরু করে বের হওয়া পর্যন্ত আই কন্ট্যাক্ট, বসার স্টাইল, এবং কনফিডেন্স শো করার অব্যর্থ উপায়।",
    },
  ],

  // ৭. প্রজেক্ট সেকশন
  projectsTitlePart1: "বুটক্যাম্পে তুমি যেসব",
  projectsTitlePart2: "রিয়েল-লাইফ প্রজেক্ট",
  projectsTitlePart3: "করবে",
  projects: [
    {
      icon: "📝",
      title: "Project Alpha: The Perfect SOP",
      desc: "কপি-পেস্ট করা SOP দিয়ে ভিসা হয় না। এই প্রজেক্টের মাধ্যমে তুমি নিজের জীবনের গল্প দিয়ে একটি ১০০% ইউনিক ও প্রফেশনাল Statement of Purpose তৈরি করবে যা এম্বাসি অফিসারকে ইমপ্রেস করবে।",
    },
    {
      icon: "🎥",
      title: "Project Beta: Video Pitch",
      desc: "ইউনিভার্সিটির এডমিশন ইন্টারভিউয়ের জন্য একটি ডেমো ভিডিও রেকর্ড করে পোর্টালে সাবমিট করবে। এর মাধ্যমে তোমার স্পিকিং এর জড়তা কাটবে এবং কনফিডেন্স বিল্ড হবে।",
    },
    {
      icon: "🏛️",
      title: "The Final Boss: Mock Interview",
      desc: "এটি একটি cup-length লাইভ মক ইন্টারভিউ সেশন। এম্বাসির আদলে তোমাকে প্রশ্ন করা হবে। এই প্রজেক্ট সাকসেসফুলি শেষ করলে ভিসা ইন্টারভিউ তোমার কাছে মনে হবে জাস্ট একটা সাধারণ আড্ডা!",
    },
  ],

  // ৮. টেস্টীমোনিয়াল সেকশন
  testimonialsTitle: "সফলতার গল্প শোনো",
  testimonialsSubtitle:
    "যারা আমাদের গাইডলাইন ফলো করে নিজেদের ভয়কে জয় করেছে এবং আজ ইউরোপের বিভিন্ন ক্যাম্পাসে নিজেদের স্বপ্ন পূরণ করছে।",
  testimonials: [
    {
      initial: "S",
      name: "Sadikur Rahman",
      tag: "Hungary Visa Approved",
      review:
        '"I was terrified of the embassy. My English wasn\'t perfect, and I thought they would reject me instantly. The mock interviews in this bootcamp completely changed my body language. When I faced the real officer, it felt easier than the bootcamp!"',
    },
    {
      initial: "F",
      name: "Fahim Faysal",
      tag: "Germany Student Visa",
      review:
        '"এজেন্সি আমাকে বলেছিল আমার প্রোফাইলে ভিসা হবে না। SAWN BD এর গাইডলাইন ফলো করে আমি নিজে SOP লিখি এবং ইউনিভার্সিটি খুঁজি। আলহামদুলিল্লাহ, আজ আমি মিউনিখে। The 1:1 mentorship is a game changer."',
    },
    {
      initial: "N",
      name: "Nusrat Jahan",
      tag: "Austria Visa Approved",
      review:
        '"The strict deadline and assignment system kept me on track. I didn\'t know how to write an SOP before this. The platform is so professional, it felt like I was already studying in a European university."',
    },
    {
      initial: "T",
      name: "Tanvir Ahmed",
      tag: "Poland Visa Approved",
      review:
        '"Everything is so structured. Niloy vai doesn\'t just spoon-feed you; he forces you to build your own confidence. The day of my embassy interview, I answered every question with zero hesitation."',
    },
    {
      initial: "R",
      name: "Rakib Hasan",
      tag: "Sweden Scholarship",
      review:
        '"The document mastery module saved my life. I was about to submit a terrible CV. The platform\'s gamified system with Gems made learning how to process files actually fun and addictive."',
    },
    {
      initial: "M",
      name: "Mahmudul Hasan",
      tag: "Italy Visa Approved",
      review:
        '"আমি ভাবতাম visa interview মানেই কঠিন ইংলিশ। বুটক্যাম্প থেকে বুঝলাম ওরা শুধু কনফিডেন্স আর সততা দেখে। The Mock interview was exactly what I needed to break my fear."',
    },
  ],

  // ৯. এফএকিউ সেকশন
  faqTitlePart1: "তোমার যত",
  faqTitlePart2: "প্রশ্ন",
  faqs: [
    {
      q: "আমি একদম বিগিনার, আমার কি এই কোর্স করা ঠিক হবে?",
      a: "হ্যাঁ! যারা একদম শূন্য থেকে শুরু করে ইউরোপে স্টাডি অ্যাব্রোড এর জার্নি শুরু করতে চায়, তাদের জন্যই এই বুটক্যাম্প। এখানে বেসিক থেকে শুরু করে এম্বাসি ফেস করা পর্যন্ত সব গাইডলাইন দেওয়া হবে।",
    },
    {
      q: "কোর্সটি কিভাবে করানো হবে?",
      a: "এটি একটি সুপার-গাইডেড হাইব্রিড বুটক্যাম্প। আমাদের নিজস্ব পোর্টালে রেকর্ডেড ভিডিও, চেকলিস্ট এবং এসাইনমেন্ট থাকবে। আর সপ্তাহে নির্দিষ্ট দিনে লাইভ মক ইন্টারভিউ এবং সাপোর্ট সেশন হবে।",
    },
    {
      q: "আমি কি এজেন্সির সাহায্য ছাড়াই নিজে নিজে অ্যাপ্লাই করতে পারবো?",
      a: "অবশ্যই। আমাদের প্রধান লক্ষ্যই হলো তোমাকে সেলফ-ডিপেন্ডেন্ট বানানো। তুমি নিজেই নিজের SOP লিখবে এবং ভার্সিটি খুঁজবে, আমরা মেন্টর হিসেবে তোমার ভুল শুধরে দিব।",
    },
    {
      q: "আমি যদি এসাইনমেন্ট মিস করি?",
      a: "আমাদের সিস্টেমে ডেডলাইন খুব স্ট্রিক্ট। এসাইনমেন্ট মিস করলে বা কোয়ালিটি খারাপ হলে পেনাল্টি (Gems কাটা যাবে) এবং রিসাবমিট করতে হবে। রিয়েল লাইফে এম্বাসিতে কোনো এক্সকিউজ চলে না, তাই আমাদের বুটক্যাম্পেও ডিসিপ্লিন বজায় রাখতে হবে।",
    },
  ],

  // ১০. সিটিএ সেকশন
  ctaTitle: "তাহলে আর দেরি কেন?",
  ctaSubtitle:
    "সঠিক গাইডলাইন ছাড়া স্টাডি অ্যাব্রোড জার্নি শুরু করা মানে নিজের স্বপ্ন নিয়ে জুয়া খেলা। তোমার কনফিডেন্স বিল্ড করার দায়িত্ব এখন আমাদের।",
  ctaBtnText: "এনরোলমেন্ট নিশ্চিত করো",

  // ১১. ফুটার সেকশন
  footerDesc:
    "Scholarship student in Europe helping Bangladeshi students prepare confidently for study abroad, visa interviews, and English communication.",
  footerLocation: "📍 Nyíregyháza, Hungary",
  footerEmail: "support@beyondborders.com",
  footerRights: "© 2026 SAWN BD with Niloy Baruaa. All rights reserved.",
};

export default function LandingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [dbContent, setDbContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/landing-content`,
        );
        const data = await res.json();
        if (data && Object.keys(data).length > 2) {
          setDbContent(data);
        } else {
          setDbContent(DEFAULT_CONTENT);
        }
      } catch (e) {
        console.error("Error loading CMS, handling fallback config");
        setDbContent(DEFAULT_CONTENT);
      }
    };
    fetchContent();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!dbContent) return <div className="min-h-screen bg-[#050505]"></div>;

  // ডেটাবেজের রিয়েল-টাইম ডেটার সাথে ডিফল্ট ডেটা মার্জ করা হচ্ছে
  const content = { ...DEFAULT_CONTENT, ...dbContent };

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
              SWAN <span className="text-primaryAccent">BD</span>
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
                <a href="/about" className="hover:text-primaryAccent transition">
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

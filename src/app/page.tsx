import LandingClient from "./LandingClient";

// --- ডেটাবেজ খালি থাকলে প্রদর্শনের জন্য ১০০% নিখুঁত ডিফল্ট বাংলা ডেটা ---
const DEFAULT_CONTENT = {
  heroTag: "🚀 ৪ সপ্তাহের সুপার গাইডেড Visa Bootcamp",
  heroTitlePart1: "শূন্য থেকে শুরু করে ইউরোপের",
  heroTitlePart2: "স্টাডি অ্যাব্রোড স্কলারশিপ!",
  heroSubtitle: "নিশ্চিত করো তোমার ভিসা এবং ইউরোপের জার্নি। ৪ সপ্তাহের সুপার গাইডেড Bootcamp, যেকোনো সমস্যায় ক্রেজি লেভেলের লাইভ Support, রিয়েল-লাইফ Mock Interview, ও প্রিমিয়াম গাইডলাইন— যার মাধ্যমে তুমি পাবে ইউরোপে নিজের স্বপ্ন পূরণের ১০০% কনফিডেন্স।",
  heroBtnText: "বুটক্যাম্পে জয়েন করো",
  coursePrice: "1500",
  impactTitle: "আমাদের স্টুডেন্টদের ইম্প্যাক্ট",
  stat1Number: "15+", stat1Text: "ইউরোপিয়ান দেশে",
  stat2Number: "100%", stat2Text: "ভিসা কনফিডেন্স",
  stat3Number: "50+", stat3Text: "সাকসেসফুল কেস",
  stat4Number: "95%", stat4Text: "স্কলারশিপ রেশিও",
  painTitle: "তোমার প্যারা",
  solutionTitle: "আমাদের সমাধান",
  pains: [
    { pain: '"কী শিখব, কোথা থেকে শুরু করব, এম্বাসিতে কী প্রশ্ন করবে কিছুই বুঝি না। এজেন্সির কাছে গিয়ে ধোঁকা খাই।"', tag: "✅ গাইডলাইন রেডি", solution: "আমরা পুরো আউটলাইন, চেকলিস্ট আর গাইডলাইন রেডি করেই তোমার সাথে আছি। ফাইল প্রোসেসিং তুমি নিজেই করবে।" },
    { pain: '"ভিসা ইন্টারভিউতে নার্ভাস লাগে, ইংলিশে কথা বলতে ভয় পাই। স্কিল ও কনফিডেন্স নেই।"', tag: "✅ লাইভ মক ইন্টারভিউ", solution: "আমাদের লাইভ মক ইন্টারভিউ ও স্পোকেন ইংলিশ প্র্যাকটিসের মাধ্যমে তোমার এম্বাসি ফেস করার ভয় পুরোপুরি কেটে যাবে।" },
    { pain: '"রেগুলারিটি বজায় রাখতে পারি না – মাঝপথেই মোটিভেশন হারিয়ে থেমে যাই।"', tag: "✅ ক্রেজি সাপোর্ট সিস্টেম", solution: "ডেডিকেটেড লাইভ সাপোর্ট, এসাইনমেন্ট ডেডলাইন ও ২৪/৭ কমিউনিটি সাপোর্টে থেমে যাওয়ার কোনো চান্স নেই।" },
  ],
  xFactorSubtitle: "Why Us?",
  xFactorTitle: "এই বুটক্যাম্পের X ফ্যাক্টর",
  xFactors: [
    { icon: "🎯", title: "১:১ মেন্টরশিপ", desc: "শুধু ভিডিও দিয়ে ছেড়ে দেওয়া নয়। প্রোফাইল অনুযায়ী গুগল মিটে বসে স্ট্রং ও উইক পয়েন্ট বের করে পার্সোনালাইজড প্ল্যান।" },
    { icon: "🎙️", title: "লাইভ সাপোর্ট সেশন", desc: "সপ্তাহে নির্দিষ্ট দিনে লাইভ সেশন। সরাসরি এম্বাসি অফিসারের মতো প্রশ্ন করা হবে এবং বডি ল্যাঙ্গুয়েজ ঠিক করা হবে।" },
    { icon: "💬", title: "২৪/৭ কমিউনিটি সাপোর্ট", desc: "দিন-রাত যেখানে তোমার যেকোনো সমস্যা থাকবে সহজেই পাবে সমাধান। ডেডিকেটেড ফেসবুক গ্রুপ ও হেল্পডেস্কে।" },
    { icon: "⚙️", title: "গাইডেড এনভায়রনমেন্ট", desc: "আমাদের সাথে শিখবে ৪টি উইকলি মডিউল, প্র্যাকটিক্যাল টাস্ক ও এসাইনমেন্টের মাধ্যমে একটি ডিসিপ্লিনড প্ল্যাটফর্মে।" },
  ],
  stepsTitlePart1: "ইউরোপ যাওয়ার",
  stepsTitlePart2: "৪টি সহজ ধাপ",
  steps: [
    { title: "ভর্তি হও", desc: "জয়েন হয়ে যাও SAWN BD Bootcamp-এ। ইউরোপের স্কলারশিপ স্টুডেন্টদের গাইডলাইনে নিজের যাত্রা শুরু করো।" },
    { title: "গাইডলাইন ও মেন্টরশীপ নাও", desc: "আমাদের ক্রেজি সাপোর্ট নিয়ে নিজের SOP, CV এবং ডকুমেন্টস রেডি করো। নোলেজ ও স্কিল নিয়ে পরের লাফ দেয়ার জন্য রেডি হয়ে যাও।" },
    { title: "লাইভ মক ইন্টারভিউ দাও", desc: "নার্ভাসনেস কাটিয়ে কনফিডেন্টলি ইংলিশে কথা বলা প্র্যাকটিস করো। এম্বাসির ভাইব আগেই ফেস করো।" },
    { title: "ভিসা ফেস করো ও টিকিট কাটো", desc: "আমাদের প্রমাণিত গাইডলাইনের মাধ্যমে তুমি পাবে ১০০% কনফিডেন্স। এম্বাসি ফেস করো এবং ইউরোপের স্টুডেন্ট লাইফ শুরু করো!" },
  ],
  curriculumTitlePart1: "তুমি কী",
  curriculumTitlePart2: "শিখবে?",
  curriculum: [
    { title: "Mindset & Reality", desc: "কেন ইউরোপ? ইউরোপের এডুকেশন সিস্টেম এবং স্টুডেন্ট লাইফের আসল রিয়েলিটি। মানসিক প্রস্তুতি ছাড়া এই জার্নি সম্ভব নয়, তাই শুরুতেই আমরা মাইন্ডসেট তৈরি করব।" },
    { title: "Document Mastery", desc: "কিভাবে প্রফেশনাল Europass CV বানাতে হয়, Motivational Letter (SOP) লেখার এ টু জেড সিক্রেট, এবং এম্বাসির জন্য নিখুঁতভাবে ফাইল গোছানোর চেকলিস্ট।" },
    { title: "University Hunting", desc: "এজেন্সির উপর ভরসা না করে নিজের প্রোফাইল অনুযায়ী সঠিক ইউনিভার্সিটি এবং ফুল-ফান্ডেড স্কলারশিপ খোঁজার টেকনিক।" },
    { title: "Embassy English", desc: 'শুধু IELTS নয়, এম্বাসিতে কথা বলার জন্য যে ধরনের স্মার্ট ও ন্যাচারাল স্পোকেন ইংলিশ দরকার, তার প্র্যাকটিস। "Look weak" করার দিন শেষ।' },
    { title: "Visa Q&A Cracker", desc: 'ভিসা অফিসাররা আসলে কী দেখে? "Why this country?" এর মতো কমন প্রশ্নগুলোর স্মার্ট উত্তর কীভাবে দিতে হয় এবং নার্ভাসনেস কাটানোর সাইকোলজিক্যাল ট্রিকস।' },
    { title: "Body Language", desc: "এম্বাসিতে ঢোকা থেকে শুরু করে বের হওয়া পর্যন্ত আই কন্ট্যাক্ট, বসার স্টাইল, এবং কনফিডেন্স শো করার অব্যর্থ উপায়।" },
  ],
  projectsTitlePart1: "বুটক্যাম্পে তুমি যেসব",
  projectsTitlePart2: "রিয়েল-লাইফ প্রজেক্ট",
  projectsTitlePart3: "করবে",
  projects: [
    { icon: "📝", title: "Project Alpha: The Perfect SOP", desc: "কপি-পেস্ট করা SOP দিয়ে ভিসা হয় না। এই প্রজেক্টের মাধ্যমে তুমি নিজের জীবনের গল্প দিয়ে একটি ১০০% ইউনিক ও প্রফেশনাল Statement of Purpose তৈরি করবে যা এম্বাসি অফিসারকে ইমপ্রেস করবে।" },
    { icon: "🎥", title: "Project Beta: Video Pitch", desc: "ইউনিভার্সিটির এডমিশন ইন্টারভিউয়ের জন্য একটি ডেমো ভিডিও রেকর্ড করে পোর্টালে সাবমিট করবে। এর মাধ্যমে তোমার স্পিকিং এর জড়তা কাটবে এবং কনফিডেন্স বিল্ড হবে।" },
    { icon: "🏛️", title: "The Final Boss: Mock Interview", desc: "এটি একটি ফুল-লেংথ লাইভ মক ইন্টারভিউ সেশন। এম্বাসির আদলে তোমাকে প্রশ্ন করা হবে। এই প্রজেক্ট সাকসেসফুলি শেষ করলে ভিসা ইন্টারভিউ তোমার কাছে মনে হবে জাস্ট একটা সাধারণ আড্ডা!" },
  ],
  testimonialsTitle: "সফলতার গল্প শোনো",
  testimonialsSubtitle: "যারা আমাদের গাইডলাইন ফলো করে নিজেদের ভয়কে জয় করেছে এবং আজ ইউরোপের বিভিন্ন ক্যাম্পাসে নিজেদের স্বপ্ন পূরণ করছে।",
  testimonials: [
    { initial: "S", name: "Sadikur Rahman", tag: "Hungary Visa Approved", review: '"I was terrified of the embassy. My English wasn\'t perfect, and I thought they would reject me instantly. The mock interviews in this bootcamp completely changed my body language. When I faced the real officer, it felt easier than the bootcamp!"' },
    { initial: "F", name: "Fahim Faysal", tag: "Germany Student Visa", review: '"এজেন্সি আমাকে বলেছিল আমার প্রোফাইলে ভিসা হবে না। SAWN BD এর গাইডলাইন ফলো করে আমি নিজে SOP লিখি এবং ইউনিভার্সিটি খুঁজি। আলহামদুলিল্লাহ, আজ আমি মিউনিখে। The 1:1 mentorship is a game changer."' },
    { initial: "N", name: "Nusrat Jahan", tag: "Austria Visa Approved", review: '"The strict deadline and assignment system kept me on track. I didn\'t know how to write an SOP before this. The platform is so professional, it felt like I was already studying in a European university."' },
    { initial: "T", name: "Tanvir Ahmed", tag: "Poland Visa Approved", review: '"Everything is so structured. Niloy vai doesn\'t just spoon-feed you; he forces you to build your own confidence. The day of my embassy interview, I answered every question with zero hesitation."' },
    { initial: "R", name: "Rakib Hasan", tag: "Sweden Scholarship", review: '"The document mastery module saved my life. I was about to submit a terrible CV. The platform\'s gamified system with Gems made learning how to process files actually fun and addictive."' },
    { initial: "M", name: "Mahmudul Hasan", tag: "Italy Visa Approved", review: '"আমি ভাবতাম visa interview মানেই কঠিন ইংলিশ। বুটক্যাম্প থেকে বুঝলাম ওরা শুধু কনফিডেন্স আর সততা দেখে। The Mock interview was exactly what I needed to break my fear."' },
  ],
  faqTitlePart1: "তোমার যত",
  faqTitlePart2: "প্রশ্ন",
  faqs: [
    { q: "আমি একদম বিগিনার, আমার কি এই কোর্স করা ঠিক হবে?", a: "হ্যাঁ! যারা একদম শূন্য থেকে শুরু করে ইউরোপে স্টাডি অ্যাব্রোড এর জার্নি শুরু করতে চায়, তাদের জন্যই এই বুটক্যাম্প। এখানে বেসিক থেকে শুরু করে এম্বাসি ফেস করা পর্যন্ত সব গাইডলাইন দেওয়া হবে।" },
    { q: "কোর্সটি কিভাবে করানো হবে?", a: "এটি একটি সুপার-গাইডেড হাইব্রিড বুটক্যাম্প। আমাদের নিজস্ব পোর্টালে রেকর্ডেড ভিডিও, চেকলিস্ট এবং এসাইনমেন্ট থাকবে। আর সপ্তাহে নির্দিষ্ট দিনে লাইভ মক ইন্টারভিউ এবং সাপোর্ট সেশন হবে।" },
    { q: "আমি কি এজেন্সির সাহায্য ছাড়াই নিজে নিজে অ্যাপ্লাই করতে পারবো?", a: "অবশ্যই। আমাদের প্রধান লক্ষ্যই হলো তোমাকে সেলফ-ডিপেন্ডেন্ট বানানো। তুমি নিজেই নিজের SOP লিখবে এবং ভার্সিটি খুঁজবে, আমরা মেন্টর হিসেবে তোমার ভুল শুধরে দিব।" },
    { q: "আমি যদি এসাইনমেন্ট মিস করি?", a: "আমাদের সিস্টেমে ডেডলাইন খুব স্ট্রিক্ট। এসাইনমেন্ট মিস করলে বা কোয়ালিটি খারাপ হলে পেনাল্টি (Gems কাটা যাবে) এবং রিসাবমিট করতে হবে। রিয়েল লাইফে এম্বাসিতে কোনো এক্সকিউজ চলে না, তাই আমাদের বুটক্যাম্পেও ডিসিপ্লিন বজায় রাখতে হবে।" },
  ],
  ctaTitle: "তাহলে আর দেরি কেন?",
  ctaSubtitle: "সঠিক গাইডলাইন ছাড়া স্টাডি অ্যাব্রোড জার্নি শুরু করা মানে নিজের স্বপ্ন নিয়ে জুয়া খেলা। তোমার কনফিডেন্স বিল্ড করার দায়িত্ব এখন আমাদের।",
  ctaBtnText: "এনরোলমেন্ট নিশ্চিত করো",
  footerDesc: "Scholarship student in Europe helping Bangladeshi students prepare confidently for study abroad, visa interviews, and English communication.",
  footerLocation: "📍 Nyíregyháza, Hungary",
  footerEmail: "support@sawnbd.com",
  footerRights: "© 2026 SAWN BD with Niloy Baruaa. All rights reserved.",
};

// ⚠️ THE VERCEL CACHE MAGIC
// This fetches data once every 300 seconds (5 minutes) and caches it on Vercel's global CDN.
async function getLandingData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/landing-content`,
      { next: { revalidate: 300 } } 
    );
    const data = await res.json();
    if (data && Object.keys(data).length > 2) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Using offline fallback data");
    return null;
  }
}

export default async function LandingPage() {
  const dbContent = await getLandingData();
  
  // Merge the database content with the default content
  const content = { ...DEFAULT_CONTENT, ...(dbContent || {}) };

  // Hand it off to the visual component
  return <LandingClient content={content} />;
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// THE OMNI-STATE: Holds EVERY single letter for ALL THREE pages
const INITIAL_FORM_STATE = {
  // ================= LANDING PAGE =================
  heroTag: '🚀 ৪ সপ্তাহের সুপার গাইডেড Visa Bootcamp',
  heroTitlePart1: 'শূন্য থেকে শুরু করে ইউরোপের',
  heroTitlePart2: 'স্টাডি অ্যাব্রোড স্কলারশিপ!',
  heroSubtitle: 'নিশ্চিত করো তোমার ভিসা এবং ইউরোপের জার্নি। ৪ সপ্তাহের সুপার গাইডেড Bootcamp, যেকোনো সমস্যায় ক্রেজি লেভেলের লাইভ Support, রিয়েল-লাইফ Mock Interview, ও প্রিমিয়াম গাইডলাইন— যার মাধ্যমে তুমি পাবে ইউরোপে নিজের স্বপ্ন পূরণের ১০০% কনফিডেন্স।',
  heroBtnText: 'বুটক্যাম্পে জয়েন করো',
  coursePrice: '1500',
  impactTitle: 'আমাদের স্টুডেন্টদের ইম্প্যাক্ট',
  stat1Number: '15+', stat1Text: 'ইউরোপিয়ান দেশে',
  stat2Number: '100%', stat2Text: 'ভিসা কনফিডেন্স',
  stat3Number: '50+', stat3Text: 'সাকসেসফুল কেস',
  stat4Number: '95%', stat4Text: 'স্কলারশিপ রেশিও',
  painTitle: 'তোমার প্যারা',
  solutionTitle: 'আমাদের সমাধান',
  pains: [
    { pain: '"কী শিখব, কোথা থেকে শুরু করব, এম্বাসিতে কী প্রশ্ন করবে কিছুই বুঝি না। এজেন্সির কাছে গিয়ে ধোঁকা খাই।"', tag: '✅ গাইডলাইন রেডি', solution: 'আমরা পুরো আউটলাইন, চেকলিস্ট আর গাইডলাইন রেডি করেই তোমার সাথে আছি। ফাইল প্রোসেসিং তুমি নিজেই করবে।' },
    { pain: '"ভিসা ইন্টারভিউতে নার্ভাস লাগে, ইংলিশে কথা বলতে ভয় পাই। স্কিল ও কনফিডেন্স নেই।"', tag: '✅ লাইভ মক ইন্টারভিউ', solution: 'আমাদের লাইভ মক ইন্টারভিউ ও স্পোকেন ইংলিশ প্র্যাকটিসের মাধ্যমে তোমার এম্বাসি ফেস করার ভয় পুরোপুরি কেটে যাবে।' },
    { pain: '"রেগুলারিটি বজায় রাখতে পারি বায় না – মাঝপথেই মোটিভেশন হারিয়ে থেমে যাই।"', tag: '✅ ক্রেজি সাপোর্ট সিস্টেম', solution: 'ডেডিকেটেড লাইভ সাপোর্ট, এসাইনমেন্ট ডেডলাইন ও ২৪/৭ কমিউনিটি সাপোর্টে থেমে যাওয়ার কোনো চান্স নেই।' }
  ],
  xFactorSubtitle: 'Why Us?',
  xFactorTitle: 'এই বুটক্যাম্পের X ফ্যাক্টর',
  xFactors: [
    { icon: '🎯', title: '১:১ মেন্টরশিপ', desc: 'শুধু ভিডিও দিয়ে ছেড়ে দেওয়া নয়। প্রোফাইল অনুযায়ী গুগল মিটে বসে স্ট্রং ও উইক পয়েন্ট বের করে পার্সোনালাইজড প্ল্যান।' },
    { icon: '🎙️', title: 'লাইভ সাপোর্ট সেশন', desc: 'সপ্তাহে নির্দিষ্ট দিনে লাইভ সেশন। সরাসরি এম্বাসি অফিসারের মতো প্রশ্ন করা হবে এবং বডি ল্যাঙ্গুয়েজ ঠিক করা হবে।' },
    { icon: '💬', title: '২৪/৭ কমিউনিটি সাপোর্ট', desc: 'দিন-রাত যেখানে তোমার যেকোনো সমস্যা থাকবে সহজেই পাবে সমাধান। ডেডিকেটেড ফেসবুক গ্রুপ ও হেল্পডেস্কে।' },
    { icon: '⚙️', title: 'গাইডেড এনভায়রনমেন্ট', desc: 'আমাদের সাথে শিখবে ৪টি উইকলি মডিউল, প্র্যাকটিক্যাল টাস্ক ও এসাইনমেন্টের মাধ্যমে একটি ডিসিপ্লিনড প্ল্যাটফর্মে।' }
  ],
  stepsTitlePart1: 'ইউরোপ যাওয়ার',
  stepsTitlePart2: '৪টি সহজ ধাপ',
  steps: [
    { title: 'ভর্তি হও', desc: 'জয়েন হয়ে যাও SAWN BD Bootcamp-এ। ইউরোপের স্কলারশিপ স্টুডেন্টদের গাইডলাইনে নিজের যাত্রা শুরু করো।' },
    { title: 'গাইডলাইন ও মেন্টরশীপ নাও', desc: 'আমাদের ক্রেজি সাপোর্ট নিয়ে নিজের SOP, CV এবং ডকুমেন্টস রেডি করো। নোলেজ ও স্কিল নিয়ে পরের লাফ দেয়ার জন্য রেডি হয়ে যাও।' },
    { title: 'লাইভ মক ইন্টারভিউ দাও', desc: 'নার্ভাসনেস কাটিয়ে কনফিডেন্টলি ইংলিশে কথা বলা প্র্যাকটিস করো। এম্বাসির ভাইব আগেই ফেস করো।' },
    { title: 'ভিসা ফেস করো ও টিকিট কাটো', desc: 'আমাদের প্রমাণিত গাইডলাইনের মাধ্যমে তুমি পাবে ১০০% কনফিডেন্স। এম্বাসি ফেস করো এবং ইউরোপের স্টুডেন্ট লাইফ শুরু করো!' }
  ],
  curriculumTitlePart1: 'তুমি কী',
  curriculumTitlePart2: 'শিখবে?',
  curriculum: [
    { title: 'Mindset & Reality', desc: 'কেন ইউরোপ? ইউরোপের এডুকেশন সিস্টেম এবং স্টুডেন্ট লাইফের আসল রিয়েলিটি। মানসিক প্রস্তুতি ছাড়া এই জার্নি সম্ভব নয়, তাই শুরুতেই আমরা মাইন্ডসেট তৈরি করব।' },
    { title: 'Document Mastery', desc: 'কিভাবে প্রফেশনাল Europass CV বানাতে হয়, Motivational Letter (SOP) লেখার এ টু জেড সিক্রেট, এবং এম্বাসির জন্য নিখুঁতভাবে ফাইল গোছানোর চেকলিস্ট।' },
    { title: 'University Hunting', desc: 'এজেন্সির উপর ভরসা না করে নিজের প্রোফাইল অনুযায়ী সঠিক ইউনিভার্সিটি এবং ফুল-ফান্ডেড স্কলারশিপ খোঁজার টেকনিক।' },
    { title: 'Embassy English', desc: 'শুধু IELTS নয়, এম্বাসিতে কথা বলার জন্য যে ধরনের স্মার্ট ও ন্যাচারাল স্পোকেন ইংলিশ দরকার, তার প্র্যাকটিস। "Look weak" করার দিন শেষ।' },
    { title: 'Visa Q&A Cracker', desc: 'ভিসা অফিসাররা আসলে কী দেখে? "Why this country?" এর মতো কমন প্রশ্নগুলোর স্মার্ট উত্তর কীভাবে দিতে হয় এবং নার্ভাসনেস কাটানোর সাইকোলজিক্যাল ট্রিকস।' },
    { title: 'Body Language', desc: 'এম্বাসিতে ঢোকা থেকে শুরু করে বের হওয়া পর্যন্ত আই কন্ট্যাক্ট, বসার স্টাইল, এবং কনফিডেন্স শো করার অব্যর্থ উপায়।' }
  ],
  projectsTitlePart1: 'বুটক্যাম্পে তুমি যেসব',
  projectsTitlePart2: 'রিয়েল-লাইফ প্রজেক্ট',
  projectsTitlePart3: 'করবে',
  projects: [
    { icon: '📝', title: 'Project Alpha: The Perfect SOP', desc: 'কপি-পেস্ট করা SOP দিয়ে ভিসা হয় না। এই প্রজেক্টের মাধ্যমে তুমি নিজের জীবনের গল্প দিয়ে একটি ১০০% ইউনিক ও প্রফেশনাল Statement of Purpose তৈরি করবে যা এম্বাসি অফিসারকে ইমপ্রেস করবে।' },
    { icon: '🎥', title: 'Project Beta: Video Pitch', desc: 'ইউনিভার্সিটির এডমিশন ইন্টারভিউয়ের জন্য একটি ডেমো ভিডিও রেকর্ড করে পোর্টালে সাবমিট করবে। এর মাধ্যমে তোমার স্পিকিং এর জড়তা কাটবে এবং কনফিডেন্স বিল্ড হবে।' },
    { icon: '🏛️', title: 'The Final Boss: Mock Interview', desc: 'এটি একটি ফুল-লেংথ লাইভ মক ইন্টারভিউ সেশন। এম্বাসির আদলে তোমাকে প্রশ্ন করা হবে। এই প্রজেক্ট সাকসেসফুলি শেষ করলে ভিসা ইন্টারভিউ তোমার কাছে মনে হবে জাস্ট একটা সাধারণ আড্ডা!' }
  ],
  testimonialsTitle: 'সফলতার গল্প শোনো',
  testimonialsSubtitle: 'যারা আমাদের গাইডলাইন ফলো করে নিজেদের ভয়কে জয় করেছে এবং আজ ইউরোপের বিভিন্ন ক্যাম্পাসে নিজেদের স্বপ্ন পূরণ করছে।',
  testimonials: [
    { initial: 'S', name: 'Sadikur Rahman', tag: 'Hungary Visa Approved', review: '"I was terrified of the embassy. My English wasn\'t perfect, and I thought they would reject me instantly. The mock interviews in this bootcamp completely changed my body language. When I faced the real officer, it felt easier than the bootcamp!"' },
    { initial: 'F', name: 'Fahim Faysal', tag: 'Germany Student Visa', review: '"এজেন্সি আমাকে বলেছিল আমার প্রোফাইলে ভিসা হবে fix হবে না। SAWN BD এর গাইডলাইন ফলো করে আমি নিজে SOP লিখি এবং ইউনিভার্সিটি খুঁজি। আলহামদুলিল্লাহ, আজ আমি মিউনিখে। The 1:1 mentorship is a game changer."' },
    { initial: 'N', name: 'Nusrat Jahan', tag: 'Austria Visa Approved', review: '"The strict deadline and assignment system kept me on track. I didn\'t know how to write an SOP before this. The platform is so professional, it felt like I was already studying in a European university."' },
    { initial: 'T', name: 'Tanvir Ahmed', tag: 'Poland Visa Approved', review: '"Everything is so structured. Niloy vai doesn\'t just spoon-feed you; he forces you to build your own confidence. The day of my embassy interview, I answered every question with zero hesitation."' },
    { initial: 'R', name: 'Rakib Hasan', tag: 'Sweden Scholarship', review: '"The document mastery module saved my life. I was about to submit a terrible CV. The platform\'s gamified system with Gems made learning how to process files actually fun and addictive."' },
    { initial: 'M', name: 'Mahmudul Hasan', tag: 'Italy Visa Approved', review: '"আমি ভাবতাম visa interview মানেই কঠিন ইংলিশ। বুটক্যাম্প থেকে বুঝলাম ওরা শুধু কনফিডেন্স আর সততা দেখে। The Mock interview was exactly what I needed to break my fear."' }
  ],
  faqTitlePart1: 'তোমার যত',
  faqTitlePart2: 'প্রশ্ন',
  faqs: [
    { q: 'আমি একদম বিগিনার, আমার কি এই কোর্স করা ঠিক হবে?', a: 'হ্যাঁ! যারা একদম শূন্য থেকে শুরু করে ইউরোপে স্টাডি অ্যাব্রোড এর জার্নি শুরু করতে চায়, তাদের জন্যই এই বুটক্যাম্প। এখানে বেসিক থেকে শুরু করে এম্বাসি ফেস করা পর্যন্ত সব গাইডলাইন দেওয়া হবে।' },
    { q: "কোর্সটি কিভাবে করানো হবে?", a: "এটি একটি সুপার-গাইডেড হাইব্রিড বুটক্যাম্প। আমাদের নিজস্ব পোর্টালে রেকর্ডেড ভিডিও, চেকলিস্ট এবং এসাইনমেন্ট থাকবে। আর সপ্তাহে নির্দিষ্ট দিনে লাইভ মক ইন্টারভিউ এবং সাপোর্ট সেশন হবে।" },
    { q: "আমি কি এজেন্সির সাহায্য ছাড়াই নিজে নিজে অ্যাপ্লাই করতে পারবো?", a: "অবশ্যই। আমাদের প্রধান লক্ষ্যই হলো তোমাকে সেলফ-ডিপেন্ডেন্ট বানানো। তুমি নিজেই নিজের SOP লিখবে এবং ভার্সিটি খুঁজবে, আমরা মেন্টর হিসেবে তোমার ভুল শুধরে দিব।" },
    { q: "আমি যদি এসাইনমেন্ট মিস করি?", a: "আমাদের সিস্টেমে ডেডলাইন খুব স্ট্রিক্ট। এসাইনমেন্ট মিস করলে বা কোয়ালিটি খারাপ হলে পেনাল্টি (Gems কাটা যাবে) এবং রিসাবমিট করতে হবে। রিয়েল লাইফে এম্বাসিতে কোনো এক্সকিউজ চলে না, তাই আমাদের বুটক্যাম্পেও ডিসিপ্লিন বজায় রাখতে হবে।" }
  ],
  ctaTitle: 'তাহলে আর দেরি কেন?',
  ctaSubtitle: 'সঠিক গাইডলাইন ছাড়া স্টাডি অ্যাব্রোড জার্নি শুরু করা মানে নিজের স্বপ্ন নিয়ে জুয়া খেলা। তোমার কনফিডেন্স বিল্ড করার দায়িত্ব এখন আমাদের।',
  ctaBtnText: 'এনরোলমেন্ট নিশ্চিত করো',
  footerDesc: 'Scholarship student in Europe helping Bangladeshi students prepare confidently for study abroad, visa interviews, and English communication.',
  footerLocation: '📍 Nyíregyháza, Hungary',
  footerEmail: 'support@sawnbd.com',
  footerRights: '© 2026 SAWN BD with Niloy Baruaa. All rights reserved.',

  // ================= COURSE DETAILS PAGE =================
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
    }
  ],
  cdCtaTitle: "জার্নি শুরু করতে প্রস্তুত?",
  cdCtaDesc: "সিলেবাস তো দেখলে, এবার প্র্যাকটিক্যালি কাজ শুরু করার পালা। আজই জয়েন করো এবং নিজের প্রোফাইল রেডি করা শুরু করো।",
  cdCtaBtn: "এনরোলমেন্ট নিশ্চিত করো",

  // ================= STUDENT FEEDBACK PAGE =================
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
    { name: "Fahim Faysal", country: "Germany", university: "Technical University of Munich", feedback: "এজেন্সি আমাকে বলেছিল আমার প্রোফাইলে ভিসা হবে না। SAWN BD এর গাইডলাইন ফলো করে আমি নিজে SOP লিখি এবং ইউনিভার্সিটি খুঁজি। আলহামদুলিল্লাহ, আজ আমি মিউনিখে। The strict deadline and assignment system kept me on track. I didn't know how to write an SOP before this. The platform is so professional." }
  ],
  sfVideoTitle: "Details Interview Students",
  sfVideos: [
    { title: "একটাই লক্ষ্য ছিল ইউরোপে মাস্টার্স করতে হবে", views: "7.2K views", time: "2 months ago" },
    { title: "এজেন্সি ছাড়া নিজে ফাইল প্রসেস করার জার্নি", views: "12.9K views", time: "3 months ago" }
  ],
  sfCtaTitle: "তাহলে আর দেরি কেন?",
  sfCtaSubtitle: "শেখো প্রসেসিং, বদলে ফেলো ফিউচার",
  sfCtaDesc: "প্রযুক্তির এই যুগে সঠিক গাইডলাইন জানা মানে শুধু একটা স্কিল নয়, এটি একটা স্ট্রং ক্যারিয়ার গড়ার চাবিকাঠি। তোমার জন্য SAWN BD এমন একটা বুটক্যাম্প নিয়ে এসেছে, যেখানে তুমি শিখবে শুন্য থেকে প্রোফেশনাল লেভেল পর্যন্ত। এবং সেই শেখাটা দিয়ে তোমার স্টাডি অ্যাব্রোড নিশ্চিত করার দায়িত্ব তোমার নিজের হাতেই তুলে দিবো আমরা।",
  sfCtaBtn: "Enroll Now (৳1500)",
  sfFooterAddress: "📍 Level-4, Awal Centre, Banani, Dhaka",
  sfFooterPhone: "01700-000000"
};

export default function OmniCMS() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  
  const [activePage, setActivePage] = useState('landing');
  const [activeTab, setActiveTab] = useState('hero');
  const [form, setForm] = useState<any>(INITIAL_FORM_STATE);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/landing-content`);
        const data = await res.json();
        if (data && Object.keys(data).length > 2) { 
            setForm((prev: any) => ({ ...prev, ...data }));
        }
        setLoading(false);
      } catch (e) { 
        console.error(e); 
        setLoading(false); 
      }
    };
    fetchContent();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Publishing to Live Website...');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/landing-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` },
        body: JSON.stringify(form)
      });
      setStatus('✅ Website Successfully Updated!');
      setTimeout(() => setStatus(''), 4000);
    } catch (e) { setStatus('❌ Error updating website'); }
  };

  const handleArrayChange = (arrayName: string, index: number, field: string, value: string) => {
    const newArray = [...form[arrayName]];
    newArray[index][field] = value;
    setForm({ ...form, [arrayName]: newArray });
  };
  const addArrayItem = (arrayName: string, emptyObject: any) => setForm({ ...form, [arrayName]: [...form[arrayName], emptyObject] });
  const removeArrayItem = (arrayName: string, index: number) => setForm({ ...form, [arrayName]: form[arrayName].filter((_: any, i: number) => i !== index) });

  const handleCdTopicChange = (modIndex: number, topicIndex: number, value: string) => {
    const newCurr = [...form.cdCurriculum];
    newCurr[modIndex].topics[topicIndex] = value;
    setForm({ ...form, cdCurriculum: newCurr });
  };
  const addCdTopic = (modIndex: number) => {
    const newCurr = [...form.cdCurriculum];
    newCurr[modIndex].topics.push('');
    setForm({ ...form, cdCurriculum: newCurr });
  };
  const removeCdTopic = (modIndex: number, topicIndex: number) => {
    const newCurr = [...form.cdCurriculum];
    newCurr[modIndex].topics.splice(topicIndex, 1);
    setForm({ ...form, cdCurriculum: newCurr });
  };

  const handlePageSwitch = (pageName: string, defaultTab: string) => {
    setActivePage(pageName);
    setActiveTab(defaultTab);
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-successGreen">Omni-CMS Editor</h1>
            <p className="text-gray-400">Total control over every letter on all pages.</p>
          </div>
          <button onClick={() => router.push('/admin/system')} className="bg-gray-800 hover:bg-warningRed px-4 py-2 rounded font-bold transition">Exit Editor</button>
        </header>

        {status && <div className="mb-6 p-4 bg-successGreen/20 text-successGreen font-bold rounded border border-successGreen text-center sticky top-4 z-50 shadow-2xl backdrop-blur-md">{status}</div>}

        <div className="flex gap-4 mb-4">
          <button onClick={() => handlePageSwitch('landing', 'hero')} className={`px-6 py-3 rounded-t-xl font-black transition ${activePage === 'landing' ? 'bg-primaryAccent text-white' : 'bg-darkBg text-gray-400 hover:bg-gray-800'}`}>1. Landing Page</button>
          <button onClick={() => handlePageSwitch('courseDetails', 'cd_hero')} className={`px-6 py-3 rounded-t-xl font-black transition ${activePage === 'courseDetails' ? 'bg-neonBlue text-white' : 'bg-darkBg text-gray-400 hover:bg-gray-800'}`}>2. Course Details</button>
          <button onClick={() => handlePageSwitch('feedback', 'sf_hero')} className={`px-6 py-3 rounded-t-xl font-black transition ${activePage === 'feedback' ? 'bg-successGreen text-black' : 'bg-darkBg text-gray-400 hover:bg-gray-800'}`}>3. Student Feedback</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 bg-cardBg p-3 rounded-b-xl rounded-tr-xl border border-gray-800 shadow-lg">
          {activePage === 'landing' && [
            { id: 'hero', label: 'Hero & Price' }, { id: 'stats', label: 'Stats' }, { id: 'pains', label: 'Pains' }, { id: 'xfactors', label: 'X-Factors' }, { id: 'steps', label: 'Steps' }, { id: 'curriculum', label: 'Curriculum' }, { id: 'projects', label: 'Projects' }, { id: 'testimonials', label: 'Testimonials' }, { id: 'faqs', label: 'FAQs' }, { id: 'cta_footer', label: 'CTA & Footer' }
          ].map((tab: { id: string, label: string }) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'hover:bg-darkBg text-gray-400'}`}>{tab.label}</button>)}

          {activePage === 'courseDetails' && [
            { id: 'cd_hero', label: 'Hero & CTA' }, { id: 'cd_curriculum', label: 'Full Curriculum Modules' }
          ].map((tab: { id: string, label: string }) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'hover:bg-darkBg text-gray-400'}`}>{tab.label}</button>)}

          {activePage === 'feedback' && [
            { id: 'sf_hero', label: 'Hero & Stats' }, { id: 'sf_placements', label: 'University Placements' }, { id: 'sf_testimonials', label: 'Full Reviews' }, { id: 'sf_videos', label: 'Video Links' }, { id: 'sf_cta', label: 'CTA & Footer Info' }
          ].map((tab: { id: string, label: string }) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'hover:bg-darkBg text-gray-400'}`}>{tab.label}</button>)}
        </div>

        <form onSubmit={handleUpdate} className="bg-cardBg p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl mb-10">
          
          {/* ======================= LANDING PAGE EDITORS ======================= */}
          {activeTab === 'hero' && (
            <div className="space-y-4 animate-fade-in">
              <input type="text" value={form.heroTag} onChange={e => setForm({...form, heroTag: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={form.heroTitlePart1} onChange={e => setForm({...form, heroTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                <input type="text" value={form.heroTitlePart2} onChange={e => setForm({...form, heroTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
              </div>
              <textarea rows={3} value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={form.heroBtnText} onChange={e => setForm({...form, heroBtnText: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                <input type="text" value={form.coursePrice} onChange={e => setForm({...form, coursePrice: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4 animate-fade-in">
              <input type="text" value={form.impactTitle} onChange={e => setForm({...form, impactTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold mb-4" />
              {[1, 2, 3, 4].map((num: number) => (
                <div key={num} className="grid grid-cols-2 gap-4 bg-darkBg p-4 rounded border border-gray-800">
                  <input type="text" value={form[`stat${num}Number`]} onChange={e => setForm({...form, [`stat${num}Number`]: e.target.value})} className="bg-cardBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
                  <input type="text" value={form[`stat${num}Text`]} onChange={e => setForm({...form, [`stat${num}Text`]: e.target.value})} className="bg-cardBg border border-gray-700 p-3 rounded text-white" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pains' && (
             <div className="space-y-4 animate-fade-in">
               <div className="grid md:grid-cols-2 gap-4">
                 <input type="text" value={form.painTitle} onChange={e => setForm({...form, painTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                 <input type="text" value={form.solutionTitle} onChange={e => setForm({...form, solutionTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
               </div>
               {form.pains.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('pains', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <textarea rows={2} value={item.pain} onChange={e => handleArrayChange('pains', idx, 'pain', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                   <input type="text" value={item.tag} onChange={e => handleArrayChange('pains', idx, 'tag', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm font-bold text-successGreen" />
                   <textarea rows={2} value={item.solution} onChange={e => handleArrayChange('pains', idx, 'solution', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('pains', {pain: '', tag: '', solution: ''})} className="text-primaryAccent font-bold">+ Add Pain Point</button>
             </div>
          )}

          {activeTab === 'xfactors' && (
             <div className="space-y-4 animate-fade-in">
               <input type="text" value={form.xFactorSubtitle} onChange={e => setForm({...form, xFactorSubtitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white mb-2" />
               <input type="text" value={form.xFactorTitle} onChange={e => setForm({...form, xFactorTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl mb-4" />
               {form.xFactors.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('xFactors', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <div className="flex gap-4">
                     <input type="text" value={item.icon} onChange={e => handleArrayChange('xFactors', idx, 'icon', e.target.value)} className="w-20 bg-cardBg border border-gray-700 p-3 rounded text-white text-center text-2xl" />
                     <input type="text" value={item.title} onChange={e => handleArrayChange('xFactors', idx, 'title', e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                   </div>
                   <textarea rows={2} value={item.desc} onChange={e => handleArrayChange('xFactors', idx, 'desc', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('xFactors', {icon: '🌟', title: '', desc: ''})} className="text-primaryAccent font-bold">+ Add X-Factor</button>
             </div>
          )}

          {activeTab === 'steps' && (
             <div className="space-y-4 animate-fade-in">
               <div className="grid md:grid-cols-2 gap-4 mb-4">
                 <input type="text" value={form.stepsTitlePart1} onChange={e => setForm({...form, stepsTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                 <input type="text" value={form.stepsTitlePart2} onChange={e => setForm({...form, stepsTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-neonBlue" />
               </div>
               {form.steps.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('steps', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <input type="text" value={item.title} onChange={e => handleArrayChange('steps', idx, 'title', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                   <textarea rows={2} value={item.desc} onChange={e => handleArrayChange('steps', idx, 'desc', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('steps', {title: '', desc: ''})} className="text-primaryAccent font-bold">+ Add Step</button>
             </div>
          )}

          {activeTab === 'curriculum' && (
             <div className="space-y-4 animate-fade-in">
               <div className="grid md:grid-cols-2 gap-4 mb-4">
                 <input type="text" value={form.curriculumTitlePart1} onChange={e => setForm({...form, curriculumTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                 <input type="text" value={form.curriculumTitlePart2} onChange={e => setForm({...form, curriculumTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-primaryAccent" />
               </div>
               {form.curriculum.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('curriculum', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <input type="text" value={item.title} onChange={e => handleArrayChange('curriculum', idx, 'title', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                   <textarea rows={2} value={item.desc} onChange={e => handleArrayChange('curriculum', idx, 'desc', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('curriculum', {title: '', desc: ''})} className="text-primaryAccent font-bold">+ Add Module</button>
             </div>
          )}

          {activeTab === 'projects' && (
             <div className="space-y-4 animate-fade-in">
               <div className="grid md:grid-cols-3 gap-4 mb-4">
                 <input type="text" value={form.projectsTitlePart1} onChange={e => setForm({...form, projectsTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                 <input type="text" value={form.projectsTitlePart2} onChange={e => setForm({...form, projectsTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-successGreen" />
                 <input type="text" value={form.projectsTitlePart3} onChange={e => setForm({...form, projectsTitlePart3: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
               </div>
               {form.projects.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('projects', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <div className="flex gap-4">
                     <input type="text" value={item.icon} onChange={e => handleArrayChange('projects', idx, 'icon', e.target.value)} className="w-20 bg-cardBg border border-gray-700 p-3 rounded text-white text-center text-2xl" />
                     <input type="text" value={item.title} onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                   </div>
                   <textarea rows={2} value={item.desc} onChange={e => handleArrayChange('projects', idx, 'desc', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('projects', {icon: '💻', title: '', desc: ''})} className="text-primaryAccent font-bold">+ Add Project</button>
             </div>
          )}

          {activeTab === 'testimonials' && (
             <div className="space-y-4 animate-fade-in">
               <input type="text" value={form.testimonialsTitle} onChange={e => setForm({...form, testimonialsTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
               <textarea rows={2} value={form.testimonialsSubtitle} onChange={e => setForm({...form, testimonialsSubtitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white mb-4"></textarea>
               {form.testimonials.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('testimonials', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <div className="flex gap-4">
                    <input type="text" value={item.initial} onChange={e => handleArrayChange('testimonials', idx, 'initial', e.target.value)} className="w-16 bg-cardBg border border-gray-700 p-3 rounded text-white text-center font-bold text-xl" />
                    <input type="text" value={item.name} onChange={e => handleArrayChange('testimonials', idx, 'name', e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                    <input type="text" value={item.tag} onChange={e => handleArrayChange('testimonials', idx, 'tag', e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-3 rounded text-white text-sm" />
                   </div>
                   <textarea rows={3} value={item.review} onChange={e => handleArrayChange('testimonials', idx, 'review', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm italic" />
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('testimonials', {initial: 'A', name: '', tag: '', review: ''})} className="text-primaryAccent font-bold">+ Add Testimonial</button>
             </div>
          )}

          {activeTab === 'faqs' && (
             <div className="space-y-4 animate-fade-in">
               <div className="grid md:grid-cols-2 gap-4 mb-4">
                 <input type="text" value={form.faqTitlePart1} onChange={e => setForm({...form, faqTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
                 <input type="text" value={form.faqTitlePart2} onChange={e => setForm({...form, faqTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl text-neonBlue" />
               </div>
               {form.faqs.map((item: any, idx: number) => (
                 <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 space-y-3 relative">
                   <button type="button" onClick={() => removeArrayItem('faqs', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                   <input type="text" value={item.q} onChange={e => handleArrayChange('faqs', idx, 'q', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white font-bold" />
                   <textarea rows={3} value={item.a} onChange={e => handleArrayChange('faqs', idx, 'a', e.target.value)} className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm"></textarea>
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('faqs', {q: '', a: ''})} className="text-primaryAccent font-bold">+ Add FAQ</button>
             </div>
          )}

          {activeTab === 'cta_footer' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Call To Action (CTA)</h2>
                <div className="space-y-4">
                  <input type="text" value={form.ctaTitle} onChange={e => setForm({...form, ctaTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
                  <textarea rows={2} value={form.ctaSubtitle} onChange={e => setForm({...form, ctaSubtitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
                  <input type="text" value={form.ctaBtnText} onChange={e => setForm({...form, ctaBtnText: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Footer Details</h2>
                <div className="space-y-4">
                  <textarea rows={2} value={form.footerDesc} onChange={e => setForm({...form, footerDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" value={form.footerLocation} onChange={e => setForm({...form, footerLocation: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                    <input type="text" value={form.footerEmail} onChange={e => setForm({...form, footerEmail: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                  </div>
                  <input type="text" value={form.footerRights} onChange={e => setForm({...form, footerRights: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                </div>
              </div>
            </div>
          )}

          {/* ======================= COURSE DETAILS PAGE EDITORS ======================= */}
          {activeTab === 'cd_hero' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold text-neonBlue border-b border-gray-800 pb-2">Course Details Hero & CTA</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={form.cdHeroTitlePart1} onChange={e => setForm({...form, cdHeroTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
                <input type="text" value={form.cdHeroTitlePart2} onChange={e => setForm({...form, cdHeroTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl text-primaryAccent" />
              </div>
              <textarea rows={3} value={form.cdHeroDesc} onChange={e => setForm({...form, cdHeroDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
              
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-300 mb-2">Bottom CTA Section</h3>
                <input type="text" value={form.cdCtaTitle} onChange={e => setForm({...form, cdCtaTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold mb-3" />
                <textarea rows={2} value={form.cdCtaDesc} onChange={e => setForm({...form, cdCtaDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white mb-3"></textarea>
                <input type="text" value={form.cdCtaBtn} onChange={e => setForm({...form, cdCtaBtn: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
              </div>
            </div>
          )}

          {activeTab === 'cd_curriculum' && (
             <div className="space-y-6 animate-fade-in">
               <h2 className="text-xl font-bold text-neonBlue border-b border-gray-800 pb-2">Full Curriculum Modules</h2>
               {form.cdCurriculum.map((mod: any, modIdx: number) => (
                 <div key={modIdx} className="bg-darkBg p-6 rounded-xl border border-gray-700 space-y-4 relative shadow-lg">
                   <button type="button" onClick={() => removeArrayItem('cdCurriculum', modIdx)} className="absolute top-4 right-4 text-warningRed font-bold bg-gray-800 px-3 py-1 rounded">Delete Module</button>
                   
                   <input type="text" value={mod.module} onChange={e => handleArrayChange('cdCurriculum', modIdx, 'module', e.target.value)} className="w-full md:w-3/4 bg-cardBg border border-gray-600 p-3 rounded text-white font-bold text-lg" placeholder="Module Title (e.g. Module 01: Mindset)" />
                   <textarea rows={2} value={mod.description} onChange={e => handleArrayChange('cdCurriculum', modIdx, 'description', e.target.value)} className="w-full bg-cardBg border border-gray-600 p-3 rounded text-white text-sm" placeholder="Module Description"></textarea>
                   
                   <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
                     <p className="text-primaryAccent font-bold text-sm mb-3">Topics in this Module:</p>
                     {mod.topics.map((topic: string, topIdx: number) => (
                       <div key={topIdx} className="flex gap-2 mb-2">
                         <input type="text" value={topic} onChange={e => handleCdTopicChange(modIdx, topIdx, e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-2 rounded text-white text-sm" />
                         <button type="button" onClick={() => removeCdTopic(modIdx, topIdx)} className="text-warningRed px-2 hover:bg-gray-800 rounded">✕</button>
                       </div>
                     ))}
                     <button type="button" onClick={() => addCdTopic(modIdx)} className="text-successGreen text-xs font-bold mt-2">+ Add Topic</button>
                   </div>
                 </div>
               ))}
               <button type="button" onClick={() => addArrayItem('cdCurriculum', {module: 'New Module', description: '', topics: ['']})} className="w-full border-2 border-dashed border-gray-700 text-gray-400 font-bold py-4 rounded-xl hover:border-primaryAccent hover:text-white transition">+ Add New Curriculum Module</button>
             </div>
          )}

          {/* ======================= STUDENT FEEDBACK PAGE EDITORS ======================= */}
          {activeTab === 'sf_hero' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2">Feedback Hero & Stats</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={form.sfHeroTitlePart1} onChange={e => setForm({...form, sfHeroTitlePart1: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
                <input type="text" value={form.sfHeroTitlePart2} onChange={e => setForm({...form, sfHeroTitlePart2: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl text-primaryAccent" />
              </div>
              <textarea rows={3} value={form.sfHeroDesc} onChange={e => setForm({...form, sfHeroDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white"></textarea>
              
              <div className="mt-8 border-t border-gray-800 pt-6">
                <h3 className="text-lg font-bold text-gray-300 mb-4">Top 4 Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num: number) => (
                    <div key={num} className="bg-darkBg p-4 rounded border border-gray-800">
                      <input type="text" value={form[`sfStat${num}Num`]} onChange={e => setForm({...form, [`sfStat${num}Num`]: e.target.value})} className="w-full bg-cardBg border border-gray-700 p-2 rounded text-white font-bold text-lg mb-2" />
                      <input type="text" value={form[`sfStat${num}Label`]} onChange={e => setForm({...form, [`sfStat${num}Label`]: e.target.value})} className="w-full bg-cardBg border border-gray-700 p-2 rounded text-gray-400 text-sm uppercase" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sf_placements' && (
             <div className="space-y-4 animate-fade-in">
               <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2">University Placements</h2>
               <input type="text" value={form.sfPlacementTitle} onChange={e => setForm({...form, sfPlacementTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl mb-2" />
               <textarea rows={2} value={form.sfPlacementDesc} onChange={e => setForm({...form, sfPlacementDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white mb-6"></textarea>
               
               <div className="grid md:grid-cols-2 gap-4">
                 {form.sfPlacements.map((item: any, idx: number) => (
                   <div key={idx} className="flex gap-2 relative bg-darkBg p-4 rounded border border-gray-800">
                     <button type="button" onClick={() => removeArrayItem('sfPlacements', idx)} className="absolute -top-2 -right-2 bg-warningRed text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">✕</button>
                     <input type="text" value={item.country} onChange={e => handleArrayChange('sfPlacements', idx, 'country', e.target.value)} className="flex-1 bg-cardBg border border-gray-700 p-2 rounded text-white font-bold" />
                     <input type="text" value={item.percent} onChange={e => handleArrayChange('sfPlacements', idx, 'percent', e.target.value)} className="w-24 bg-cardBg border border-gray-700 p-2 rounded text-primaryAccent font-bold text-center" />
                   </div>
                 ))}
               </div>
               <button type="button" onClick={() => addArrayItem('sfPlacements', {country: 'New Country', percent: '0%'})} className="text-successGreen font-bold">+ Add Placement Country</button>
             </div>
          )}

          {activeTab === 'sf_testimonials' && (
             <div className="space-y-4 animate-fade-in">
               <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2">Full Student Reviews</h2>
               <input type="text" value={form.sfTestimonialTitle} onChange={e => setForm({...form, sfTestimonialTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl" />
               <textarea rows={2} value={form.sfTestimonialDesc} onChange={e => setForm({...form, sfTestimonialDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white mb-6"></textarea>
               
               <div className="space-y-4">
                 {form.sfTestimonials.map((item: any, idx: number) => (
                   <div key={idx} className="bg-darkBg p-6 rounded-xl border border-gray-800 relative">
                     <button type="button" onClick={() => removeArrayItem('sfTestimonials', idx)} className="absolute top-4 right-4 text-warningRed font-bold bg-gray-800 px-3 py-1 rounded">Delete</button>
                     <div className="grid md:grid-cols-3 gap-4 mb-4 mt-6 md:mt-0 pr-0 md:pr-20">
                       <input type="text" value={item.name} onChange={e => handleArrayChange('sfTestimonials', idx, 'name', e.target.value)} placeholder="Student Name" className="bg-cardBg border border-gray-700 p-2 rounded text-white font-bold" />
                       <input type="text" value={item.country} onChange={e => handleArrayChange('sfTestimonials', idx, 'country', e.target.value)} placeholder="Target Country" className="bg-cardBg border border-gray-700 p-2 rounded text-white text-sm" />
                       <input type="text" value={item.university} onChange={e => handleArrayChange('sfTestimonials', idx, 'university', e.target.value)} placeholder="University Name" className="bg-cardBg border border-gray-700 p-2 rounded text-neonBlue text-sm" />
                     </div>
                     <textarea rows={4} value={item.feedback} onChange={e => handleArrayChange('sfTestimonials', idx, 'feedback', e.target.value)} placeholder="Full Review Text" className="w-full bg-cardBg border border-gray-700 p-3 rounded text-white text-sm italic leading-relaxed" />
                   </div>
                 ))}
               </div>
               <button type="button" onClick={() => addArrayItem('sfTestimonials', {name: '', country: '', university: '', feedback: ''})} className="text-successGreen font-bold">+ Add Full Testimonial</button>
             </div>
          )}

          {activeTab === 'sf_videos' && (
             <div className="space-y-4 animate-fade-in">
               <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2">Video Interviews</h2>
               <input type="text" value={form.sfVideoTitle} onChange={e => setForm({...form, sfVideoTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-xl mb-6" />
               
               <div className="grid md:grid-cols-2 gap-4">
                 {form.sfVideos.map((item: any, idx: number) => (
                   <div key={idx} className="bg-darkBg p-4 rounded-xl border border-gray-800 relative space-y-3">
                     <button type="button" onClick={() => removeArrayItem('sfVideos', idx)} className="absolute top-2 right-2 text-warningRed font-bold">✕</button>
                     <input type="text" value={item.title} onChange={e => handleArrayChange('sfVideos', idx, 'title', e.target.value)} placeholder="Video Title" className="w-full bg-cardBg border border-gray-700 p-2 rounded text-white font-bold mt-4 md:mt-0" />
                     <div className="grid grid-cols-2 gap-2">
                       <input type="text" value={item.views} onChange={e => handleArrayChange('sfVideos', idx, 'views', e.target.value)} placeholder="Views (e.g. 7.2K views)" className="w-full bg-cardBg border border-gray-700 p-2 rounded text-gray-400 text-xs" />
                       <input type="text" value={item.time} onChange={e => handleArrayChange('sfVideos', idx, 'time', e.target.value)} placeholder="Time (e.g. 2 months ago)" className="w-full bg-cardBg border border-gray-700 p-2 rounded text-gray-400 text-xs" />
                     </div>
                   </div>
                 ))}
               </div>
               <button type="button" onClick={() => addArrayItem('sfVideos', {title: '', views: '', time: ''})} className="text-successGreen font-bold">+ Add Video Card</button>
             </div>
          )}

          {activeTab === 'sf_cta' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2 mb-4">Feedback CTA Section</h2>
                <div className="space-y-4">
                  <input type="text" value={form.sfCtaTitle} onChange={e => setForm({...form, sfCtaTitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-2xl" />
                  <input type="text" value={form.sfCtaSubtitle} onChange={e => setForm({...form, sfCtaSubtitle: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-neonBlue font-bold text-xl" />
                  <textarea rows={4} value={form.sfCtaDesc} onChange={e => setForm({...form, sfCtaDesc: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white leading-relaxed"></textarea>
                  <input type="text" value={form.sfCtaBtn} onChange={e => setForm({...form, sfCtaBtn: e.target.value})} className="w-full md:w-1/2 bg-darkBg border border-gray-700 p-3 rounded text-white font-bold" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-successGreen border-b border-gray-800 pb-2 mb-4">Specific Footer Data</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Address (e.g. Banani, Dhaka)" value={form.sfFooterAddress} onChange={e => setForm({...form, sfFooterAddress: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white" />
                  <input type="text" placeholder="Phone Number" value={form.sfFooterPhone} onChange={e => setForm({...form, sfFooterPhone: e.target.value})} className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white font-bold text-neonBlue" />
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="mt-12 pt-6 border-t border-gray-800 sticky bottom-4 z-40 bg-cardBg p-4 rounded-xl shadow-2xl">
            <button type="submit" className="w-full bg-successGreen hover:bg-green-600 text-black font-extrabold py-5 rounded-xl text-lg transition-transform hover:scale-[1.01] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              🚀 OVERWRITE & PUBLISH TO LIVE WEBSITE
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 font-bold">This will securely save data for all 3 pages directly to the master database.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
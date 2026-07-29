'use client';

import Navbar from "../Components/auth/Shared/Navbar";


export default function Blog() {
  const featuredPost = {
    title: "Germany vs Italy: Which country is best for Bangladeshi students in 2026?",
    category: "Destination Comparison",
    date: "May 10, 2026",
    desc: "জার্মানি নাকি ইতালি? টিউশন ফি, লিভিং কস্ট, পার্ট-টাইম জব এবং পিআর (PR) পাওয়ার সুবিধার উপর ভিত্তি করে একটি বিস্তারিত তুলনামূলক আলোচনা।"
  };

  const posts = [
    {
      title: "Stipendium Hungaricum Scholarship: A Complete Guide",
      category: "Scholarships",
      date: "May 05, 2026",
      desc: "হাঙ্গেরির ফুল ফান্ডেড স্কলারশিপের জন্য কীভাবে অ্যাপ্লাই করবেন, কি কি ডকুমেন্টস লাগবে এবং ইন্টারভিউ টিপস।"
    },
    {
      title: "5 Mistakes that will instantly reject your Student Visa",
      category: "Visa Tips",
      date: "April 28, 2026",
      desc: "ভিসা ইন্টারভিউ বা ফাইল প্রসেসিং এ যে ৫টি মারাত্মক ভুলের কারণে আপনার ভিসা রিজেক্ট হতে পারে।"
    },
    {
      title: "Cost of Living in Europe: A Realistic Breakdown",
      category: "Student Life",
      date: "April 20, 2026",
      desc: "ইউরোপের বিভিন্ন দেশে থাকা-খাওয়ার আসল খরচ কেমন? পার্ট-টাইম জব দিয়ে কি পুরো খরচ চালানো সম্ভব?"
    },
    {
      title: "How to Email a Professor for Masters Funding",
      category: "University Hunting",
      date: "April 15, 2026",
      desc: "প্রফেসরকে ইমেইল করার সঠিক নিয়ম এবং প্রফেশনাল ইমেইল টেমপ্লেট যা রিপ্লাই পাওয়ার চান্স বাড়িয়ে দিবে।"
    },
    {
      title: "Blocked Account in Germany: Everything You Need to Know",
      category: "Finance",
      date: "April 02, 2026",
      desc: "জার্মানির স্টুডেন্ট ভিসার জন্য ব্লকড একাউন্ট কীভাবে খুলবেন এবং কত টাকা লাগবে তার আপডেট নিয়মকানুন।"
    },
    {
      title: "IELTS vs Duolingo: Which one should you take?",
      category: "Preparation",
      date: "March 25, 2026",
      desc: "ইউরোপের ইউনিভার্সিটিগুলোর জন্য কোনটি বেশি একসেপ্টেবল এবং কোনটি স্কোর তোলা সহজ?"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primaryAccent selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-[#0a0a0a] border-b border-gray-900 py-16 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            SAWN BD <span className="text-primaryAccent">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            স্টাডি অ্যাব্রোড, স্কলারশিপ, ভিসা প্রসেসিং এবং ইউরোপের স্টুডেন্ট লাইফ নিয়ে সর্বশেষ আপডেট ও গাইডলাইন।
          </p>
        </section>

        {/* FEATURED POST */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="bg-cardBg border border-primaryAccent/30 rounded-2xl p-1 md:p-2 overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.1)] relative">
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-primaryAccent text-white text-xs font-bold px-3 py-1 rounded z-10">
              Featured
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#111] rounded-xl p-6 md:p-12">
              <div className="aspect-video bg-darkBg border border-gray-800 rounded-lg flex items-center justify-center text-6xl">
                🌍
              </div>
              <div>
                <span className="text-sm text-neonBlue font-bold">{featuredPost.category}</span>
                <span className="text-sm text-gray-500 ml-4">• {featuredPost.date}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mt-4 mb-4 hover:text-primaryAccent cursor-pointer transition">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {featuredPost.desc}
                </p>
                <button className="text-primaryAccent font-bold hover:underline flex items-center gap-2">
                  Read Article <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT POSTS GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-t border-gray-900">
          <h3 className="text-2xl font-bold mb-8">Latest Articles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group cursor-pointer">
                <div className="h-48 bg-darkBg border-b border-gray-800 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                  📰
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-primaryAccent font-bold bg-primaryAccent/10 px-2 py-1 rounded">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-neonBlue transition">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#020202] py-8 border-t border-gray-900 text-center text-gray-600 text-xs">
        <p>© 2026 SAWN BD with Niloy Baruaa. All rights reserved.</p>
      </footer>
    </div>
  );
}
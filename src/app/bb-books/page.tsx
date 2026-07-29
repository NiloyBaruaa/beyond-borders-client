'use client';

import Navbar from "../Components/auth/Shared/Navbar";


export default function BBBooks() {
  const books = [
    {
      title: "The Ultimate SOP Formula",
      subtitle: "How to write a Winning Statement of Purpose",
      price: "৳৩০০",
      isFree: false,
      tag: "Best Seller",
      color: "bg-primaryAccent",
      desc: "কপি-পেস্ট করা SOP দিয়ে ভিসা হয় না। এই বইটিতে ধাপে ধাপে দেখানো হয়েছে কীভাবে নিজের জীবনের গল্প দিয়ে একটি ১০০% ইউনিক ও প্রফেশনাল SOP লিখতে হয়।"
    },
    {
      title: "Embassy Q&A Cracker",
      subtitle: "Master the Visa Interview",
      price: "Free",
      isFree: true,
      tag: "Must Have",
      color: "bg-successGreen",
      desc: "এম্বাসিতে কি কি প্রশ্ন করা হয় এবং তার স্মার্ট উত্তর কীভাবে দিতে হয়? ভিসা অফিসারদের সাইকোলজি বোঝার সম্পূর্ণ গাইডলাইন।"
    },
    {
      title: "Europe Scholarship Directory",
      subtitle: "2026-2027 Fully Funded Programs",
      price: "৳২৫০",
      isFree: false,
      tag: "New Release",
      color: "bg-neonBlue",
      desc: "ইউরোপের ১৫+ দেশের ২০০+ ফুল-ফান্ডেড স্কলারশিপের লিংক, রিকোয়ারমেন্টস এবং ডেডলাইনের কমপ্লিট ডাটাবেস।"
    },
    {
      title: "Europass CV Masterclass",
      subtitle: "ATS Friendly European Format",
      price: "Free",
      isFree: true,
      tag: "Essential",
      color: "bg-warningRed",
      desc: "প্রফেশনাল লেভেলের সিভি ছাড়া ইউরোপে একসেপ্টেন্স পাওয়া প্রায় অসম্ভব। এই ই-বুকে রয়েছে পারফেক্ট ইউরোপাস সিভি বানানোর সিক্রেট।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primaryAccent selection:text-white flex flex-col">
      <Navbar></Navbar>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-[#0a0a0a] border-b border-gray-900 py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            SAWN BD <span className="text-primaryAccent">Books</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            স্টাডি অ্যাব্রোড জার্নির জন্য প্রয়োজনীয় সব প্রিমিয়াম এবং ফ্রি ই-বুক। নিজে নিজে ফাইল প্রসেস করার জন্য তোমার সবচেয়ে বিশ্বস্ত সঙ্গী।
          </p>
        </section>

        {/* BOOKS GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, idx) => (
              <div key={idx} className="bg-cardBg border border-gray-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:-translate-y-2 transition-all flex flex-col">
                
                {/* Book Cover Placeholder */}
                <div className={`h-48 ${book.color}/10 relative flex items-center justify-center p-6 border-b border-gray-800`}>
                  <div className={`absolute top-4 right-4 ${book.color} text-black text-xs font-bold px-3 py-1 rounded-full`}>
                    {book.tag}
                  </div>
                  <div className={`h-full w-2/3 ${book.color}/20 border border-${book.color}/50 rounded flex items-center justify-center shadow-lg transform -rotate-3`}>
                    <span className="text-4xl">📘</span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
                  <p className="text-xs text-primaryAccent mb-4">{book.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                    {book.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-white">{book.price}</span>
                    <button className={`px-6 py-2 rounded font-bold transition-transform hover:scale-105 ${book.isFree ? 'bg-darkBg border border-successGreen text-successGreen hover:bg-successGreen hover:text-black' : 'bg-primaryAccent text-white hover:bg-purple-500'}`}>
                      {book.isFree ? 'Download PDF' : 'Buy Now'}
                    </button>
                  </div>
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
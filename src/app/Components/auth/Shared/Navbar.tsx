"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EnrollModal from "./EnrollModal"; // Adjust path if needed
export default function Navbar() {
  const router = useRouter();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-widest text-white cursor-pointer"
        >
          SAWN<span className="text-primaryAccent">BD</span>
        </Link>

        {/* Real Multi-Page Routing Links */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-300">
          <Link
            href="/course-details"
            className="hover:text-primaryAccent transition"
          >
            Course Details
          </Link>
          <Link
            href="/student-feedback"
            className="hover:text-primaryAccent transition"
          >
            Student Feedback
          </Link>
          <Link
            href="/bb-books"
            className="hover:text-primaryAccent transition"
          >
            BB Books
          </Link>
          <Link href="/blog" className="hover:text-primaryAccent transition">
            Blog
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => router.push("/login")}
            className="text-gray-300 hover:text-white font-semibold transition-colors text-sm md:text-base"
          >
            Student Login
          </button>
          <button onClick={() => setIsEnrollModalOpen(true)} className="...">
            Enroll Now
          </button>

          <EnrollModal
            isOpen={isEnrollModalOpen}
            onClose={() => setIsEnrollModalOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}

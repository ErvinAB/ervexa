"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur shadow-sm border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo with blue glow */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logoWhite.svg"
            alt="Stagbyte Logo"
            width={160}
            height={40}
            priority
            className="h-8 w-auto drop-shadow-[0_0_10px_rgba(88,102,255,0.75)] hover:drop-shadow-[0_0_18px_rgba(88,102,255,0.9)] transition-all duration-500"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/#live-ai"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition text-sm"
          >
            AI Feeds
          </Link>
          <Link
            href="/#ai-use-cases"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition text-sm"
          >
            Use Cases
          </Link>
          <Link
            href="/#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition text-sm"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

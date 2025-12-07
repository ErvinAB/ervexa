"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b smooth-transition ${scrolled
        ? "bg-black/80 backdrop-blur-xl border-white/10 shadow-lg"
        : "bg-black/40 backdrop-blur-sm border-white/5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo with blue glow */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logoSBWhite.svg"
            alt="Stagbyte Logo"
            width={160}
            height={40}
            priority
            className="h-8 w-auto drop-shadow-[0_0_10px_rgba(88,102,255,0.75)] group-hover:drop-shadow-[0_0_18px_rgba(88,102,255,0.9)] smooth-transition group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/#showcase"
            className="relative text-gray-300 hover:text-blue-400 smooth-transition text-sm group"
          >
            Agents
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full smooth-transition" />
          </Link>
          <Link
            href="/#live-feed"
            className="relative text-gray-300 hover:text-blue-400 smooth-transition text-sm group"
          >
            AI Feeds
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full smooth-transition" />
          </Link>
          <Link
            href="/#use-cases"
            className="relative text-gray-300 hover:text-blue-400 smooth-transition text-sm group"
          >
            Use Cases
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full smooth-transition" />
          </Link>
          <Link
            href="/#contact"
            className="relative text-gray-300 hover:text-blue-400 smooth-transition text-sm group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full smooth-transition" />
          </Link>

          {/* Try Agents Button */}
          <Link
            href="/content-engine"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium rounded-lg smooth-transition text-sm"
          >
            Try Content Engine
          </Link>
        </div>
      </div>
    </nav>
  );
}

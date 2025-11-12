"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Use Link for internal navigation and correct public/ path */}
        <Link href="/" className="flex items-center">
        <Image
          src={theme === "dark" ? "/ervexaFinalLogoWhiteSVG.svg" : "/ervexaFinalLogoBlackSVG.svg"}
          alt="Ervexa Logo"
          width={160}
          height={40}
          priority
          className={`h-8 w-auto transition duration-300 ${
          theme === "dark" ? "brightness-150 contrast-125" : ""
          }`}
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* Use Link for hash routes too, so you avoid future lint warnings */}
          <Link
            href="/#live-ai"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm"
          >
            AI Feeds
          </Link>
          <Link
            href="/#ai-use-cases"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm"
          >
            Use Cases
          </Link>
          <Link
            href="/#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

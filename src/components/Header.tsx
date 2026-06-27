"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import { navigation, socialLinks } from "@/lib/content/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-zinc-100 hover:text-cyan-400 transition-colors"
        >
          <Image
            src="/logoSBWhite.svg"
            alt="Stagbyte"
            width={20}
            height={20}
            className="h-5 w-auto"
          />
          Stagbyte
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>

        <button
          className="md:hidden text-zinc-400 hover:text-zinc-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-zinc-800/50 bg-zinc-950 px-6 py-4">
          <div className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

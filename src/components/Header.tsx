"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation, secondaryNavigation } from "@/lib/content/navigation";
import BrandMark from "@/components/site/BrandMark";

interface HeaderProps {
  /**
   * "paper" (default) sits on the light editorial pages with a hairline rule;
   * "night" is for the dark showcase pages, currently only /games. A paper site
   * with one bolted-on dark bar reads as a template with an unrelated nav.
   */
  tone?: "paper" | "night";
}

export default function Header({ tone = "paper" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNight = tone === "night";

  const shell = isNight
    ? "border-b border-ivory/10 bg-night/95 backdrop-blur"
    : "border-b border-charcoal/10 bg-ivory/90 backdrop-blur";
  const brand = isNight
    ? "text-ivory hover:text-accent"
    : "text-charcoal hover:text-forest";
  const navLink = isNight
    ? "text-ivory/75 hover:text-ivory"
    : "text-charcoal/75 hover:text-charcoal";
  const cta = isNight
    ? "border-ivory/30 text-ivory/85 hover:border-accent hover:text-accent"
    : "border-charcoal/25 text-charcoal hover:border-forest hover:text-forest";
  const menuButton = isNight
    ? "text-ivory/75 hover:text-ivory"
    : "text-charcoal/75 hover:text-charcoal";
  const mobilePanel = isNight
    ? "border-t border-ivory/10 bg-night"
    : "border-t border-charcoal/10 bg-ivory";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${shell}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className={`group inline-flex items-center gap-3 transition-colors ${brand}`}>
          <BrandMark variant="icon" className="logo-wiggle h-9 w-auto origin-bottom" />
          <span className="font-display text-lg font-bold uppercase tracking-[0.02em]">
            Stagbyte
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm transition-colors ${navLink}`}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`label inline-flex items-center rounded-full border px-4 py-2 font-semibold transition-colors ${cta}`}
          >
            Get in touch
          </Link>
        </nav>

        {/* The icon is 20px, which is under the WCAG 2.2 AA 24px target
            minimum. The `after` layer extends the hit area to 36px without
            moving the icon or changing the header's height. */}
        <button
          type="button"
          className={`relative transition-colors after:absolute after:-inset-2 after:content-[''] md:hidden ${menuButton}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className={`px-6 py-4 md:hidden ${mobilePanel}`}
        >
          <div className="flex flex-col gap-4">
            {[...navigation, ...secondaryNavigation].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition-colors ${navLink}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

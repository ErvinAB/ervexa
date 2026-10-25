import Link from "next/link";
import { ArrowRight, Gamepad2, LayoutGrid, Wrench } from "lucide-react";
import HeroStage from "@/components/hero/HeroStage";
import HeroShowcase from "@/components/hero/HeroShowcase";
import {
  Fireflies,
  ForegroundLayer,
  MistLayer,
  MoonLayer,
  MountainLayer,
  SkyLayer,
  TreeLayer,
} from "@/components/hero/ForestLayers";

/**
 * Homepage hero, Forest Lime direction (Oct 2026).
 *
 * A moonlit forest built from depth layers that drift with the pointer and
 * scroll, with the studio's objects in front: the extruded lime tile (the
 * stag's eyes follow the cursor and blink), a phone, and two glass cards.
 *
 * Choices behind it:
 *  - The headline is never hidden on load: it rises with transform only and is
 *    fully opaque from the first paint, so it does not delay LCP.
 *  - All motion is transform/opacity (GPU-composited); pointer tracking writes
 *    CSS variables, so nothing re-renders. Everything stops for
 *    prefers-reduced-motion.
 *  - All vector, no photographic render: a few KB, sharp at any size.
 */

const pillars = [
  { icon: LayoutGrid, top: "Useful", bottom: "apps" },
  { icon: Wrench, top: "Creative", bottom: "tools" },
  { icon: Gamepad2, top: "Playful", bottom: "experiments" },
];

export default function Hero() {
  return (
    <HeroStage className="hero-root relative isolate overflow-hidden bg-deep">
      {/* Backdrop, far to near */}
      <div className="absolute inset-0 -z-10">
        <SkyLayer />
        <MoonLayer />
        <MountainLayer />
        <MistLayer />
        <TreeLayer />
        <ForegroundLayer />
        <Fireflies />
        {/* Darkens the copy side so the text always reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-transparent lg:via-deep/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[min(100svh,64rem)] max-w-7xl items-center gap-6 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:pb-20 lg:pt-32">
        <div className="relative z-10">
          <p className="hero-rise label inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3.5 py-1.5 text-lime backdrop-blur">
            <span className="status-pulse h-1.5 w-1.5 rounded-full bg-lime" />
            Independent product studio
          </p>

          <h1 className="hero-rise mt-7 font-display text-[clamp(2.9rem,5.4vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-offwhite [animation-delay:60ms]">
            Build useful,
            <br />
            <span className="hero-glow text-lime">brighter</span> things.
          </h1>

          <p className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-stone md:text-xl [animation-delay:120ms]">
            Stagbyte makes thoughtful small apps, tools and playful experiments —
            each one solving an everyday problem properly, then staying out of
            your way.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-4 [animation-delay:180ms]">
            <a
              href="#apps"
              className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 text-base font-semibold text-deep shadow-[0_10px_40px_-10px_rgba(197,242,119,0.65)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_rgba(197,242,119,0.8)]"
            >
              Explore apps
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-offwhite/30 bg-deep/30 px-7 py-3.5 text-base font-semibold text-offwhite backdrop-blur transition-colors hover:border-lime hover:text-lime"
            >
              Our story
            </Link>
          </div>

          <ul className="hero-rise mt-12 flex flex-wrap gap-x-7 gap-y-4 [animation-delay:240ms]">
            {pillars.map(({ icon: Icon, top, bottom }) => (
              <li key={top} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime/20 bg-lime/10 text-lime">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="label leading-snug text-stone">
                  {top}
                  <br />
                  {bottom}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase />
      </div>
    </HeroStage>
  );
}

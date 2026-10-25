import Link from "next/link";
import { ArrowUpRight, Gamepad2, LayoutGrid, Menu, NotebookPen, Puzzle, Sprout } from "lucide-react";
import LivingStag from "@/components/hero/LivingStag";
import { TILE } from "@/components/site/BrandMark";
import { firstAppStatus } from "@/lib/content/apps";

/**
 * The hero's foreground objects: the extruded Stag Lime tile, a phone showing
 * the studio, and two floating glass cards. Each one sits at its own depth and
 * drifts with the pointer by a different amount (see .hero-obj in globals.css).
 *
 * The cards only state true things: the real status of app N°01 and Inkline,
 * the puzzle that is playable on this site today. No invented products.
 */

/** Extruded tile: stacked copies of the tile shape pushed back in Z. */
function LimeTile3D({ className = "" }: { className?: string }) {
  const depthLayers = 12;
  return (
    <div className={`tile3d-stage ${className}`} aria-hidden="true">
      <div className="tile3d-float">
        <div className="tile3d-body">
          {Array.from({ length: depthLayers }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 492 636"
              className="tile3d-layer"
              style={{ transform: `translateZ(${-(i + 1) * 5}px)` }}
            >
              {/* Side walls get darker toward the back, like a lit extrusion. */}
              <path d={TILE} fill={i < depthLayers - 1 ? `hsl(84 ${52 - i * 2}% ${44 - i * 2.2}%)` : "#2f4419"} />
            </svg>
          ))}
          <LivingStag tile className="tile3d-layer" />
          {/* Glossy highlight on the front face */}
          <div className="tile3d-gloss" />
        </div>
      </div>
      <div className="tile3d-shadow" />
    </div>
  );
}

function Phone() {
  return (
    <div className="phone3d" aria-hidden="true">
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[#0c130f]">
        {/* Status row */}
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="font-display text-[0.8rem] font-bold tracking-[0.04em] text-offwhite">STAGBYTE</span>
          <Menu className="h-4 w-4 text-stone" />
        </div>

        {/* Mini scene */}
        <div className="relative mx-3 mt-3 h-[11.5rem] overflow-hidden rounded-[1.4rem]">
          <svg viewBox="0 0 300 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
            <defs>
              <radialGradient id="ph-moon" cx="0.45" cy="0.4" r="0.6">
                <stop offset="0" stopColor="#ecffc2" />
                <stop offset="1" stopColor="#a9d65f" />
              </radialGradient>
            </defs>
            <rect width="300" height="220" fill="#16281c" />
            <circle cx="150" cy="95" r="70" fill="url(#ph-moon)" />
            <path d="M0,170 L60,120 L110,150 L170,100 L230,150 L300,120 V220 H0Z" fill="#2c4a2e" />
            <path d="M0,200 L40,160 L80,190 L150,170 L220,190 L300,165 V220 H0Z" fill="#0f1d14" />
          </svg>
          <LivingStag className="absolute bottom-3 left-1/2 h-[7.2rem] w-auto -translate-x-1/2" blinkDelay="1.3s" />
        </div>

        <div className="px-5 pt-4">
          <p className="font-display text-[1.05rem] font-bold leading-tight text-offwhite">Small apps.</p>
          <p className="font-display text-[1.05rem] font-bold leading-tight text-lime">Brighter days.</p>
        </div>

        <div className="mx-3 mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: LayoutGrid, label: "Apps" },
            { icon: Gamepad2, label: "Games" },
            { icon: NotebookPen, label: "Notes" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#17231b] py-3">
              <Icon className="h-4 w-4 text-lime" />
              <span className="text-[0.62rem] font-medium text-stone">{label}</span>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-offwhite/25" />
      </div>
    </div>
  );
}

function GlassCard({
  href,
  icon: Icon,
  eyebrow,
  title,
  body,
  className = "",
  floatDelay = "0s",
}: {
  href: string;
  icon: typeof Sprout;
  eyebrow: string;
  title: string;
  body: string;
  className?: string;
  floatDelay?: string;
}) {
  return (
    <div className={`hero-obj ${className}`}>
      <div className="hero-float" style={{ animationDelay: floatDelay }}>
        <Link
          href={href}
          className="group block w-[15rem] rounded-[1.6rem] border border-lime/15 bg-[#132019]/75 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-lime/50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-deep shadow-[0_0_24px_-4px_rgba(197,242,119,0.6)]">
            <Icon className="h-5 w-5" />
          </span>
          <span className="label mt-4 block text-lime/80">{eyebrow}</span>
          <span className="mt-1 block font-display text-lg font-bold text-offwhite">{title}</span>
          <span className="mt-1 flex items-end justify-between gap-3 text-sm leading-snug text-stone/85">
            {body}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-offwhite/20 text-offwhite transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-deep">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function HeroShowcase() {
  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-[40rem] sm:h-[34rem] lg:h-[40rem]">
      {/* Small screens: the backdrop moon is cropped off, so the tile gets its
          own glowing moon behind it. */}
      <div className="absolute left-1/2 top-[4%] h-[17rem] w-[17rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_42%_38%,#ecffc2,#c5f277_60%,#9fcc58)] shadow-[0_0_120px_30px_rgba(197,242,119,0.25)] sm:hidden" aria-hidden="true" />
      {/* Phone: back-centre */}
      <div className="hero-obj absolute left-[38%] top-0 hidden sm:block" style={{ ["--d" as string]: 0.5 }}>
        <div className="hero-float" style={{ animationDelay: "-2s", animationDuration: "9s" }}>
          <Phone />
        </div>
      </div>

      {/* Cards: right, at the front */}
      <GlassCard
        className="absolute right-0 top-[6%] hidden sm:block"
        href="/apps"
        icon={Sprout}
        eyebrow={firstAppStatus.label}
        title="Growing now"
        body="First release targeted for January 2027."
        floatDelay="-1s"
      />
      <GlassCard
        className="absolute bottom-[14%] right-[-2%] hidden sm:block lg:hidden xl:block"
        href="/play"
        icon={Puzzle}
        eyebrow="Play today"
        title="Inkline"
        body="One small puzzle a day. Turn the tiles."
        floatDelay="-4s"
      />

      {/* The tile: front-left, the loudest object */}
      <div className="hero-obj absolute bottom-[2%] left-1/2 -translate-x-1/2 sm:bottom-[3%] sm:left-[-2%] sm:translate-x-0" style={{ ["--d" as string]: 1.3 }}>
        <LimeTile3D className="h-[15.5rem] w-[12rem] sm:h-[19rem] sm:w-[14.7rem]" />
      </div>
    </div>
  );
}

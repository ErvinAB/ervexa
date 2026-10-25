import LivingStag from "@/components/hero/LivingStag";

/**
 * A small moonlit corner for interior page headers: lime moon, two ridges,
 * a few pines, fireflies and the stag standing watch (eyes follow the
 * cursor). Decorative only. Sits on the right; the copy keeps the left.
 */

function pine(x: number, base: number, h: number) {
  const w = h * 0.3;
  return `M${x},${base - h} L${x - w * 0.55},${base - h * 0.55} L${x - w * 0.3},${base - h * 0.56} L${x - w},${base} L${x + w},${base} L${x + w * 0.3},${base - h * 0.56} L${x + w * 0.55},${base - h * 0.55} Z`;
}

const pines = [
  [40, 400, 120], [90, 405, 160], [470, 402, 150], [520, 400, 190], [575, 405, 130],
];

const flies = [
  ["18%", "38%", "0s"], ["70%", "30%", "-3s"], ["85%", "62%", "-6s"], ["35%", "70%", "-1.5s"], ["55%", "50%", "-4.5s"],
];

export default function MiniForest({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:w-[55%] md:opacity-100 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMaxYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="mf-halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#c5f277" stopOpacity="0.3" />
            <stop offset="1" stopColor="#c5f277" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mf-moon" cx="0.42" cy="0.38" r="0.65">
            <stop offset="0" stopColor="#ecffc2" />
            <stop offset="1" stopColor="#a9d65f" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="170" r="190" fill="url(#mf-halo)" className="hero-breathe" />
        <circle cx="400" cy="170" r="92" fill="url(#mf-moon)" opacity="0.92" />
        <path d="M0,330 L110,250 L200,300 L320,210 L430,290 L520,240 L600,280 V400 H0Z" fill="#3d5a3a" opacity="0.7" />
        <path d="M0,370 L130,320 L260,360 L400,315 L520,355 L600,335 V400 H0Z" fill="#1a2e20" />
        {pines.map(([x, b, h], i) => (
          <path key={i} d={pine(x, b, h)} fill="#0d1811" />
        ))}
      </svg>
      {flies.map(([l, t, d], i) => (
        <span
          key={i}
          className={`hero-firefly hero-firefly-${i % 3}`}
          style={{ left: l, top: t, width: 4, height: 4, animationDelay: `${d}, ${d}`, animationDuration: "11s, 2.8s" }}
        />
      ))}
      {/* Fade into the page on the copy side and at the bottom */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ivory to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-ivory/60 to-transparent" />
      {/* The stag stands in front of the fades so its eyes stay bright. */}
      <LivingStag className="absolute bottom-[2%] right-[24%] hidden h-[46%] w-auto md:block" body="#0d1811" blinkDelay="-2s" />
    </div>
  );
}

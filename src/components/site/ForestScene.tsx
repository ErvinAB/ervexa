import { StagShapes } from "@/components/site/BrandMark";

/**
 * The brand's hero illustration: Stag Lime moon, moss mountains, a pine line,
 * and the stag standing on a ridge. Flat vector, built from the Forest Lime
 * brand pack (website-hero.svg) so it stays crisp and weighs a few KB.
 */

// Pine: a stacked two-tier triangle, like the brand pack trees.
function pine(x: number, base: number, h: number) {
  const w = h * 0.42;
  const mid = base - h * 0.42;
  return `M${x},${base - h} L${x - w * 0.7},${mid} H${x - w * 0.35} L${x - w},${base} H${x + w} L${x + w * 0.35},${mid} H${x + w * 0.7} Z`;
}

const backPines = [
  [40, 640, 150], [95, 630, 120], [150, 645, 170], [610, 640, 160],
  [665, 625, 130], [720, 645, 180], [775, 630, 140],
];
const frontPines = [
  [10, 760, 230], [80, 770, 190], [700, 765, 210], [770, 775, 250],
];
const fireflies = [
  [120, 470], [210, 560], [560, 420], [640, 520], [330, 610], [720, 380], [470, 600],
];

export default function ForestScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <radialGradient id="fs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c5f277" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c5f277" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fs-moon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dffc9e" />
          <stop offset="1" stopColor="#a9d65f" />
        </linearGradient>
        <linearGradient id="fs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.75" stopColor="#0f1511" stopOpacity="0" />
          <stop offset="1" stopColor="#0f1511" />
        </linearGradient>
      </defs>

      <circle cx="420" cy="300" r="380" fill="url(#fs-glow)" />
      <circle cx="420" cy="300" r="245" fill="url(#fs-moon)" />

      {/* Mountains */}
      <path d="M0,560 L150,330 L290,520 L470,250 L640,500 L760,360 L800,420 V800 H0Z" fill="#7e8f63" opacity="0.55" />
      <path d="M0,650 L190,470 L380,640 L560,470 L800,620 V800 H0Z" fill="#223e2b" />

      {backPines.map(([x, b, h], i) => (
        <path key={`b${i}`} d={pine(x, b, h)} fill="#15291c" />
      ))}

      {/* Ridge the stag stands on */}
      <path d="M190,800 C230,690 300,655 400,650 C500,655 570,690 610,800 Z" fill="#0b1510" />

      {/* The stag, in front of the moon */}
      <g transform="translate(400 655) scale(0.62) translate(-245 -585)" fill="#0b1510">
        <StagShapes eyes="white" />
      </g>

      {frontPines.map(([x, b, h], i) => (
        <path key={`f${i}`} d={pine(x, b, h)} fill="#0b1510" />
      ))}

      {fireflies.map(([x, y], i) => (
        <circle
          key={`ff${i}`}
          cx={x}
          cy={y}
          r={i % 2 ? 2.5 : 3.5}
          fill="#c5f277"
          className="status-pulse"
          style={{ animationDelay: `${i * 0.37}s`, animationDuration: `${2.4 + (i % 3) * 0.8}s` }}
        />
      ))}

      <rect width="800" height="800" fill="url(#fs-fade)" />
    </svg>
  );
}

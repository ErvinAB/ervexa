/**
 * The hero backdrop: a moonlit forest in separate depth layers. Each layer is
 * its own full-bleed SVG with the same viewBox, so they line up exactly, and
 * the parent moves them by different amounts (pointer + scroll parallax).
 *
 * All vector, no photos: a few KB instead of a multi-MB render, and it stays
 * sharp on any screen. Tree positions come from a seeded generator so server
 * and client render the same markup.
 */

const VB = "0 0 1600 900";

// Deterministic pseudo-random numbers (mulberry32).
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A tiered pine silhouette with drooping branches. */
function pine(x: number, base: number, h: number, w: number, tiers = 5) {
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i < tiers; i++) {
    const f = (i + 1) / tiers;
    const y = base - h + h * f * 0.88;
    const wi = w * (0.25 + 0.75 * f);
    const inner = wi * 0.42;
    left.push(`L${x - wi},${y} L${x - inner},${y - h * 0.035}`);
    right.unshift(`L${x + inner},${y - h * 0.035} L${x + wi},${y}`);
  }
  const trunk = Math.max(2, w * 0.08);
  return (
    `M${x},${base - h} ` +
    left.join(" ") +
    ` L${x - trunk},${base - h * 0.06} L${x - trunk},${base} L${x + trunk},${base} L${x + trunk},${base - h * 0.06} ` +
    right.join(" ") +
    " Z"
  );
}

function treeRow(seed: number, count: number, baseY: number, hMin: number, hMax: number, xFrom = -40, xTo = 1640) {
  const rand = seeded(seed);
  const step = (xTo - xFrom) / count;
  return Array.from({ length: count }, (_, i) => {
    const x = xFrom + i * step + rand() * step * 0.8;
    const h = hMin + rand() * (hMax - hMin);
    const base = baseY + rand() * 30;
    return pine(x, base, h, h * (0.26 + rand() * 0.06), 5 + Math.floor(rand() * 2));
  }).join(" ");
}

const midTrees = treeRow(7, 46, 700, 110, 210);
const nearTreesLeft = treeRow(21, 7, 905, 300, 470, -60, 360);
const nearTreesRight = treeRow(33, 6, 905, 320, 520, 1280, 1680);

const stars = (() => {
  const rand = seeded(99);
  return Array.from({ length: 70 }, () => ({
    x: rand() * 1600,
    y: rand() * 420,
    r: rand() * 1.2 + 0.3,
    o: rand() * 0.5 + 0.15,
  }));
})();

const layerClass = "hero-layer absolute inset-[-3%] h-[106%] w-[106%]";

export function SkyLayer() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layerClass} aria-hidden="true" style={{ ["--depth" as string]: 0.15 }}>
      <defs>
        <linearGradient id="hz-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a100c" />
          <stop offset="0.55" stopColor="#13221a" />
          <stop offset="1" stopColor="#1d3324" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hz-sky)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f5f7f2" opacity={s.o} className={i % 4 === 0 ? "hero-twinkle" : undefined} style={i % 4 === 0 ? { animationDelay: `${(i % 9) * 0.6}s` } : undefined} />
      ))}
    </svg>
  );
}

export function MoonLayer() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layerClass} aria-hidden="true" style={{ ["--depth" as string]: 0.3 }}>
      <defs>
        <radialGradient id="hz-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c5f277" stopOpacity="0.45" />
          <stop offset="0.45" stopColor="#c5f277" stopOpacity="0.12" />
          <stop offset="1" stopColor="#c5f277" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hz-moon" cx="0.42" cy="0.38" r="0.65">
          <stop offset="0" stopColor="#ecffc2" />
          <stop offset="0.6" stopColor="#c5f277" />
          <stop offset="1" stopColor="#9fcc58" />
        </radialGradient>
      </defs>
      <circle cx="1130" cy="340" r="560" fill="url(#hz-halo)" className="hero-breathe" />
      <circle cx="1130" cy="340" r="235" fill="url(#hz-moon)" />
      {/* Soft craters */}
      <g fill="#9fcc58" opacity="0.28">
        <circle cx="1060" cy="290" r="34" />
        <circle cx="1190" cy="400" r="22" />
        <circle cx="1210" cy="270" r="14" />
        <circle cx="1090" cy="420" r="11" />
      </g>
    </svg>
  );
}

export function MountainLayer() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layerClass} aria-hidden="true" style={{ ["--depth" as string]: 0.5 }}>
      {/* Far range */}
      <path d="M0,600 L140,470 L230,520 L380,360 L520,500 L640,430 L760,540 L900,380 L1010,300 L1120,410 L1240,330 L1380,460 L1490,390 L1600,450 V900 H0Z" fill="#3d5a3a" />
      {/* Moonlit faces (light from the right) */}
      <path d="M380,360 L455,450 L420,520 L520,500Z M1010,300 L1065,370 L1040,440 L1120,410Z M1240,330 L1300,400 L1275,450 L1380,460Z" fill="#7e8f63" opacity="0.55" />
      {/* Near range */}
      <path d="M0,700 L170,560 L300,640 L470,520 L640,650 L820,560 L980,640 L1160,530 L1330,640 L1480,570 L1600,620 V900 H0Z" fill="#203826" />
    </svg>
  );
}

export function MistLayer() {
  return (
    <div className={`${layerClass} overflow-hidden`} aria-hidden="true" style={{ ["--depth" as string]: 0.6 }}>
      <div className="hero-mist absolute left-0 top-[62%] h-[22%] w-[200%]" />
    </div>
  );
}

export function TreeLayer() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layerClass} aria-hidden="true" style={{ ["--depth" as string]: 0.8 }}>
      <path d={midTrees} fill="#132619" />
      <rect y="725" width="1600" height="200" fill="#0f1d14" />
    </svg>
  );
}

export function ForegroundLayer() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layerClass} aria-hidden="true" style={{ ["--depth" as string]: 1.25 }}>
      <defs>
        <linearGradient id="hz-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d4a2a" />
          <stop offset="0.25" stopColor="#152418" />
          <stop offset="1" stopColor="#0a120d" />
        </linearGradient>
      </defs>
      {/* Mossy rock ledge the hero objects sit on */}
      <path d="M760,900 C800,800 900,770 1010,760 C1120,752 1250,770 1340,800 C1420,826 1470,860 1500,900 Z" fill="url(#hz-rock)" />
      <path d="M840,800 C930,772 1060,762 1180,770 C1260,776 1320,790 1360,806" fill="none" stroke="#c5f277" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
      <path d={nearTreesLeft} fill="#08100b" />
      <path d={nearTreesRight} fill="#08100b" />
    </svg>
  );
}

/** Fireflies drift on their own paths; the global reduced-motion rule stops them. */
const fireflies = (() => {
  const rand = seeded(5);
  return Array.from({ length: 22 }, (_, i) => ({
    left: `${4 + rand() * 92}%`,
    top: `${30 + rand() * 62}%`,
    size: 3 + rand() * 4,
    delay: `${(rand() * -12).toFixed(2)}s`,
    duration: `${9 + rand() * 9}s`,
    path: i % 3,
  }));
})();

export function Fireflies() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {fireflies.map((f, i) => (
        <span
          key={i}
          className={`hero-firefly hero-firefly-${f.path}`}
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDelay: `${f.delay}, ${f.delay}`,
            animationDuration: `${f.duration}, 2.8s`,
          }}
        />
      ))}
    </div>
  );
}

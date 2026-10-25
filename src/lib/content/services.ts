/**
 * Selective client work.
 *
 * Stagbyte is product-led: this is a small, secondary arm of the studio, not
 * the main offering. Game development sits last on purpose.
 */
export interface Service {
  id: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  stack: string[];
}

export const services: Service[] = [
  {
    id: "custom-apps",
    title: "Custom apps",
    summary:
      "Mobile, desktop and web apps designed and built end to end — the same craft we put into our own products.",
    description:
      "When an off-the-shelf tool does not fit, we design and build the one that does. Product and interface design, the data layer, the integrations and the release, handed over as something you can keep maintaining.",
    deliverables: [
      "Product and interface design",
      "Mobile app development (iOS and Android)",
      "Desktop and web app development",
      "API and third-party integrations",
      "App Store and Play Store submission",
    ],
    stack: [
      "React Native",
      "Swift",
      "Kotlin",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ],
  },
  {
    id: "mvp",
    title: "Prototypes and MVPs",
    summary:
      "A testable build in weeks, so you can find out whether the idea works before you fund the whole thing.",
    description:
      "Most ideas do not need a full team and a roadmap. They need one honest build that proves the risky part. We scope to that single question, build it fast, and tell you plainly what it showed.",
    deliverables: [
      "Scope and feasibility session",
      "Working prototype in 4-8 weeks",
      "User testing support",
      "Technical plan and estimate for the real build",
    ],
    stack: ["Figma", "Next.js", "React Native", "Supabase"],
  },
  {
    id: "partnership",
    title: "Technical partnership",
    summary:
      "Ongoing engineering support for teams that need a steady pair of hands rather than a new agency every quarter.",
    description:
      "Embedded development, maintenance and release engineering on a monthly basis. Useful when you have shipped something real and want continuity rather than a fresh onboarding every three months.",
    deliverables: [
      "Monthly development capacity",
      "Maintenance and platform updates",
      "Release engineering and monitoring",
      "Code review and technical advice",
    ],
    stack: ["TypeScript", "Swift", "Kotlin", "CI/CD", "Docker"],
  },
  {
    id: "custom-games",
    title: "Game development",
    summary:
      "Occasionally, game work — a prototype or a build for a team that already has the design.",
    description:
      "This is the smallest arm of the studio and is taken on rarely. We are most useful when you already know what the game is and need it built or rescoped honestly, rather than when you want an idea developed from nothing.",
    deliverables: [
      "Playable prototype or vertical slice",
      "Gameplay systems and tooling",
      "Performance and platform optimisation",
      "Release build support",
    ],
    stack: ["Unity", "Godot", "C#", "GDScript", "Blender"],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Fit",
    body: "A short call to check the work is a genuine fit. We take on a small number of projects a year and say no to the rest.",
  },
  {
    number: "02",
    title: "Scope",
    body: "A written scope and a fixed estimate. We tell you what is worth building and what to cut.",
  },
  {
    number: "03",
    title: "Build",
    body: "Two-week iterations with a build you can open every time, not a status report.",
  },
  {
    number: "04",
    title: "Ship",
    body: "Release, handover and documentation. Then we stay around only if you want us to.",
  },
];

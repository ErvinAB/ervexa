import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import WhatWeDo from "./sections/WhatWeDo";
import LiveAIFeeds from "./sections/LiveAIFeeds";
import AgentShowcase from "./sections/AgentShowcase"; // we'll treat this like "Use Cases"
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export const metadata = {
  title: "Ervexa – AI-driven Automation & QA Intelligence",
  description:
    "We build AI agents, automated QA systems, and intelligent monitoring so your team ships faster with fewer failures.",
  openGraph: {
    title: "Ervexa – AI-driven Automation & QA Intelligence",
    description:
      "AI agents, QA automation, and intelligent monitoring for engineering teams under pressure.",
    images: ["/og-image.png"], // drop a placeholder in /public/og-image.png
  },
  icons: {
    icon: "/favicon.svg", // put a simple SVG in /public/favicon.svg
  },
};

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black text-zinc-100 antialiased">
      {/* global subtle background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-blue-500/20 blur-[120px] opacity-30" />
      </div>

      <Navbar />

      {/* HERO: headline, tagline, CTAs */}
      <Hero />

      {/* WHAT WE DO: services / offers */}
      <WhatWeDo />

      {/* LIVE AI FEEDS: real-time credibility */}
      <LiveAIFeeds />

      {/* AGENTSHOWCASE: we'll repurpose this section into real-world use cases / case studies */}
      <AgentShowcase />

      {/* CONTACT: Netlify form and availability line */}
      <Contact />

      <Footer />
    </main>
  );
}

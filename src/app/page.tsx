import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import WhatWeDo from "./sections/WhatWeDo";
import LiveAIFeeds from "./sections/LiveAIFeeds";
import AgentShowcase from "./sections/AgentShowcase";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export const metadata = {
  title: "Stagbyte – Automation & AI Workflows",
  description:
    "We build custom AI agents, automations, and decision workflows that remove repetitive work and reduce risk across operations, compliance, support, QA and more.",
  openGraph: {
    title: "Stagbyte – Automation & AI Workflows",
    description:
      "AI agents and automation for the boring, expensive parts of your business.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logoWhite.svg",
  },
};

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black text-zinc-100 antialiased">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-blue-500/20 blur-[120px] opacity-30" />
      </div>

      <Navbar />

      <Hero />

      <WhatWeDo />

      <LiveAIFeeds />

      <AgentShowcase />

      <Contact />

      <Footer />
    </main>
  );
}

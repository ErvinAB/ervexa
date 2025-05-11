import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import LiveAIFeeds from "./sections/LiveAIFeeds";
import WhatWeDo from "./sections/WhatWeDo";
import AgentShowcase from "./sections/AgentShowcase";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <AgentShowcase />
        <LiveAIFeeds />
        <Footer />
      </main>
    </>
  );
}

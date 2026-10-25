import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import Arms from "@/components/home/Arms";
import GamesShowcase from "@/components/home/GamesShowcase";
import Studio from "@/components/home/Studio";
import BuildLogTicker from "@/components/home/BuildLogTicker";
import CTASection from "@/components/site/CTASection";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: { absolute: "Stagbyte — Small apps, built properly" },
  // Kept under 160 characters: search engines truncate the snippet past roughly
  // that, and a description that gets cut mid-sentence is a wasted one.
  description:
    "An independent, product-led studio building small apps that solve one everyday problem properly. One app in development, no roadmaps and nothing announced early.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <JsonLd data={organizationSchema} />
      <Header />
      {/* No <main> here: the root layout already provides the single
          <main id="main-content"> that the skip link targets. Nesting a
          second one made the homepage the only route with two main
          landmarks, which is invalid HTML. */}
      <Hero />
        {/* Proof sits immediately after the hero: what is actually happening,
            before any framing. */}
      <Proof />
      <Arms />
      <GamesShowcase />
      <Studio />
      {/* Rhythm divider, and the homepage's only moving element. It carries
            the real build log rather than five adjectives the page already
            said properly elsewhere. */}
      <BuildLogTicker />
      <CTASection
        eyebrow="Stay in touch"
        title="Want to know when the first app ships?"
        body="Leave your email and we will write once — when there is something real to try, not before."
        newsletter
        primaryHref="/contact"
        primaryLabel="Get in touch"
      />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import CTASection from "@/components/site/CTASection";
import GameCard from "@/components/site/GameCard";
import LivingStag from "@/components/hero/LivingStag";
import Eyebrow from "@/components/site/Eyebrow";
import { games, gamesNote } from "@/lib/content/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Games are an exploratory arm of Stagbyte, not the studio's focus. Nothing is announced until a prototype is worth playing.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <div className="on-night min-h-screen bg-night text-ivory">
      <Header tone="night" />

      <PageIntro
        eyebrow="Games"
        tone="night"
        title="Games are something we explore, not what we sell."
        description="Stagbyte is a product studio first. Games are a smaller, exploratory arm — we prototype ideas privately, and we would only put one in front of people once it is genuinely worth playing."
      >
        <p className="mt-8 max-w-2xl border-l-2 border-accent/60 pl-5 text-base leading-relaxed text-ivory/75">
          {gamesNote}
        </p>
      </PageIntro>

      <section className="relative overflow-hidden border-b border-night-line">
        <div
          className="pointer-events-none absolute -right-12 top-10 hidden md:block"
          aria-hidden="true"
        >
          <LivingStag className="h-[26rem] w-auto" body="#141f18" eyeColor="#c5f277" blinkDelay="-2.5s" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          {/* Real games render here once one is genuinely announced. */}
          {games.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {games.map((game, index) => (
                <GameCard key={game.slug} game={game} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-night-line pt-8">
              <span className="label font-semibold text-accent">
                No titles announced
              </span>
              <p className="max-w-2xl text-lg leading-relaxed text-ivory/70">
                We would rather show one finished game than name three
                half-built ones, so this page stays empty until it should not be.
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/apps"
              className="group inline-flex items-center gap-2 text-base font-medium text-accent underline-offset-4 transition-colors hover:text-ivory hover:underline"
            >
              See the apps instead
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/client-work"
              className="group inline-flex items-center gap-2 text-base font-medium text-ivory/75 underline-offset-4 transition-colors hover:text-ivory hover:underline"
            >
              Client work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inkline is the only thing on this site a visitor can actually play, so
          this is where it belongs — while being clear that it is a web toy and
          not a title. Saying that plainly is more honest than leaving the page
          empty, and more useful than pretending it is a release. */}
      <section className="on-night border-b border-night-line bg-night-soft">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow tone="night">Something to play now</Eyebrow>
              <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-ivory md:text-3xl">
                Inkline — a small daily puzzle.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ivory/75">
                Not a title, and we are not pretending it is one. It is a web toy
                worth making: one board a day, seeded from the date, with no
                account and nothing stored anywhere but your own browser.
              </p>
            </div>
            <Link
              href="/play"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-night transition-colors hover:bg-ivory active:bg-ivory"
            >
              Play Inkline
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Questions welcome"
        title="Interested in the games side?"
        body="If you want to hear about a prototype when there is something playable, say hello. No promises about when — we will only reach out when it is real."
        primaryLabel="Get in touch"
        secondaryHref="/apps"
        secondaryLabel="Our apps"
      />

      <Footer />
    </div>
  );
}

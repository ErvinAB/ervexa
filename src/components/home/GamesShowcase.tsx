import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";
import LivingStag from "@/components/hero/LivingStag";
import GameCard from "@/components/site/GameCard";
import { games, gamesNote } from "@/lib/content/games";

export default function GamesShowcase() {
  return (
    <section
      id="games"
      className="on-night relative scroll-mt-24 overflow-hidden border-b border-night-line bg-night"
    >
      {/* Monogram used as a large graphic device so the dark band carries weight
          without any invented artwork. */}
      <div
        className="pointer-events-none absolute -right-24 top-16 hidden md:block"
        aria-hidden="true"
      >
        <LivingStag className="h-[26rem] w-auto" body="#141f18" eyeColor="#c5f277" />
      </div>

      <div className="reveal relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow tone="night">Games — exploratory</Eyebrow>
            {/* Section heading, not a second hero. The band's weight comes from
                the full-bleed night field, so the type stays subordinate to the
                one display statement above the fold. */}
            <h2 className="mt-6 text-3xl font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-ivory md:text-4xl">
              Games are not
              <br />
              the main line.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-ivory/75">
              {gamesNote}
            </p>
          </div>
        </div>

        {/* Real games render here once one is genuinely announced. */}
        {games.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game, index) => (
              <GameCard key={game.slug} game={game} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-night-line pt-6">
            <span className="label font-semibold text-accent">
              No titles announced
            </span>
            <p className="text-base leading-relaxed text-ivory/65">
              Nothing is shown here until it is worth playing.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/apps"
            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-night transition-colors hover:bg-ivory active:bg-ivory"
          >
            See the apps
          </Link>
          <Link
            href="/games"
            className="group inline-flex items-center gap-2 text-base font-medium text-ivory/75 underline-offset-4 transition-colors hover:text-ivory hover:underline"
          >
            More on games
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

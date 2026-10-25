import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import CTASection from "@/components/site/CTASection";
import Eyebrow from "@/components/site/Eyebrow";
import Inkline from "@/components/play/Inkline";

export const metadata: Metadata = {
  title: "Play",
  description:
    "Inkline — a small daily puzzle from Stagbyte. Rotate the pipes until the ink runs from the inkwell to the seal. No account, no server, no streak to lose.",
  alternates: { canonical: "/play" },
};

/**
 * Inkline's page.
 *
 * The game itself is a client component, but everything around it — the rules,
 * the honesty about what is and is not stored — is plain server-rendered text,
 * so a reader with no JavaScript still gets a real page rather than an empty box.
 */

const howItWorks = [
  {
    title: "Every board is solvable",
    body: "The generator builds a working network across the whole board first, and only then scrambles it by turning what is already known to work. A solvable arrangement therefore always exists — you are never handed a board that cannot be finished.",
  },
  {
    title: "One board a date",
    body: "The board is seeded from the date, so anyone who opens this page on the same day gets the same puzzle and the same par. It turns over at your own midnight, which means two people in different time zones can briefly disagree about what today is.",
  },
  {
    title: "Nothing leaves your browser",
    body: "There is no server behind this, no account and no scoreboard. Your progress is kept in this browser's local storage so a refresh does not punish you, and it is forgotten when you clear your data.",
  },
];

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Play"
        title="Inkline."
        description="One board a day. Turn the tiles until the ink runs from the inkwell to the seal. It is small, it is quiet, and it is the only thing on this site that needs JavaScript."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-xl">
              <Inkline />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Eyebrow>How to play</Eyebrow>
            <ul className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/80">
              <li className="border-t border-charcoal/15 pt-5">
                Click a tile, or focus it and press <strong>Enter</strong>, to turn
                it a quarter turn clockwise.
              </li>
              <li className="border-t border-charcoal/15 pt-5">
                Use the arrow keys to move around the board, <strong>Home</strong>{" "}
                and <strong>End</strong> to jump to the ends of a row. Every tile
                tells a screen reader its position and where its pipe points.
              </li>
              <li className="border-t border-charcoal/15 pt-5">
                The tile with the marked left edge is the inkwell; the tile with the
                marked corner is the seal. Ink only travels where two neighbouring
                pipes actually meet, so the green spreads as you connect.
              </li>
              <li className="border-t border-charcoal/15 pt-5">
                <strong>Par</strong> is the number of rotations it would have taken
                to restore the arrangement the board was built from. You can beat
                it — the extra pipes mean there is often a shorter route.
              </li>
            </ul>

            <div className="mt-10 border border-charcoal/20 bg-ivory-soft p-6">
              <p className="label font-semibold text-charcoal/70">
                Why it lives here
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal/80">
                It is here because it is finished. The games page says we would
                rather show one small thing that works than announce three that do
                not, and this is the small thing.{" "}
                <Link
                  href="/games"
                  className="font-medium text-forest underline-offset-4 hover:text-charcoal hover:underline"
                >
                  The games page
                </Link>{" "}
                still has nothing announced on it, and that is still accurate.
              </p>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-charcoal/70">
              The board is the one page here that cannot work without JavaScript —
              it is seeded from your date, which a prebuilt page cannot know.
              Everything else on this site is static HTML.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-ivory-soft">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Under the board</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
              The only part of the site that has rules.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              Everything else here is a page. This is a small system, and it is
              built the way we would build a product — with the parts we would have
              to maintain kept apart from the parts a reader looks at.
            </p>
          </div>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <li key={item.title} className="border-t border-charcoal/15 pt-6">
                <span className="label font-semibold text-forest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/apps"
              className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              What we are actually building
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Stay in touch"
        title="Want to know when the first app ships?"
        body="Leave your email and we will write once — when there is something real to try, not before."
        newsletter
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/notes"
        secondaryLabel="Read the build notes"
      />

      <Footer />
    </div>
  );
}

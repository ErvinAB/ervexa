import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LivingStag from "@/components/hero/LivingStag";
import Eyebrow from "@/components/site/Eyebrow";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <Header />

      <div className="paper-grain flex flex-1 items-center justify-center px-6 py-36">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>
          {/* The opening statement is the page's display step, same as every
              other route — there is nothing else on this page to out-shout. */}
          <h1 className="mt-7 text-6xl font-semibold leading-[1.05] tracking-tight text-charcoal">
            This page never shipped.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
            The page you were looking for is not here. It may have moved, or it
            may never have existed at all.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-ivory transition-colors hover:bg-charcoal active:bg-charcoal"
            >
              Back to the studio
            </Link>
            <Link
              href="/games"
              className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              See the games
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>

          <LivingStag className="mt-14 h-28 w-auto opacity-80" body="#26352b" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import {
  navigation,
  secondaryNavigation,
  socialLinks,
} from "@/lib/content/navigation";
import BrandMark from "@/components/site/BrandMark";
import NewsletterForm from "@/components/site/NewsletterForm";
import FooterStag from "@/components/site/FooterStag";

export default function Footer() {
  return (
    <footer className="on-night relative border-t border-night-line bg-night text-ivory">
      <FooterStag />
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-ivory transition-colors hover:text-accent"
            >
              <BrandMark variant="icon" className="logo-wiggle h-9 w-auto origin-bottom" />
              <span className="font-display text-lg font-bold uppercase tracking-[0.02em]">
                Stagbyte
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ivory/70">
              An independent, product-led studio making small apps that solve one
              everyday problem properly.
            </p>

            <div className="mt-7 max-w-sm">
              <p className="label font-semibold text-ivory/70">
                When the first app ships
              </p>
              <NewsletterForm className="mt-4" />
            </div>
          </div>

          <div>
            <p className="label font-semibold text-ivory/55">Explore</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label font-semibold text-ivory/55">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {secondaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ivory/75 transition-colors hover:text-ivory"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.linkedinCompany}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ivory/75 transition-colors hover:text-ivory"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/*
         * Colophon. Every claim here is checkable against the repository: four
         * entries in `dependencies`, no analytics package, and every content
         * route prerendered statically. It is the driest possible way to say
         * "built properly" and it cannot go stale quietly.
         */}
        <div className="mt-12 border-t border-night-line pt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-ivory/70">
            <span className="label mr-3 font-semibold text-ivory/75">
              Colophon
            </span>
            Set in Sora and Inter, rendered to static HTML. Four
            production dependencies, no trackers, no cookies and therefore no
            consent banner. Independent since 2025, in Skopje.
          </p>

          <p className="label mt-6 text-ivory/60">
            &copy; {new Date().getFullYear()} Stagbyte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

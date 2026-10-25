import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";
import AppCard from "@/components/site/AppCard";
import { apps, firstAppStatus } from "@/lib/content/apps";

/**
 * Proof — what is actually happening, immediately after the hero.
 *
 * Replaces the old stat panel, which stated the status in a second place and
 * said "no releases yet" under a heading that claimed the app was in production.
 * Every claim here comes from `firstAppStatus`, so there is one source of truth.
 *
 * There is deliberately no screenshot yet: a made-up mockup for software that
 * does not exist is exactly the kind of placeholder the studio refuses to show.
 * When a real work-in-progress screen exists, set `firstAppStatus.image` and it
 * renders above the status panel at its native aspect ratio.
 */
export default function Proof() {
  const { image } = firstAppStatus;

  return (
    <section id="apps" className="scroll-mt-24 border-b border-charcoal/10">
      <div className="reveal mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{firstAppStatus.label}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
              There is one app, and it is not finished.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">
              {firstAppStatus.detail}
            </p>

            <p className="label mt-8 text-charcoal/70">
              Last update {firstAppStatus.lastUpdate} · Next note{" "}
              {firstAppStatus.nextNote}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/notes"
                className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                Read the build notes
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/apps"
                className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                More on the apps
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            {image && (
              <figure className="mb-6">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full border border-charcoal/20"
                />
              </figure>
            )}

            <div className="border border-charcoal/20 bg-ivory-soft p-8">
              <dl>
                <div>
                  <dt className="label text-charcoal/70">Status</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight text-charcoal">
                    {firstAppStatus.headline}
                  </dd>
                </div>
                <div className="mt-5 border-t border-charcoal/15 pt-5">
                  <dt className="label text-charcoal/70">Release</dt>
                  <dd className="mt-2 text-base text-charcoal">
                    {firstAppStatus.release}
                  </dd>
                </div>
                <div className="mt-5 border-t border-charcoal/15 pt-5">
                  <dt className="label text-charcoal/70">Last update</dt>
                  <dd className="mt-2 text-base text-charcoal">
                    {firstAppStatus.lastUpdate}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Real apps render here as a grid once they genuinely ship. */}
        {apps.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

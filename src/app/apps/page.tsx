import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import AppCard from "@/components/site/AppCard";
import CTASection from "@/components/site/CTASection";
import Eyebrow from "@/components/site/Eyebrow";
import StatusPill from "@/components/site/StatusPill";
import {
  apps,
  appsNote,
  catalogueNumber,
  catalogueSlots,
  firstAppStatus,
} from "@/lib/content/apps";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Stagbyte builds its own small apps — focused tools that solve one everyday problem properly. The first app is in development; nothing is listed until it is real.",
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Apps"
        title="Our own small apps, built one at a time."
        description="This is what the studio is for. We pick a problem worth solving, build the smallest app that solves it properly, and ship it — rather than announcing a roadmap we cannot keep."
      />

      {/* Status is read from the one place it is written down, so this page can
          never disagree with the homepage or the page metadata. */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Eyebrow>{firstAppStatus.label}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
              {firstAppStatus.headline}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">
              {appsNote}
            </p>
            <p className="label mt-8 text-charcoal/70">
              Last update {firstAppStatus.lastUpdate} · Next note{" "}
              {firstAppStatus.nextNote}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-charcoal/20 bg-ivory-soft p-8">
              <dl>
                <div>
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
              <Link
                href="/notes"
                className="group mt-7 inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                Read the build notes
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
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
      </section>

      {/*
       * The shelf. Numbering turns a catalogue of one into a body of work, and
       * a reserved slot is honest in a way an empty space is not: it says the
       * slot exists without inventing what goes in it. This is the one place
       * the `hatch` texture is used, because it means "reserved" and nothing
       * else — anywhere else it would just be decoration.
       */}
      <section className="border-y border-charcoal/10 bg-ivory-soft">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow>The shelf</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
              Numbers are reserved before the apps exist.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              A catalogue of one is still a catalogue. Booking the numbers now
              gives the next app somewhere to land, and it means nothing on this
              page had to be made up to fill the space.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {catalogueSlots.map((slot) => {
              const live = slot.status === "in-development";

              return (
                <li
                  key={slot.number}
                  className="card-pop flex flex-col rounded-[1.75rem] border border-charcoal/20 bg-ivory-soft p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <StatusPill label={slot.label} pulse={live} />
                  </div>

                  <div
                    className={`relative mt-5 flex h-28 items-center justify-center overflow-hidden border ${
                      live
                        ? "border-forest bg-forest text-ivory"
                        : "border-charcoal/15 bg-ivory-soft text-charcoal/70"
                    }`}
                  >
                    {!live && (
                      <span
                        className="hatch absolute inset-0 text-charcoal/20"
                        aria-hidden="true"
                      />
                    )}
                    <span className="label relative font-semibold">
                      {catalogueNumber(slot.number)}
                    </span>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-charcoal/75">
                    {slot.note}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <Link
          href="/client-work"
          className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
        >
          We also take on selective client work
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>

      <CTASection
        eyebrow="Stay in touch"
        title="Want to know when it ships?"
        body="Leave your email and we will write once — when there is something real to try, not before."
        newsletter
        primaryLabel="Get in touch"
        secondaryHref="/games"
        secondaryLabel="What about games?"
      />

      <Footer />
    </div>
  );
}

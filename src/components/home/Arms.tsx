import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";

// One qualifier per arm, maximum. The apologising is done by the labels.
const secondaryArms = [
  {
    number: "02",
    title: "Games",
    href: "/games",
    body: "Prototypes we make for the pleasure of making them, shown only once one is worth playing.",
    meta: "Exploratory",
  },
  {
    number: "03",
    title: "Client work",
    href: "/client-work",
    body: "A small number of engagements a year, when a team needs a product built properly rather than another agency.",
    meta: "Selective",
  },
];

export default function Arms() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-charcoal/10">
      <div className="reveal mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
            Products first. The rest is smaller.
          </h2>
        </div>

        {/* Lead arm — our own apps, given the visual weight to match its priority */}
        <Link
          href="/apps"
          className="card-pop group mt-12 flex flex-col justify-between gap-8 rounded-[2rem] bg-forest p-8 text-ivory hover:bg-forest-soft md:p-12 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              {/* accent-soft, not accent: the brand tan on forest measures
                  4.34:1 and fails AA at 13px. The lighter tan on the same
                  green measures 5.76:1 and keeps the marker warm. */}
              <span className="label font-semibold text-ivory/60">01</span>
              <ArrowUpRight
                className="h-4 w-4 text-ivory/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ivory"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-6 text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              Apps
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/80">
              Our own small apps. This is what the studio is for — one focused
              tool at a time, built properly and shipped.
            </p>
          </div>

          <p className="label shrink-0 text-ivory/90">Our products · the focus</p>
        </Link>

        {/* Secondary arms */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {secondaryArms.map((arm) => (
            <Link
              key={arm.title}
              href={arm.href}
              className="card-pop group flex flex-col justify-between rounded-[2rem] border border-charcoal/15 bg-ivory-soft p-8 hover:border-forest/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="label font-semibold text-forest">
                    {arm.number}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-charcoal/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold uppercase tracking-tight text-charcoal">
                  {arm.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-charcoal/75">
                  {arm.body}
                </p>
              </div>

              <p className="label mt-8 text-charcoal/70">{arm.meta}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

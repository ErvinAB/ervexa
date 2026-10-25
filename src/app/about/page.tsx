import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import CTASection from "@/components/site/CTASection";
import Eyebrow from "@/components/site/Eyebrow";
import { contactDetails, socialLinks } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Stagbyte is an independent, product-led studio building its own small apps. Games are exploratory and client work is selective. Founded by Ervin Abedin in Skopje.",
  alternates: { canonical: "/about" },
};

const focusAreas = [
  "Our own small apps",
  "Product and interface design",
  "Mobile app development",
  "Desktop and web apps",
  "Prototypes and MVPs",
  "Selective client work",
];

const making = [
  {
    title: "Apps",
    status: "The focus",
    body: "Our own small apps. This is what the studio exists to do, and where our time goes first.",
  },
  {
    title: "Games",
    status: "Exploratory",
    body: "Prototyped privately and talked about only when something is worth playing. Not our main line.",
  },
  {
    title: "Client work",
    status: "Selective",
    body: "A small number of engagements a year, taken on when the fit is genuinely right.",
  },
];

const stack = [
  "TypeScript",
  "Next.js",
  "React Native",
  "Swift",
  "Kotlin",
  "PostgreSQL",
  "Docker",
  "Unity",
  "Godot",
  "Blender",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Studio"
        title="A product studio that builds its own apps."
        description="Stagbyte is independent and deliberately small. We make our own apps first, treat games as an experiment, and take on client work only when it is a real fit."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>The studio</Eyebrow>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-charcoal/80">
              <p>
                Stagbyte is an independent, product-led software studio founded
                by Ervin Abedin. Our own small apps come first — picking one
                real problem, solving it properly, and shipping it.
              </p>
              <p>
                The studio is based in Skopje, North Macedonia, and works with
                clients remotely. Being small is the point: the people who scope
                the work are the people who build, release and support it.
              </p>
              <p>
                We would rather ship one finished app than announce ten, and we
                would rather turn down a project we cannot do well than take it
                and hope. That is the whole philosophy, and it is why client work
                stays selective and games stay an experiment.
              </p>
            </div>

            <div className="mt-11">
              <Eyebrow>Tooling</Eyebrow>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="label rounded border border-charcoal/20 bg-ivory-soft px-2 py-1 text-charcoal/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-charcoal/15 bg-ivory-soft p-8">
              {/* A real h2, not a styled <p>: the three items below are h3, and
                  an h1 -> h3 jump breaks the heading outline for screen
                  readers. The label styling is unchanged. */}
              <h2 className="label font-semibold text-charcoal/70">
                What we make
              </h2>
              <ul className="mt-6 space-y-6">
                {making.map((item) => (
                  <li key={item.title} className="border-t border-charcoal/15 pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-semibold text-charcoal">
                        {item.title}
                      </h3>
                      <span className="label font-semibold text-forest">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-charcoal/75">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/apps"
                className="group mt-7 inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                See the apps
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-6 border border-charcoal/15 bg-ivory-soft p-8">
              <p className="label font-semibold text-charcoal/70">Focus</p>
              <ul className="mt-5 space-y-2.5">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-2 text-base leading-relaxed text-charcoal/75"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-forest/70"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border border-charcoal/15 bg-ivory-soft p-8">
              <p className="label font-semibold text-charcoal/70">Connect</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedinCompany}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
                  >
                    <Linkedin className="h-4 w-4" /> Stagbyte on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
                  >
                    <Linkedin className="h-4 w-4" /> Ervin on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
                  >
                    <Mail className="h-4 w-4" /> {socialLinks.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-base text-charcoal/75">
                  <MapPin className="h-4 w-4" /> {contactDetails.location}
                </li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-charcoal/70">
                {contactDetails.availability}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Get in touch"
        title="Want to hear when the first app ships?"
        body="Tell us what you would want it to solve. If you have a project you think is a fit for selective client work, say so and we will be straight with you about it."
        secondaryHref="/client-work"
        secondaryLabel="Selective client work"
      />

      <Footer />
    </div>
  );
}

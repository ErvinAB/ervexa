import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/site/Eyebrow";
import StatusPill from "@/components/site/StatusPill";
import CTASection from "@/components/site/CTASection";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schemas";
import {
  apps,
  appStatusLabel,
  catalogueNumber,
  getApp,
} from "@/lib/content/apps";
import { getNote, type Note } from "@/lib/content/notes";

interface AppPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * An app's own front door.
 *
 * Designed as if it will one day be its own domain, because that is where this
 * ends up: the studio site is the parent record, and each app graduates out of
 * it. While `apps` is empty this route never renders — `getApp` misses, and
 * `notFound()` returns the site's real 404 instead of an empty product page.
 */
export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    return { title: "App not found" };
  }

  return {
    title: app.name,
    description: app.tagline,
    openGraph: {
      title: `${app.name} — Stagbyte`,
      description: app.tagline,
      type: "website",
      url: `/apps/${app.slug}`,
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    notFound();
  }

  // Build notes are looked up, not duplicated, so an entry never drifts from
  // the app it describes. Unknown slugs are simply skipped.
  const appNotes = app.noteSlugs
    .map((noteSlug) => getNote(noteSlug))
    .filter((note): note is Note => note !== undefined);

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <JsonLd data={softwareApplicationSchema(app)} />
      <Header />

      {/* Hero — name, the one-line problem, status, platform and price. */}
      <section className="paper-grain border-b border-charcoal/10">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="label font-semibold text-forest">
              {catalogueNumber(app.number)}
            </span>
            <StatusPill
              label={appStatusLabel[app.status]}
              pulse={app.status === "in-development"}
            />
          </div>

          <h1 className="mt-7 max-w-4xl text-6xl font-semibold leading-[1.02] tracking-[-0.02em] text-charcoal">
            {app.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/75 md:text-xl">
            {app.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            {app.download ? (
              <a
                href={app.download.href}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-ivory transition-colors hover:bg-charcoal active:bg-charcoal"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {app.download.label}
              </a>
            ) : (
              // No download button until there is something to download.
              <span className="label border border-charcoal/25 px-4 py-3 text-charcoal/70">
                Not yet available
              </span>
            )}
          </div>

          <dl className="mt-10 grid gap-6 border-t border-charcoal/10 pt-8 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <dt className="label text-charcoal/70">Status</dt>
              <dd className="text-base text-charcoal">
                {appStatusLabel[app.status]}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="label text-charcoal/70">Platforms</dt>
              <dd className="text-base text-charcoal">
                {app.platforms.join(" · ")}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="label text-charcoal/70">Price</dt>
              <dd className="text-base text-charcoal">{app.price}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* What it does. */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>What it does</Eyebrow>
            <h2 className="mt-6 text-2xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-3xl">
              One problem, solved properly.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-charcoal/80">
              {app.description}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {app.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 border-t border-charcoal/15 pt-4 text-base leading-relaxed text-charcoal/75"
                >
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-forest/70"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Screenshots — only real screens of the real app, at native ratio. */}
      {app.screenshots.length > 0 && (
        <section className="border-y border-charcoal/10 bg-ivory-soft">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <Eyebrow>Screens</Eyebrow>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {app.screenshots.map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="w-full border border-charcoal/20"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What it does not do — the section most product pages omit. */}
      <section className="border-y border-charcoal/10 bg-ivory-soft">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>What it does not do</Eyebrow>
            <h2 className="mt-6 text-2xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-3xl">
              Most app pages lie by omission.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">
              So here is the other half of the list, up front. If one of these
              is something you need, this is not the app for you — better to
              know now.
            </p>
          </div>

          <ul className="grid gap-8 self-start lg:col-span-7">
            {app.doesNot.map((item, index) => (
              <li
                key={item}
                className="flex gap-6 border-t border-charcoal/15 pt-6"
              >
                <span className="label font-semibold text-charcoal/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-charcoal/75">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Build notes for this app. */}
      {appNotes.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <Eyebrow>Build notes</Eyebrow>
          <h2 className="mt-6 text-2xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-3xl">
            How it got this way.
          </h2>

          <ol className="mt-10 border-t border-charcoal/15">
            {appNotes.map((note) => (
              <li key={note.slug} className="border-b border-charcoal/15">
                <Link
                  href={`/notes/${note.slug}`}
                  className="group grid gap-3 py-6 md:grid-cols-12 md:gap-8"
                >
                  <span className="label font-semibold text-forest md:col-span-2">
                    N&deg;{note.number}
                  </span>
                  <span className="md:col-span-9">
                    <span className="block text-xl font-semibold tracking-tight text-charcoal transition-colors group-hover:text-forest">
                      {note.title}
                    </span>
                    <span className="mt-2 block text-base leading-relaxed text-charcoal/75">
                      {note.summary}
                    </span>
                  </span>
                  <span className="hidden justify-end md:col-span-1 md:flex">
                    <ArrowUpRight className="h-5 w-5 text-charcoal/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Support — a real address, and a real promise about answering it. */}
      <section className="border-t border-charcoal/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>Support</Eyebrow>
            <h2 className="mt-6 text-2xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-3xl">
              A person answers this.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-charcoal/80">
              {app.support.response}
            </p>
            <a
              href={`mailto:${app.support.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {app.support.email}
            </a>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Stay in touch"
        title={`Want to know when ${app.name} ships?`}
        body="Leave your email and we will write once — when there is something real to try, not before."
        newsletter
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/apps"
        secondaryLabel="All apps"
      />

      <Footer />
    </div>
  );
}

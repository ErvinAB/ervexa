import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import CTASection from "@/components/site/CTASection";
import { notes } from "@/lib/content/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "The Stagbyte build log — numbered, dated notes on how the studio's own apps are made, and on the decisions behind the site itself.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Notes"
        title="A build log, not a blog."
        description="What we are building and why it looks the way it does. Numbered and dated, so it is obvious when we have gone quiet — we would rather publish nothing than publish filler."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <ol className="border-t border-charcoal/15">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-charcoal/15">
              <Link
                href={`/notes/${note.slug}`}
                className="group grid gap-4 rounded-3xl px-0 py-8 transition-[background-color,padding] duration-300 hover:bg-ivory-soft md:grid-cols-12 md:gap-8 md:hover:px-6"
              >
                <div className="md:col-span-2">
                  <span className="label font-semibold text-forest">
                    N&deg;{note.number}
                  </span>
                  <span className="label mt-2 block text-charcoal/70">
                    {note.date}
                  </span>
                </div>

                <div className="md:col-span-9">
                  <h2 className="text-2xl font-semibold leading-[1.15] tracking-tight text-charcoal transition-colors group-hover:text-forest md:text-3xl">
                    {note.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/75">
                    {note.summary}
                  </p>
                </div>

                <div className="hidden justify-end md:col-span-1 md:flex">
                  <ArrowUpRight className="h-5 w-5 text-charcoal/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <CTASection
        eyebrow="Stay in touch"
        title="Want to know when the next note lands?"
        body="Leave your email and we will write when there is something worth reading or something real to try — not on a schedule."
        newsletter
        primaryLabel="Get in touch"
      />

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/site/Eyebrow";
import JsonLd from "@/components/JsonLd";
import { getNote, notes } from "@/lib/content/notes";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  return {
    title: `${note.number} — ${note.title}`,
    description: note.summary,
    openGraph: {
      title: `${note.number} — ${note.title}`,
      description: note.summary,
      type: "article",
      publishedTime: note.date,
      // Declaring `openGraph` on a page REPLACES the inherited one rather than
      // merging into it, so the layout's image has to be restated here or every
      // note would share a social card with no image at all.
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    alternates: { canonical: `/notes/${note.slug}` },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${note.number} — ${note.title}`,
    description: note.summary,
    datePublished: note.date,
    author: {
      "@type": "Organization",
      name: "Stagbyte",
      url: "https://stagbyte.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Stagbyte",
      url: "https://stagbyte.com",
    },
    mainEntityOfPage: `https://stagbyte.com/notes/${note.slug}`,
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <JsonLd data={articleSchema} />
      <Header />

      <article>
        <header className="paper-grain border-b border-charcoal/10">
          <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-16 md:pt-36">
            <Eyebrow>
              N&deg;{note.number} · {note.date}
            </Eyebrow>
            <h1 className="mt-7 max-w-4xl text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-charcoal">
              {note.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-20">
          <div className="space-y-6 text-lg leading-relaxed text-charcoal/85">
            {note.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-14 border-t border-charcoal/15 pt-8">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              <span
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              >
                &larr;
              </span>
              All notes
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { insights } from "@/lib/content/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((a) => a.slug === slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = insights.find((a) => a.slug === slug);
  if (!insight) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
        <div className="border-b border-zinc-800/50">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <div className="mb-4">
              <Link
                href="/insights"
                className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                &larr; Back to insights
              </Link>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
              {insight.title}
            </h1>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              {insight.summary}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12">
          {insight.status !== "published" ? (
            <div className="rounded-lg border border-zinc-800/30 bg-zinc-900/10 p-8 text-center">
              <p className="text-sm text-zinc-500">This article is in {insight.status} status.</p>
              <p className="mt-1 text-xs text-zinc-500">
                It will be published once the draft is completed and reviewed.
              </p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-zinc-400">Content coming soon.</p>
            </div>
          )}
        </div>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { insights } from "@/lib/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles on test automation, agentic systems, data pipelines, workflow orchestration, and automation engineering practices by Stagbyte.",
};

export default function InsightsPage() {
  const published = insights.filter(i => i.status === "published");
  const upcoming = insights.filter(i => i.status !== "published");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Insights"
        title="Articles and technical writing"
        description="Practical writing on test automation, agentic systems, data pipelines, workflow orchestration, and engineering practices."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {published.length === 0 ? (
          <AnimateInView>
            <div className="rounded-lg border border-zinc-800/30 bg-zinc-900/10 p-10 text-center">
              <p className="text-sm text-zinc-400">Articles are being written.</p>
              <p className="mt-2 text-xs text-zinc-500 max-w-md mx-auto">
                Technical content on test automation, agentic systems, data pipelines,
                and workflow orchestration is in development.
              </p>
            </div>
          </AnimateInView>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {published.map((insight, i) => (
              <AnimateInView key={insight.slug} delay={i * 0.08}>
                <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                  <div className="mb-3">
                    <StatusBadge status={insight.status} />
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors">
                    {insight.title}
                  </h2>
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                    {insight.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {insight.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded bg-zinc-800/40 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        )}

        {/* Upcoming articles */}
        {upcoming.length > 0 && (
          <AnimateInView>
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-zinc-700/50" />
                <h2 className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Upcoming articles</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {upcoming.map((insight, i) => (
                  <AnimateInView key={insight.slug} delay={i * 0.06}>
                    <div className="group rounded border border-zinc-800/20 bg-zinc-900/5 px-4 py-3 transition-colors hover:border-zinc-700/30 hover:bg-zinc-900/10">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={insight.status} />
                      </div>
                      <p className="mt-2 text-xs text-zinc-500">{insight.title}</p>
                    </div>
                  </AnimateInView>
                ))}
              </div>
            </div>
          </AnimateInView>
        )}
      </div>

      <Footer />
    </div>
  );
}

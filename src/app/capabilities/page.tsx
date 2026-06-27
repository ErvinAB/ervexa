import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import ServiceWizard from "@/components/ServiceWizard";
import { capabilities } from "@/lib/content/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Test Automation Engineering, Agentic Automation, Workflow Orchestration, Data Pipelines, and Custom Automation Engineering by Stagbyte.",
};

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Capabilities"
        title="What Stagbyte builds"
        description="Stagbyte engineers automation across five disciplines: test automation, agentic systems, workflow orchestration, data pipelines, and custom automation tooling."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-20">
          {capabilities.map((cap, i) => (
            <AnimateInView key={cap.id} delay={i * 0.1}>
              <section id={cap.id}>
                <div className="grid gap-8 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-6 bg-cyan-500/50" />
                      <p className="font-mono text-xs text-cyan-500 uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-zinc-100 md:text-2xl">
                      {cap.title}
                    </h2>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                      {cap.description}
                    </p>
                    {cap.workflow && (
                      <p className="mt-4 text-xs text-zinc-500 italic leading-relaxed border-l-2 border-zinc-800 pl-4">
                        {cap.workflow}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-3">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="group rounded-lg border border-zinc-800/30 bg-zinc-900/10 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/20">
                        <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                          What it covers
                        </p>
                        <ul className="space-y-1.5">
                          {cap.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 font-mono text-[11px] text-zinc-500"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="group rounded-lg border border-zinc-800/30 bg-zinc-900/10 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/20">
                        <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cap.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-zinc-800/50 bg-zinc-900/30 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimateInView>
          ))}
        </div>
      </div>

      {/* Service wizard */}
      <AnimateInView>
        <section className="border-t border-zinc-800/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-cyan-500/50" />
              <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">Not sure where to start?</p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl max-w-2xl mb-6">
              Tell us what you need
            </h2>
            <div className="max-w-xl">
              <ServiceWizard />
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* CTA */}
      <AnimateInView>
        <section className="border-t border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-10 md:p-12">
              <h2 className="text-lg font-bold text-zinc-100">
                Need a specific capability?
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Not every automation problem fits predefined categories. Stagbyte evaluates
                each situation and recommends the right approach.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Discuss your project <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimateInView>

      <Footer />
    </div>
  );
}

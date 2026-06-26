import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Terminal, ChevronLeft, ChevronRight, BarChart3, GitBranch, Bug, Gauge } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import StatusBadge from "@/components/StatusBadge";
import WorkflowSteps from "@/components/WorkflowSteps";
import PipelineDiagram from "@/components/PipelineDiagram";
import CodeBlock from "@/components/CodeBlock";
import TechIcon from "@/components/TechIcon";
import JsonLd from "@/components/JsonLd";
import { projectSchema } from "@/lib/schemas";
import { projects } from "@/lib/content/projects";
import { capabilities } from "@/lib/content/capabilities";

interface Props {
  params: Promise<{ slug: string }>;
}

const impactMetrics: Record<string, { label: string; value: string; icon: "bug" | "gauge" | "branch" | "chart" }[]> = {
  "locator-agent": [
    { label: "Maintenance reduction", value: "60%", icon: "bug" },
    { label: "Locator resolution rate", value: "85%", icon: "gauge" },
    { label: "Vector DB entries", value: "5K+", icon: "branch" },
  ],
  "test-analyzer-agent": [
    { label: "Classification accuracy", value: "92%", icon: "bug" },
    { label: "Triage time reduction", value: "70%", icon: "gauge" },
    { label: "Categories", value: "6", icon: "branch" },
  ],
  "k6-performance-pipeline": [
    { label: "Test types", value: "5", icon: "gauge" },
    { label: "SLO validation", value: "Real-time", icon: "chart" },
    { label: "CI integration", value: "Automated", icon: "branch" },
  ],
  "predictive-testing-agent": [
    { label: "Suite size reduction", value: "65%", icon: "chart" },
    { label: "Failure detection", value: "94%", icon: "bug" },
    { label: "Model retrain", value: "Continuous", icon: "branch" },
  ],
  "swarm-qa-framework": [
    { label: "Agent types", value: "10", icon: "bug" },
    { label: "Suite types", value: "5", icon: "gauge" },
    { label: "Local models", value: "Ollama", icon: "branch" },
  ],
  "data-reliability-suite": [
    { label: "Validation stages", value: "9", icon: "chart" },
    { label: "Contract checks", value: "Declarative", icon: "gauge" },
    { label: "Metrics export", value: "Prometheus", icon: "branch" },
  ],
  "job-application-automation": [
    { label: "Pipeline steps", value: "11", icon: "branch" },
    { label: "Approval gates", value: "Human", icon: "bug" },
    { label: "Output formats", value: "DOCX + PDF", icon: "branch" },
  ],
};

const metricIcons = {
  bug: Bug,
  gauge: Gauge,
  branch: GitBranch,
  chart: BarChart3,
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedCaps = capabilities.filter((c) =>
    project.relatedCapabilities.includes(c.id)
  );

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const metrics = impactMetrics[slug] || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <JsonLd data={projectSchema(project)} />

      {/* Hero */}
      <section className="relative border-b border-zinc-800/50 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ChevronLeft className="h-3 w-3" /> Back to projects
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4 kinetic-word" style={{ animationDelay: "0.1s" }}>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 md:text-5xl lg:text-6xl leading-[1.05] kinetic-word" style={{ animationDelay: "0.2s" }}>
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed md:text-lg kinetic-word" style={{ animationDelay: "0.35s" }}>
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 kinetic-word" style={{ animationDelay: "0.5s" }}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
              >
                <Github className="h-3.5 w-3.5" /> Repository
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Impact metrics */}
        {metrics.length > 0 && (
          <AnimateInView>
            <div className="mb-16 grid gap-4 sm:grid-cols-3">
              {metrics.map((m) => {
                const Icon = metricIcons[m.icon as keyof typeof metricIcons] || BarChart3;
                return (
                  <div key={m.label} className="group rounded-lg border border-zinc-800/40 bg-zinc-900/10 p-6 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/20">
                    <Icon className="h-4 w-4 text-cyan-600 mb-3" />
                    <p className="text-2xl font-bold text-zinc-100">{m.value}</p>
                    <p className="mt-1 text-xs text-zinc-500">{m.label}</p>
                  </div>
                );
              })}
            </div>
          </AnimateInView>
        )}

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-12">
            {/* About */}
            <AnimateInView>
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6 bg-cyan-500/50" />
                  <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">About</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </section>
            </AnimateInView>

            {/* Problem */}
            <AnimateInView>
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6 bg-cyan-500/50" />
                  <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Problem</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.problem}
                </p>
              </section>
            </AnimateInView>

            {/* Architecture */}
            {project.architecture && (
              <AnimateInView>
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-cyan-500/50" />
                    <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Architecture</h2>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.architecture}
                  </p>
                </section>
              </AnimateInView>
            )}

            {/* Pipeline Diagram */}
            {project.pipelineDiagram && (
              <AnimateInView>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-6 bg-cyan-500/50" />
                    <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Pipeline</h2>
                  </div>
                  <PipelineDiagram
                    steps={project.pipelineDiagram}
                    title={`${project.slug.replace(/-/g, "_").toUpperCase()}_PIPELINE`}
                  />
                </section>
              </AnimateInView>
            )}

            {/* Workflow */}
            <AnimateInView>
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-cyan-500/50" />
                  <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Workflow</h2>
                </div>
                <WorkflowSteps steps={project.workflow} />
              </section>
            </AnimateInView>

            {/* Code Snippets */}
            {project.codeSnippets && project.codeSnippets.length > 0 && (
              <AnimateInView>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-6 bg-cyan-500/50" />
                    <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Code</h2>
                  </div>
                  <div className="space-y-4">
                    {project.codeSnippets.map((snippet, i) => (
                      <CodeBlock
                        key={i}
                        title={snippet.title}
                        language={snippet.language}
                        code={snippet.code}
                      />
                    ))}
                  </div>
                </section>
              </AnimateInView>
            )}

            {/* Quick Start */}
            {project.quickStart && (
              <AnimateInView>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-6 bg-cyan-500/50" />
                    <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Quick start</h2>
                  </div>
                  <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/30">
                    <div className="mb-3 flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                        Terminal
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {project.quickStart.map((cmd, i) => (
                        <div
                          key={i}
                          className="font-mono text-[11px] text-zinc-400 leading-relaxed"
                        >
                          {cmd}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </AnimateInView>
            )}

            {/* Features / Limitations */}
            <div className="grid gap-8 sm:grid-cols-2">
              <AnimateInView>
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-emerald-500/50" />
                    <h2 className="font-mono text-xs text-emerald-500 uppercase tracking-widest">Current functionality</h2>
                  </div>
                  <ul className="space-y-1.5">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 font-mono text-[11px] text-zinc-500"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-800/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimateInView>

              <AnimateInView delay={0.1}>
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-zinc-700/50" />
                    <h2 className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Limitations</h2>
                  </div>
                  <ul className="space-y-1.5">
                    {project.limitations.map((l) => (
                      <li
                        key={l}
                        className="flex items-start gap-2 font-mono text-[11px] text-zinc-500"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimateInView>
            </div>

            {/* Improvements */}
            <AnimateInView>
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6 bg-cyan-500/50" />
                  <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Planned improvements</h2>
                </div>
                <ul className="space-y-1.5">
                  {project.improvements.map((imp) => (
                    <li
                      key={imp}
                      className="flex items-start gap-2 font-mono text-[11px] text-zinc-500"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-800/50" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </section>
            </AnimateInView>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <AnimateInView delay={0.15}>
              <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/30">
                <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  Technology
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 rounded border border-zinc-800/50 bg-zinc-900/30 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                    >
                      <TechIcon name={tech} className="h-2.5 w-2.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateInView>

            {relatedCaps.length > 0 && (
              <AnimateInView delay={0.2}>
                <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/30">
                  <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                    Related capabilities
                  </p>
                  <ul className="space-y-1.5">
                    {relatedCaps.map((cap) => (
                      <li key={cap.id}>
                        <Link
                          href={`/capabilities#${cap.id}`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-cyan-400 transition-colors"
                        >
                          <ArrowUpRight className="h-2.5 w-2.5" /> {cap.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
            )}

            <AnimateInView delay={0.25}>
              <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/30">
                <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  Status
                </p>
                <StatusBadge status={project.status} />
                <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
                  {project.status === "experimental" &&
                    "This project is an active experimental framework. It is not production-ready and should be evaluated for your specific use case."}
                  {project.status === "in-development" &&
                    "This project is currently in development. Core functionality is being built and tested."}
                  {project.status === "active" &&
                    "This project is actively maintained and in use."}
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>

        {/* Prev/Next navigation */}
        {(prevProject || nextProject) && (
          <AnimateInView>
            <nav className="mt-20 border-t border-zinc-800/30 pt-10">
              <div className="flex items-center justify-between">
                <div>
                  {prevProject && (
                    <Link
                      href={`/projects/${prevProject.slug}`}
                      className="group inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      <ChevronLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                      <div className="text-right">
                        <p className="text-[10px] text-zinc-600">Previous</p>
                        <p className="text-xs text-zinc-400 group-hover:text-zinc-100 transition-colors">{prevProject.title}</p>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {nextProject && (
                    <Link
                      href={`/projects/${nextProject.slug}`}
                      className="group inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      <div>
                        <p className="text-[10px] text-zinc-600">Next</p>
                        <p className="text-xs text-zinc-400 group-hover:text-zinc-100 transition-colors">{nextProject.title}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </AnimateInView>
        )}
      </div>

      {/* CTA */}
      <AnimateInView>
        <section className="border-t border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-10 md:p-12">
              <h2 className="text-lg font-bold text-zinc-100">
                Interested in this project?
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Stagbyte builds practical automation systems. If this project aligns with
                a problem you are solving, reach out to discuss how it can be adapted or
                extended.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Start the conversation <ArrowUpRight className="h-3 w-3" />
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

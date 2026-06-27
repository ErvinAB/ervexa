import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, TestTube, Bot, Workflow, Code2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import AnimateInView from "@/components/AnimateInView";
import ProjectCard from "@/components/ProjectCard";
import CapabilityCard from "@/components/CapabilityCard";
import HeroTerminal from "@/components/HeroTerminal";
import PipelineInteractive from "@/components/PipelineInteractive";
import JsonLd from "@/components/JsonLd";
import TechIcon from "@/components/TechIcon";
import { projects } from "@/lib/content/projects";
import { capabilities } from "@/lib/content/capabilities";
import { technologies } from "@/lib/content/technologies";
import { socialLinks } from "@/lib/content/navigation";
import { organizationSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Stagbyte — Automation Engineering",
  description:
    "Test automation, agentic systems, workflow orchestration, data pipelines, and custom automation engineering. Stagbyte automates engineering processes so teams ship faster with confidence.",
};

const heroWords = ["Automation", "engineering,", "done", "right."];

const metrics = [
  { value: "7+", label: "Years engineering automation", icon: Code2 },
  { value: "5", label: "Automation disciplines", icon: Workflow },
  { value: "15+", label: "Languages & frameworks", icon: TestTube },
  { value: "50K+", label: "Tests automated", icon: Bot },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <JsonLd data={organizationSchema} />
      <Header />
      <SectionNav />

      {/* Hero */}
      <section id="hero" className="relative border-b border-zinc-800/50 grid-pattern overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
          <div className="flex items-start gap-16">
            <div className="max-w-3xl flex-1">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-900/40 bg-cyan-950/15 px-3 py-1.5 glow-cyan">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
                </span>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.15em]">
                  Automation Engineering
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl text-zinc-100 leading-[1.05]">
                {heroWords.map((word, i) => (
                  <span
                    key={word}
                    className="kinetic-word"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    {i === 2 ? (
                      <span className="text-cyan-400">{word} </span>
                    ) : (
                      <>{word} </>
                    )}
                  </span>
                ))}
              </h1>

              <p className="mt-8 max-w-xl text-base text-zinc-400 leading-relaxed md:text-lg kinetic-word" style={{ animationDelay: "0.7s", opacity: 0, animation: "word-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards" }}>
                Stagbyte engineers automation systems — test frameworks, AI agents,
                workflow pipelines, data validation, and custom tooling — that make
                engineering teams faster, more reliable, and less repetitive.
              </p>

              <div className="mt-12 flex flex-wrap gap-3 kinetic-word" style={{ animationDelay: "0.9s", opacity: 0, animation: "word-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-6 py-3 font-mono text-sm text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Explore Projects <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/capabilities"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-6 py-3 font-mono text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all hover:scale-105"
                >
                  View Capabilities
                </Link>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-6 py-3 font-mono text-sm text-zinc-500 hover:text-zinc-100 hover:border-zinc-700 transition-all hover:scale-105"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </div>

            {/* Terminal visual - hidden on mobile */}
            <div className="hidden flex-1 self-stretch lg:block">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="text-center">
                    <Icon className="mx-auto h-5 w-5 text-cyan-600 mb-2" />
                    <p className="text-2xl font-bold text-zinc-100">{m.value}</p>
                    <p className="mt-1 text-xs text-zinc-500">{m.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* Technology strip */}
      <section className="border-b border-zinc-800/30 py-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Stack</span>
            {technologies.slice(0, 14).map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800/40 bg-zinc-900/20 px-3 py-1.5 font-mono text-[11px] text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/60 transition-colors"
              >
                <TechIcon name={tech.name} className="h-3.5 w-3.5" />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities section */}
      <AnimateInView>
        <section id="capabilities" className="scroll-mt-24 border-b border-zinc-800/30 py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-cyan-500/50" />
                <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">01 / Capabilities</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                Automation engineering disciplines
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg">
                Five areas of automation engineering — from test automation and agentic systems
                to workflow orchestration, data pipelines, and custom tooling.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {capabilities.slice(0, 4).map((cap, i) => (
                <AnimateInView key={cap.id} delay={i * 0.08}>
                  <CapabilityCard capability={cap} />
                </AnimateInView>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors group"
              >
                View all capabilities <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* How Stagbyte automates (Process section) */}
      <AnimateInView>
        <section id="process" className="scroll-mt-24 border-b border-zinc-800/30 py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-cyan-500/50" />
                <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">Approach</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                How Stagbyte engineers automation
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg">
                Every automation system follows the same engineering discipline, whether
                it is a test framework, an AI agent, or a data pipeline.
              </p>
            </div>
            <PipelineInteractive />
          </div>
        </section>
      </AnimateInView>

      {/* Projects section */}
      <AnimateInView>
        <section id="projects" className="scroll-mt-24 border-b border-zinc-800/30 py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-cyan-500/50" />
                <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">02 / Projects</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                Automation engineering portfolio
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg">
                Seven projects spanning test automation, agentic AI systems, performance
                pipelines, data validation, workflow orchestration, and predictive testing.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors group"
              >
                View all projects <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* Workflows section */}
      <AnimateInView>
        <section id="workflows" className="scroll-mt-24 border-b border-zinc-800/30 py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-cyan-500/50" />
                <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">03 / Workflows</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                Automation that works
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg">
                Stagbyte does not only connect applications. It engineers automation
                workflows — with validation, testing, error handling, monitoring, and
                human approval built in.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { num: "01", title: "No-Code Automation", desc: "Simple workflows: form submissions, email notifications, spreadsheet updates, CRM updates, approval steps, and scheduled reports." },
                { num: "02", title: "Low-Code Orchestration", desc: "n8n workflows with conditional logic, API calls, data transformation, LLM integration, error handling, retry policies, and human approval." },
                { num: "03", title: "Custom Engineering", desc: "Python and TypeScript services for complex business rules, high-volume processing, event-driven systems, and secure internal integrations." },
              ].map((w, i) => (
                <AnimateInView key={w.title} delay={i * 0.1}>
                  <div className="group rounded-lg border border-zinc-800/40 bg-zinc-900/15 p-8 hover:border-zinc-700/50 hover:bg-zinc-900/30 transition-all">
                    <span className="font-mono text-[10px] text-zinc-600">{w.num}</span>
                    <h3 className="mt-3 font-semibold text-zinc-100">{w.title}</h3>
                    <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{w.desc}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/workflows"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors group"
              >
                Explore workflow approach <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* CTA section */}
      <AnimateInView>
        <section id="cta" className="scroll-mt-24 py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-12 md:p-16">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-cyan-500/50" />
                <p className="font-mono text-xs text-cyan-500 uppercase tracking-[0.15em]">04 / Contact</p>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl max-w-2xl">
                Have an engineering process that needs automation?
              </h2>
              <p className="mt-5 max-w-lg text-sm text-zinc-400 leading-relaxed">
                Describe the process, system, or quality problem. Stagbyte will help
                determine whether it needs test automation, an agentic workflow, low-code
                orchestration, or custom engineering.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-6 py-3 font-mono text-sm text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Start the conversation <ArrowUpRight className="h-3.5 w-3.5" />
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

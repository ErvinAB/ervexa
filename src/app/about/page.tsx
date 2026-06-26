import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import { socialLinks } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stagbyte is an independent quality engineering and automation studio created by Ervin Abedin, a Senior QA Automation Engineer and AI QA Engineer.",
};

const focusAreas = [
  "Senior QA automation architecture",
  "AI and machine-learning quality validation",
  "Backend and API testing",
  "Agentic QA systems",
  "Data quality engineering",
  "CI/CD integration",
  "Cloud testing (Azure, AWS)",
  "Workflow automation",
  "Local-first AI systems",
  "Low-code orchestration (n8n)",
  "Custom automation engineering",
  "Docker and Kubernetes",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="About"
        title="Stagbyte"
        description="An independent quality engineering and automation studio."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-5">
          <AnimateInView className="md:col-span-3">
            <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
              <p>
                Stagbyte is an independent quality engineering and automation studio created
                by Ervin Abedin, a Senior QA Automation Engineer and AI QA Engineer based in
                Skopje, North Macedonia.
              </p>
              <p>
                Ervin has more than six years of experience designing automation frameworks,
                validating APIs and distributed systems, integrating quality checks into CI/CD
                pipelines, and improving release reliability across web, mobile, backend, data,
                and AI-powered products.
              </p>
              <p>
                Stagbyte is where that experience is applied to practical tools, agentic QA
                systems, data-reliability frameworks, and automation workflows. Every system
                is built with reliability, observability, and maintainability as core
                requirements.
              </p>
            </div>
          </AnimateInView>

          <div className="md:col-span-2">
            <AnimateInView delay={0.15}>
              <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                <p className="mb-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  Focus Areas
                </p>
                <ul className="space-y-1.5">
                  {focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-2 font-mono text-[11px] text-zinc-500"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.25}>
              <div className="group mt-6 rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                <p className="mb-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  Connect
                </p>
                <ul className="space-y-2">
                  <li>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" /> {socialLinks.email}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2 text-xs text-zinc-400">
                    <MapPin className="h-3.5 w-3.5" /> Skopje, North Macedonia
                  </li>
                </ul>
                <p className="mt-4 text-[10px] text-zinc-500">
                  Available for remote collaboration and consulting.
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>

      {/* CTA */}
      <AnimateInView>
        <section className="border-t border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-10 md:p-12">
              <h2 className="text-lg font-bold text-zinc-100">
                Want to work together?
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Whether you need a test automation framework, agentic QA system, data-quality
                pipeline, or workflow automation — Stagbyte can help.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Contact <ArrowUpRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all hover:scale-105"
                >
                  View projects <ArrowUpRight className="h-3 w-3" />
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

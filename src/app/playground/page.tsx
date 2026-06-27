import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import WorkflowBuilder from "@/components/WorkflowBuilder";

export const metadata: Metadata = {
  title: "Workflow Playground",
  description: "Design and prototype automation workflows visually. Drag-and-drop builder for test suites, agentic pipelines, data workflows, and custom automation.",
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Playground"
        title="Prototype automation workflows visually"
        description="Design any automation flow — test frameworks, agentic pipelines, n8n workflows, data validation, or custom tooling. Export as JSON."
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <AnimateInView>
          <WorkflowBuilder preset="generic" />
        </AnimateInView>

        <div className="mt-8 flex flex-wrap gap-4 text-xs text-zinc-500">
          <span>Try the project-specific builders:</span>
          <Link href="/playground/data-reliability" className="text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
            Data Reliability <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link href="/playground/swarm-qa" className="text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
            Swarm QA Framework <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import WorkflowBuilder from "@/components/WorkflowBuilder";

export const metadata: Metadata = {
  title: "Swarm QA — Workflow Playground",
  description: "Visually explore the Swarm QA Framework: seven AI agents that explore, design, generate, execute, analyse, heal, and log QA automation.",
};

export default function SwarmQAPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Swarm QA"
        title="Visual agent pipeline builder"
        description="Drag-and-drop the Swarm QA Framework: seven AI agents that explore applications, design strategies, generate assets, execute tests, analyse failures, heal locators, and log results."
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/playground" className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          <ChevronLeft className="h-3 w-3" /> Back to generic playground
        </Link>

        <AnimateInView>
          <WorkflowBuilder preset="swarm-qa" />
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
}

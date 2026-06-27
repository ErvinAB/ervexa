import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import WorkflowBuilder from "@/components/WorkflowBuilder";

export const metadata: Metadata = {
  title: "Workflow Playground",
  description:
    "Drag and drop to prototype automation workflows. Export as JSON or n8n-compatible format.",
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Playground"
        title="Prototype automation workflows visually"
        description="Drag, connect, and configure nodes to design any automation flow — test suites, agentic pipelines, n8n workflows, data validation, or custom tooling. Export as n8n-compatible JSON and build it for real."
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <AnimateInView>
          <WorkflowBuilder />
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
}

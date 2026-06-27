import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import WorkflowBuilder from "@/components/WorkflowBuilder";

export const metadata: Metadata = {
  title: "Data Reliability — Workflow Playground",
  description: "Visually explore the Data Reliability Suite pipeline: ingest, validate, quarantine, transform, load, and export metrics.",
};

export default function DataReliabilityPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Data Reliability"
        title="Visual pipeline builder"
        description="Drag-and-drop the Data Reliability Suite pipeline: anomaly detection, schema validation, business-rule checks, quarantine, transformation, warehouse load, and metrics export."
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/playground" className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          <ChevronLeft className="h-3 w-3" /> Back to generic playground
        </Link>

        <AnimateInView>
          <WorkflowBuilder preset="data-reliability" />
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Share2, ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import ArchitectureDiagram from "../components/ArchitectureDiagram";

const ARCHITECTURES = [
  {
    id: "triage",
    title: "AUTONOMOUS_TRIAGE_CORE",
    description: "Intercepts inbound communications, classifies intent using LLMs, and executes routing logic or drafts responses instantly.",
    icon: MessageSquare,
    stats: ["< 1min Response Time", "24/7 Availability", "Zero Hallucination Mode"],
    color: "text-blue-400"
  },
  {
    id: "doc-proc",
    title: "DOCUMENT_SYNTHESIS_ENGINE",
    description: "Ingests unstructured PDFs, invoices, and contracts. Extracts structured JSON data and syncs directly to your ERP/CRM.",
    icon: FileText,
    stats: ["99.8% Accuracy", "Multi-Modal Vision", "Auto-Validation"],
    color: "text-purple-400"
  },
  {
    id: "outreach",
    title: "GROWTH_ORCHESTRATOR_V1",
    description: "Scrapes public signals, enriches lead profiles, and generates hyper-personalized outreach sequences at scale.",
    icon: Share2,
    stats: ["Dynamic Personalization", "Multi-Channel Sync", "A/B Testing Native"],
    color: "text-amber-400"
  }
];

export default function WhatWeDo() {
  return (
    <section className="relative py-24 bg-black overflow-hidden" id="use-cases">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-20">
          <ScrollAnimationWrapper variant="fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-500" />
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">System Architectures</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Deployable <span className="text-zinc-500">Intelligence.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg">
              We don't just build "chatbots". We engineer robust, multi-agent systems designed to solve specific, high-value business bottlenecks.
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* Architecture Visual */}
        <div className="mb-24">
          <ScrollAnimationWrapper variant="scale-up">
            <ArchitectureDiagram />
          </ScrollAnimationWrapper>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {ARCHITECTURES.map((arch, index) => (
            <ScrollAnimationWrapper key={arch.id} variant="slide-up" delay={index * 0.1}>
              <div className="group relative p-6 h-full rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors duration-300">
                {/* Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent rounded-xl pointer-events-none`} />

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${arch.color}`}>
                    <arch.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">{arch.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {arch.description}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-800/50">
                  {arch.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                      <CheckCircle2 className={`w-3 h-3 ${arch.color}`} />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4">
                  <button className="text-xs font-mono text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                    INITIALIZE_MODULE <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}

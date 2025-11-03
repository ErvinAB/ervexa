"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-20 md:pt-28 md:pb-24 max-w-7xl mx-auto">
      {/* subtle animated glow */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-blue-500/20 blur-[120px]" />
      </motion.div>

      <div className="relative max-w-3xl">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 border border-zinc-700/60 px-3 py-1 text-[11px] font-medium text-zinc-300 shadow-[0_0_20px_rgba(0,122,255,0.5)]">
          <span className="text-blue-400">Ervexa</span>
          <span>Automation & AI Workflows</span>
        </div>

        {/* main headline */}
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-white">
          AI agents and automation for the boring, expensive parts of your business.
        </h1>

        {/* sub text */}
        <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">
          We design and deploy custom automations, AI copilots, and decision
          workflows that remove manual work, speed up response time, and reduce
          mistakes — across operations, compliance, support, QA, and more.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white px-5 py-3 text-sm font-medium shadow-[0_20px_60px_-10px_rgba(0,122,255,0.6)]"
          >
            Work with us
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <a
            href="#use-cases"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-500 text-zinc-200 px-5 py-3 text-sm font-medium"
          >
            See automations we’ve built
          </a>
        </div>

        {/* trust line */}
        <p className="mt-6 text-[13px] text-zinc-500">
          Built with LLMs, n8n, and targeted integrations — not hype.
        </p>
      </div>
    </section>
  );
}

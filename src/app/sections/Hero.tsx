"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Network, Shield } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import ButtonWithRipple from "../components/ButtonWithRipple";
import AINodeNetwork from "../components/AINodeNetwork";
import SystemStatus from "../components/SystemStatus";
import { usePersonalization } from "../context/PersonalizationContext";
import { getPersonalizedCTA } from "../utils/personalization-utils";

export default function Hero() {
  const { persona, trackClick } = usePersonalization();
  const ctaText = getPersonalizedCTA(persona);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black selection:bg-cyan-500/30">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* 3D Network Background - Full Screen & Subtle */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AINodeNetwork />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full pt-20">

        {/* Left Column: Content */}
        <div className="flex flex-col gap-8">
          {/* Tech Badge */}
          <ScrollAnimationWrapper variant="fade-in" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-950/30 border border-cyan-800/50 text-cyan-400 font-mono text-xs tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM_ONLINE v2.0
            </div>
          </ScrollAnimationWrapper>

          {/* Main Headline */}
          <ScrollAnimationWrapper variant="slide-up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Automate the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Impossible.
              </span>
            </h1>
          </ScrollAnimationWrapper>

          {/* Subtext */}
          <ScrollAnimationWrapper variant="slide-up" delay={0.3}>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed border-l-2 border-zinc-800 pl-6">
              We engineer intelligent agent swarms and decision workflows that autonomously handle your complex operations.
              <span className="block mt-2 text-zinc-500 font-mono text-sm">
                {"//"} No manual intervention required.
              </span>
            </p>
          </ScrollAnimationWrapper>

          {/* CTAs */}
          <ScrollAnimationWrapper variant="slide-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {/* Shadow Cleaner CTA - Featured */}
              <ButtonWithRipple
                href="/shadow-cleaner"
                variant="primary"
                onClick={() => trackClick("hero-shadow-cleaner")}
                className="group !rounded-none !bg-gradient-to-r !from-purple-600 !to-cyan-600 hover:!from-purple-500 hover:!to-cyan-500 !text-white border-0 font-mono !shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                <Shield className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                SCAN_YOUR_SHADOWS
              </ButtonWithRipple>

              <ButtonWithRipple
                href="#contact"
                variant="primary"
                onClick={() => trackClick("hero-primary-cta")}
                className="group !rounded-none !bg-white !text-black hover:!bg-cyan-50 hover:!text-cyan-900 border-0 font-mono"
              >
                <Terminal className="w-4 h-4 mr-2 group-hover:text-cyan-600 transition-colors" />
                {ctaText}
              </ButtonWithRipple>

              <ButtonWithRipple
                href="#use-cases"
                variant="secondary"
                onClick={() => trackClick("hero-secondary-cta")}
                className="!rounded-none !border-zinc-700 hover:!border-cyan-500/50 hover:!bg-cyan-950/10 font-mono"
              >
                <Network className="w-4 h-4 mr-2" />
                VIEW_ARCHITECTURES
              </ButtonWithRipple>
            </div>
          </ScrollAnimationWrapper>

          {/* Stats / Trust */}
          <ScrollAnimationWrapper variant="fade-in" delay={0.5}>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-800/50">
              <div>
                <div className="text-2xl font-bold text-white font-mono">99.9%</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">10x</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Efficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">0ms</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Latency</div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Right Column: Visuals */}
        <div className="hidden lg:flex flex-col gap-6 relative">
          {/* Floating System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -right-4 top-0 z-20"
          >
            <SystemStatus />
          </motion.div>

          {/* Abstract Code/Data Visual */}
          <div className="mt-32 p-6 rounded-lg border border-zinc-800 bg-black/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
                <Cpu className="w-4 h-4" />
                <span>AGENT_CORE_LOGIC</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs text-zinc-500">
              <div className="flex gap-4">
                <span className="text-zinc-700">01</span>
                <span>import <span className="text-cyan-400">AgentSwarm</span> from &apos;@stagbyte/core&apos;;</span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">02</span>
                <span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">03</span>
                <span>const <span className="text-blue-400">workflow</span> = new AgentSwarm({'{'}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">04</span>
                <span className="pl-4">mode: <span className="text-emerald-400">&apos;AUTONOMOUS&apos;</span>,</span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">05</span>
                <span className="pl-4">optimization: <span className="text-amber-400">true</span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">06</span>
                <span>{'}'});</span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">07</span>
                <span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-zinc-700">08</span>
                <span>await workflow.<span className="text-purple-400">execute()</span>;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

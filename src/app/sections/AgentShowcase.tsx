"use client";

import { Code2 } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

const AGENTS = [
  {
    id: "01",
    name: "SALES_DEV_UNIT_ALPHA",
    role: "Autonomous Outbound",
    description: "Scrapes LinkedIn for qualified leads, enriches data via Clearbit, and drafts personalized connection requests.",
    stats: {
      efficiency: "+450%",
      volume: "2k/day",
      platform: "LinkedIn/Email"
    },
    codeSnippet: `await agent.connect({
  target: lead.profileUrl,
  message: generateIntro(lead)
});`,
    status: "ONLINE"
  },
  {
    id: "02",
    name: "SUPPORT_TRIAGE_BOT",
    role: "L1 Support Automation",
    description: "Handles 80% of inbound tickets instantly. Escalates complex issues to humans with full context summary.",
    stats: {
      efficiency: "+80%",
      volume: "24/7",
      platform: "Zendesk/Intercom"
    },
    codeSnippet: `if (ticket.complexity > 0.8) {
  return escalateToHuman(ticket);
} else {
  return resolve(ticket);
}`,
    status: "ACTIVE"
  },
  {
    id: "03",
    name: "CONTENT_ENGINE_V2",
    role: "SEO & Social Gen",
    description: "Monitors industry news, generates SEO-optimized blog posts, and schedules social media snippets automatically.",
    stats: {
      efficiency: "10x",
      volume: "Daily",
      platform: "WordPress/Twitter"
    },
    codeSnippet: `const trends = await scanNews();
const post = await llm.write({
  topic: trends[0],
  tone: 'professional'
});`,
    status: "PROCESSING"
  }
];

export default function AgentShowcase() {
  return (
    <section className="py-24 bg-black relative border-t border-zinc-800" id="showcase">
      <div className="max-w-7xl mx-auto px-6">

        <ScrollAnimationWrapper variant="fade-in">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-cyan-500" />
                <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">Deployed Units</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Active <span className="text-zinc-500">Agents.</span>
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-mono text-xs text-zinc-500">SYSTEM_STATUS</div>
              <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                ALL_SYSTEMS_NOMINAL
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-3 gap-6">
          {AGENTS.map((agent, index) => (
            <ScrollAnimationWrapper key={agent.id} variant="slide-up" delay={index * 0.1}>
              <div className="group relative bg-zinc-900/30 border border-zinc-800 hover:border-cyan-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">

                {/* Header */}
                <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-start">
                  <div>
                    <div className="font-mono text-xs text-cyan-500 mb-1">UNIT_{agent.id}</div>
                    <h3 className="font-bold text-white text-lg tracking-tight">{agent.name}</h3>
                    <div className="text-xs text-zinc-500 font-mono mt-1">{agent.role}</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
                    {agent.status}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 min-h-[60px]">
                    {agent.description}
                  </p>

                  {/* Code Snippet */}
                  <div className="bg-black rounded border border-zinc-800 p-3 mb-6 font-mono text-[10px] text-zinc-400 overflow-hidden relative">
                    <div className="absolute top-2 right-2 text-zinc-700">
                      <Code2 className="w-3 h-3" />
                    </div>
                    <pre className="whitespace-pre-wrap">
                      {agent.codeSnippet}
                    </pre>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/50">
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase">Gain</div>
                      <div className="text-sm font-mono text-white">{agent.stats.efficiency}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase">Vol</div>
                      <div className="text-sm font-mono text-white">{agent.stats.volume}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase">Target</div>
                      <div className="text-sm font-mono text-white truncate">{agent.stats.platform}</div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}

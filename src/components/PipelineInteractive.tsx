"use client";

import { useState } from "react";

const stages = [
  {
    step: "01",
    title: "Analyse",
    desc: "Understand the process, system, or quality problem. Map the current workflow and identify where automation creates leverage.",
    detail: "Stagbyte starts by understanding what you do manually. We map every step, every decision point, every handoff, and every failure mode. This discovery phase determines whether automation will reduce effort, improve consistency, or both. We identify quick wins and structural changes.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design",
    desc: "Architect the right solution. Choose between test frameworks, agent loops, workflow builders, data pipelines, or custom services based on the problem.",
    detail: "Not every automation problem needs a custom framework, and not every workflow needs an AI agent. Stagbyte selects the right tool for the job: Playwright for browser automation, n8n for workflow orchestration, Python for data pipelines, custom agents for complex decision logic. The architecture is documented before any code is written.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Engineer",
    desc: "Build with reliability, observability, and maintainability as core requirements. Every system includes validation, error handling, monitoring, and documentation.",
    detail: "Code is written with testing, error handling, and observability built in from day one. Every automation system includes logging, monitoring alerts, retry logic, and human approval gates where needed. Documentation is generated alongside code. Stagbyte follows the same engineering discipline it would expect from any production system.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Validate",
    desc: "Verify the automation works correctly. Run in CI/CD, monitor results, collect feedback, and iterate. Automation must prove itself before it is trusted.",
    detail: "Automation that fails silently is worse than no automation. Stagbyte validates every system against real scenarios, runs it through CI/CD pipelines, monitors its behaviour in production-like conditions, and collects feedback from the people who use it. Only when it proves reliable does it earn trust.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const connectors = [
  "→",
  "→",
  "→",
];

export default function PipelineInteractive() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {/* Pipeline stages - horizontal on desktop */}
      <div className="hidden md:flex items-start justify-between gap-2">
        {stages.map((s, i) => (
          <div key={s.step} className="flex-1">
            <button
              onClick={() => setActive(active === i ? null : i)}
              className={`group w-full rounded-lg border p-5 text-left transition-all ${
                active === i
                  ? "border-cyan-700/50 bg-cyan-950/20 shadow-lg shadow-cyan-950/20"
                  : "border-zinc-800/40 bg-zinc-900/15 hover:border-zinc-700/50 hover:bg-zinc-900/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[10px] transition-colors ${
                  active === i ? "text-cyan-500" : "text-zinc-600"
                }`}>
                  {s.step}
                </span>
                <span className={`transition-colors ${
                  active === i ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`}>
                  {s.icon}
                </span>
              </div>
              <h3 className={`mt-3 font-semibold text-sm transition-colors ${
                active === i ? "text-cyan-200" : "text-zinc-100"
              }`}>
                {s.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
            </button>
            {i < stages.length - 1 && (
              <div className="flex justify-center py-2 text-zinc-700 text-sm">
                {connectors[i]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex md:hidden flex-col gap-3">
        {stages.map((s, i) => (
          <div key={s.step}>
            <button
              onClick={() => setActive(active === i ? null : i)}
              className={`group w-full rounded-lg border p-4 text-left transition-all ${
                active === i
                  ? "border-cyan-700/50 bg-cyan-950/20"
                  : "border-zinc-800/40 bg-zinc-900/15 hover:border-zinc-700/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[10px] ${active === i ? "text-cyan-500" : "text-zinc-600"}`}>
                  {s.step}
                </span>
                <span className={`${active === i ? "text-cyan-400" : "text-zinc-500"}`}>
                  {s.icon}
                </span>
                <h3 className={`text-sm font-semibold ${active === i ? "text-cyan-200" : "text-zinc-100"}`}>
                  {s.title}
                </h3>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active !== null && (
        <div className="mt-6 rounded-lg border border-cyan-900/30 bg-cyan-950/10 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] text-cyan-600">{stages[active].step}</span>
            <span className="h-px flex-1 bg-cyan-900/30" />
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{stages[active].detail}</p>
          <button
            onClick={() => setActive(null)}
            className="mt-4 font-mono text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            [ close ]
          </button>
        </div>
      )}
    </div>
  );
}

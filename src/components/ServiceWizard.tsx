"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { capabilities } from "@/lib/content/capabilities";

type Step = "type" | "stack" | "goal" | "result";

const types = [
  { id: "qa-automation", label: "Test Automation", desc: "UI, API, backend, mobile, and regression testing frameworks" },
  { id: "agentic-quality", label: "Agentic Automation", desc: "AI agents that explore, test, analyse, and generate automation" },
  { id: "workflow-automation", label: "Workflow Orchestration", desc: "n8n, no-code, and low-code workflow automation" },
  { id: "data-quality", label: "Data Pipelines", desc: "Data validation, schema enforcement, quality monitoring" },
  { id: "custom-automation", label: "Custom Automation", desc: "Bespoke services, event-driven systems, browser automation" },
];

const stacks = [
  { id: "typescript", label: "TypeScript / JavaScript" },
  { id: "python", label: "Python" },
  { id: "dotnet", label: ".NET / C#" },
  { id: "java", label: "Java" },
  { id: "other", label: "Other / Not sure" },
];

const goals = [
  { id: "effort", label: "Reduce manual effort", desc: "Automate repetitive tasks and free up engineering time" },
  { id: "reliability", label: "Improve reliability", desc: "Catch regressions, validate data, prevent failures" },
  { id: "speed", label: "Speed up delivery", desc: "Faster feedback loops, shorter release cycles" },
  { id: "visibility", label: "Gain visibility", desc: "Dashboards, reports, and insights into quality and process" },
];

export default function ServiceWizard() {
  const [step, setStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const capability = selectedType ? capabilities.find((c) => c.id === selectedType) : null;

  const go = (next: Step) => {
    setStep(next);
  };

  const reset = () => {
    setStep("type");
    setSelectedType(null);
    setSelectedStack(null);
    setSelectedGoal(null);
  };

  const progress = step === "type" ? 0 : step === "stack" ? 33.3 : step === "goal" ? 66.6 : 100;

  return (
    <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/20 p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">
            {step === "type" ? "Step 1 of 3" : step === "stack" ? "Step 2 of 3" : step === "goal" ? "Step 3 of 3" : "Complete"}
          </span>
          {step !== "result" && (
            <span className="font-mono text-[10px] text-zinc-700">
              {Math.round(progress)}%
            </span>
          )}
        </div>
        <div className="h-1 rounded-full bg-zinc-800">
          <div
            className="h-1 rounded-full bg-cyan-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === "type" && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 mb-1">What type of automation do you need?</h3>
          <p className="text-xs text-zinc-500 mb-6">Choose the area closest to your problem.</p>
          <div className="grid gap-3">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${
                  selectedType === t.id
                    ? "border-cyan-700/50 bg-cyan-950/20"
                    : "border-zinc-800/30 bg-zinc-900/10 hover:border-zinc-700/50 hover:bg-zinc-900/20"
                }`}
              >
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  selectedType === t.id ? "border-cyan-500 bg-cyan-500" : "border-zinc-700"
                }`}>
                  {selectedType === t.id && <Check className="h-3 w-3 text-zinc-950" />}
                </span>
                <div>
                  <p className={`text-sm font-medium ${selectedType === t.id ? "text-cyan-200" : "text-zinc-200"}`}>{t.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => go("stack")}
              disabled={!selectedType}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-800"
            >
              Next <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {step === "stack" && (
        <div>
          <button onClick={() => go("type")} className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-4">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <h3 className="text-sm font-semibold text-zinc-100 mb-1">What is your primary tech stack?</h3>
          <p className="text-xs text-zinc-500 mb-6">Helps us match the right approach.</p>
          <div className="grid gap-2">
            {stacks.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStack(s.id)}
                className={`flex items-center gap-4 rounded-lg border p-3.5 text-left transition-all ${
                  selectedStack === s.id
                    ? "border-cyan-700/50 bg-cyan-950/20"
                    : "border-zinc-800/30 bg-zinc-900/10 hover:border-zinc-700/50 hover:bg-zinc-900/20"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  selectedStack === s.id ? "border-cyan-500 bg-cyan-500" : "border-zinc-700"
                }`}>
                  {selectedStack === s.id && <Check className="h-3 w-3 text-zinc-950" />}
                </span>
                <span className={`text-sm ${selectedStack === s.id ? "text-cyan-200" : "text-zinc-300"}`}>{s.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => go("goal")}
              disabled={!selectedStack}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-800"
            >
              Next <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {step === "goal" && (
        <div>
          <button onClick={() => go("stack")} className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-4">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <h3 className="text-sm font-semibold text-zinc-100 mb-1">What is your main goal?</h3>
          <p className="text-xs text-zinc-500 mb-6">What outcome matters most to your team?</p>
          <div className="grid gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${
                  selectedGoal === g.id
                    ? "border-cyan-700/50 bg-cyan-950/20"
                    : "border-zinc-800/30 bg-zinc-900/10 hover:border-zinc-700/50 hover:bg-zinc-900/20"
                }`}
              >
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  selectedGoal === g.id ? "border-cyan-500 bg-cyan-500" : "border-zinc-700"
                }`}>
                  {selectedGoal === g.id && <Check className="h-3 w-3 text-zinc-950" />}
                </span>
                <div>
                  <p className={`text-sm font-medium ${selectedGoal === g.id ? "text-cyan-200" : "text-zinc-200"}`}>{g.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{g.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => go("result")}
              disabled={!selectedGoal}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-800"
            >
              See result <Sparkles className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {step === "result" && capability && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-wider">Recommendation</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-100">{capability.title}</h3>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{capability.description}</p>

          <div className="mt-6 grid gap-2">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">What this covers</p>
            <div className="flex flex-wrap gap-1.5">
              {capability.details.slice(0, 6).map((d) => (
                <span key={d} className="rounded bg-zinc-800/30 px-2 py-1 font-mono text-[10px] text-zinc-500">{d}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/capabilities#${capability.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105"
            >
              Learn more <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all hover:scale-105"
            >
              Discuss your project
            </Link>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/30">
            <button
              onClick={reset}
              className="font-mono text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              [ Start over ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

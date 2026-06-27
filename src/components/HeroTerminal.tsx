"use client";

import { useEffect, useState, useCallback } from "react";

const lines = [
  { cmd: "stagbyte@automation:~$ npx playwright test --reporter=list", delay: 800 },
  { cmd: "  ✓ should validate user registration form (2.1s)", delay: 600 },
  { cmd: "  ✓ should handle invalid email format (1.3s)", delay: 500 },
  { cmd: "  ✓ should verify API rate limiting (3.2s)", delay: 700 },
  { cmd: "  ✓ should confirm database rollback on failure (1.8s)", delay: 600 },
  { cmd: "", delay: 300 },
  { cmd: "  4 passed, 0 failed, 0 flaky (8.4s)", delay: 900 },
  { cmd: "", delay: 400 },
  { cmd: "stagbyte@automation:~$ ./run-agent --mode=explore --target=staging", delay: 900 },
  { cmd: "  [agent] mapping application structure...", delay: 700 },
  { cmd: "  [agent] identifying input fields, APIs, auth flows...", delay: 800 },
  { cmd: "  [agent] generating test strategy based on risk profile...", delay: 1000 },
  { cmd: "  [agent] proposal ready for review (3 new test suites)", delay: 1200 },
  { cmd: "", delay: 500 },
  { cmd: "stagbyte@automation:~$ pipeline run --validate --deploy", delay: 1000 },
  { cmd: "  [ci] schema validation: passed", delay: 600 },
  { cmd: "  [ci] data contract check: passed", delay: 500 },
  { cmd: "  [ci] integration tests: 47/47 passed", delay: 700 },
  { cmd: "  [ci] deployment: promoted to production", delay: 1100 },
  { cmd: "", delay: 600 },
  { cmd: "stagbyte@automation:~$ █", delay: 999999 },
];

interface DisplayLine {
  text: string;
  done: boolean;
}

export default function HeroTerminal() {
  const [displayed, setDisplayed] = useState<DisplayLine[]>([{ text: "", done: false }]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const current = lines[lineIndex];

  const advanceLine = useCallback(() => {
    setLineIndex((i) => (i + 1) % lines.length);
    setCharIndex(0);
    setDisplayed([]);
  }, []);

  useEffect(() => {
    if (!current) return;

    const timer = setTimeout(
      () => {
        if (charIndex < current.cmd.length) {
          const next = charIndex + 1;
          setCharIndex(next);
          setDisplayed([{ text: current.cmd.slice(0, next), done: false }]);
        } else {
          setDisplayed([{ text: current.cmd, done: true }]);
          if (current.delay < 999999) {
            setTimeout(advanceLine, current.delay);
          }
        }
      },
      charIndex === 0 ? current.delay * 0.3 : 30 + Math.random() * 35,
    );

    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, current, advanceLine]);

  const isWaiting = charIndex >= current.cmd.length;

  return (
    <div className="w-full rounded-lg border border-zinc-800/40 bg-zinc-950/80 p-4 font-mono text-xs leading-relaxed shadow-lg backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-1.5 border-b border-zinc-800/30 pb-2">
        <span className="h-2 w-2 rounded-full bg-red-500/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <span className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[10px] text-zinc-700 uppercase tracking-wider">automation-pipeline — zsh</span>
      </div>
      <div className="min-h-[160px]">
        {displayed.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line.text.startsWith("stagbyte@automation") ? (
              <span>
                <span className="text-green-500">stagbyte@automation</span>
                <span className="text-zinc-600">:</span>
                <span className="text-cyan-500">~</span>
                <span className="text-zinc-600">$ </span>
                <span className="text-zinc-300">{line.text.replace(/^stagbyte@automation:~\$ /, "")}</span>
              </span>
            ) : line.text.startsWith("  ✓") ? (
              <span className="text-green-400/80">{line.text}</span>
            ) : line.text.startsWith("  [agent]") || line.text.startsWith("  [ci]") ? (
              <span className="text-zinc-400">{line.text}</span>
            ) : line.text.includes("passed") || line.text.includes("promoted") ? (
              <span className="text-cyan-400">{line.text}</span>
            ) : line.text.includes("failed") ? (
              <span className="text-red-400">{line.text}</span>
            ) : (
              <span className="text-zinc-500">{line.text}</span>
            )}
            {i === displayed.length - 1 && !isWaiting && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-zinc-400" />
            )}
          </div>
        ))}
        {isWaiting && current.cmd.includes("█") && (
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-zinc-400" />
        )}
      </div>
    </div>
  );
}

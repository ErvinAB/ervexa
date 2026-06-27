"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function QuickStartTerminal({ commands, title }: { commands: string[]; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    await navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/40 hover:bg-zinc-900/30">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-zinc-600" />
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            {title || "Terminal"}
          </span>
        </div>
        <button
          onClick={copyAll}
          className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? "Copied" : "Copy all"}
        </button>
      </div>
      <div className="space-y-1.5">
        {commands.map((cmd, i) => (
          <div key={i} className="font-mono text-[11px] text-zinc-400 leading-relaxed">
            {cmd}
          </div>
        ))}
      </div>
    </div>
  );
}

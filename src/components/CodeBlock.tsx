"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800/50 bg-black/40">
      {(title || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {language && (
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                {language}
              </span>
            )}
            {title && (
              <span className="font-mono text-[10px] text-zinc-500">{title}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <pre className="px-4 py-3 font-mono text-[11px] leading-relaxed text-zinc-400">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

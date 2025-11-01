"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

interface FeedItem {
  title: string;
  source: string;
  url: string;
  published: string;
}

export default function LiveAIFeeds() {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch("/api/news", { cache: "no-store" });
        const data = await resp.json();
        setItems(data.news || []);
      } catch (e) {
        console.error("Failed to load news", e);
      }
    }

    load();
  }, []);

  return (
    <section
      id="live-feed"
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
    >
      <div className="mb-10 flex flex-col gap-3 max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Live AI Feeds
          </span>
          <span className="rounded-full bg-zinc-900/60 border border-zinc-700/50 text-[10px] px-2 py-1 font-medium text-zinc-300 shadow-[0_0_20px_rgba(0,122,255,0.5)]">
            Updated in real time
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
          Latest AI, automation, and ML signals.
        </h2>

        <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
          We track real activity in AI, automation, testing, and applied ML.
          This is what’s actually moving right now.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.length === 0 && (
          <p className="text-sm text-zinc-500 col-span-full">
            No live data available. (Add your API key in NEWSDATA_API_KEY.)
          </p>
        )}

        {items.map((n) => (
          <a
            key={n.url}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600/60 hover:shadow-[0_20px_60px_-10px_rgba(0,122,255,0.4)] hover:bg-zinc-900/60"
          >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-100/5 opacity-0 blur-xl transition group-hover:opacity-30
                            bg-[radial-gradient(circle_at_0%_0%,rgba(0,122,255,0.4),transparent_70%)]" />

            <div className="relative flex flex-col justify-between min-h-[180px]">
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="truncate max-w-[70%]">
                    {n.source || "Source"}
                  </span>
                  <time className="text-zinc-500">
                    {formatRelativeTime(n.published)}
                  </time>
                </div>

                <h3 className="mt-3 text-zinc-100 text-base font-medium leading-snug line-clamp-3 group-hover:text-blue-400">
                  {n.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center text-[12px] text-blue-400 font-medium">
                <span>Read more</span>
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// helper: "2h ago", "5m ago"
function formatRelativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;

  // minutes
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return diffMin + "m ago";

  // hours
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return diffHr + "h ago";

  // days
  const diffDay = Math.floor(diffHr / 24);
  return diffDay + "d ago";
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rss, ExternalLink, Activity, Globe } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function LiveAIFeeds() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated feed data for now (replace with real fetch if needed)
    const MOCK_FEEDS = [
      { title: "OpenAI releases GPT-5 preview with enhanced reasoning", link: "#", pubDate: "10 min ago", source: "OpenAI" },
      { title: "Anthropic's Claude 3.5 Sonnet tops coding benchmarks", link: "#", pubDate: "1 hour ago", source: "Anthropic" },
      { title: "Meta introduces new self-supervised learning algorithm", link: "#", pubDate: "2 hours ago", source: "Meta AI" },
      { title: "Google DeepMind solves 50-year-old math problem", link: "#", pubDate: "3 hours ago", source: "DeepMind" },
      { title: "New autonomous agent framework launched on GitHub", link: "#", pubDate: "5 hours ago", source: "GitHub" },
    ];

    setFeeds(MOCK_FEEDS);
    setLoading(false);
  }, []);

  return (
    <section className="py-24 bg-black border-t border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

        {/* Left: Context */}
        <div className="flex flex-col justify-center">
          <ScrollAnimationWrapper variant="fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-500" />
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">Global Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Always <span className="text-zinc-500">Listening.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Our systems continuously monitor the global AI landscape. We integrate the latest breakthroughs into your workflows the moment they become available.
            </p>

            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold text-white font-mono">24/7</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">Real-time</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Integration</div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Right: The Feed */}
        <ScrollAnimationWrapper variant="slide-up" delay={0.2}>
          <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm overflow-hidden h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Activity className="w-3 h-3 text-emerald-500" />
                LIVE_SIGNAL_FEED
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            </div>

            {/* Feed Content */}
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-45px)] custom-scrollbar">
              {feeds.map((item, i) => (
                <div key={i} className="group flex gap-4 p-3 rounded hover:bg-zinc-800/30 transition-colors border-b border-zinc-800/30 last:border-0">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" />
                  </div>
                  <div>
                    <h4 className="text-sm text-zinc-200 font-medium leading-snug group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" /> {item.source}
                      </span>
                      <span>{item.pubDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scan Line Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] opacity-20" />
          </div>
        </ScrollAnimationWrapper>

      </div>
    </section>
  );
}

"use client";

import { Clock, ExternalLink } from "lucide-react";
import type { TrendingTopic } from "@/lib/content-engine/content-types";

interface TrendingTopicsProps {
    topics: TrendingTopic[];
    loading: boolean;
}

export default function TrendingTopics({ topics, loading }: TrendingTopicsProps) {
    if (loading) {
        return (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-sm font-mono text-cyan-500 mb-4">TRENDING_TOPICS</h3>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 sticky top-6">
            <h3 className="text-sm font-mono text-cyan-500 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                TRENDING_TOPICS
            </h3>

            <div className="space-y-3">
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        className="w-full text-left p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-cyan-500/50 transition-all group"
                        onClick={() => {
                            // Emit custom event to fill topic input
                            window.dispatchEvent(new CustomEvent("selectTopic", { detail: topic.title }));
                        }}
                    >
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                                {topic.title}
                            </h4>
                            {topic.url && (
                                <ExternalLink className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="px-2 py-0.5 rounded bg-zinc-700/50 font-mono">
                                {topic.source}
                            </span>
                            <span className="font-mono">{topic.category}</span>
                        </div>
                    </button>
                ))}
            </div>

            {topics.length === 0 && !loading && (
                <p className="text-sm text-zinc-600 text-center py-4">
                    No trending topics available
                </p>
            )}
        </div>
    );
}

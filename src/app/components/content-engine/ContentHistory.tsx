"use client";

import { Trash2, Clock } from "lucide-react";
import type { ContentHistory as ContentHistoryType } from "@/lib/content-engine/content-types";

interface ContentHistoryProps {
    history: ContentHistoryType[];
    onDelete: (id: string) => void;
}

export default function ContentHistory({ history, onDelete }: ContentHistoryProps) {
    if (history.length === 0) return null;

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-sm font-mono text-cyan-500 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                CONTENT_HISTORY ({history.length})
            </h3>

            <div className="space-y-3">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-sm font-medium text-white truncate">
                                        {item.topic}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded bg-zinc-700 text-xs font-mono text-zinc-400 flex-shrink-0">
                                        {item.platform}
                                    </span>
                                </div>

                                <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
                                    {item.selectedVariation.content}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-zinc-600">
                                    <span>{new Date(item.generatedAt).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{item.selectedVariation.characterCount} chars</span>
                                    <span>•</span>
                                    <span>Score: {item.selectedVariation.engagementScore}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onDelete(item.id)}
                                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete from history"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

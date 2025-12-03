"use client";

import { TrendingUp, TrendingDown, Minus, Calendar, Download, Trash2 } from "lucide-react";
import type { ScanHistoryEntry } from "@/lib/shadow-cleaner/history-types";
import { compareScan, deleteScan, exportScanAsJSON, exportScanAsText } from "@/lib/shadow-cleaner/history-utils";

interface ScanHistoryCardProps {
    scan: ScanHistoryEntry;
    onDelete?: () => void;
}

export default function ScanHistoryCard({ scan, onDelete }: ScanHistoryCardProps) {
    const comparison = compareScan(scan);
    const { scoreDelta, newThreats, resolvedThreats } = comparison;

    const handleExportJSON = () => {
        exportScanAsJSON(scan);
    };

    const handleExportText = () => {
        const text = exportScanAsText(scan);
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `shadow-cleaner-report-${scan.id}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDelete = () => {
        deleteScan(scan.id);
        if (onDelete) onDelete();
    };

    return (
        <div className="p-6 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-400">
                            {new Date(scan.savedAt).toLocaleDateString()} at {new Date(scan.savedAt).toLocaleTimeString()}
                        </span>
                    </div>
                    <div className="text-xs text-zinc-600 font-mono">ID: {scan.scanId}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={handleExportJSON}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                        title="Export as JSON"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleExportText}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                        title="Export as Text"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4 mb-4">
                <div>
                    <div className="text-4xl font-bold text-white">{scan.shadowScore.score}</div>
                    <div className="text-xs text-zinc-500 font-mono">Shadow Score</div>
                </div>

                {/* Score Delta */}
                {scoreDelta !== 0 && (
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${scoreDelta > 0
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}>
                        {scoreDelta > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : scoreDelta < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                        ) : (
                            <Minus className="w-4 h-4" />
                        )}
                        <span className="text-sm font-mono">
                            {scoreDelta > 0 ? "+" : ""}{scoreDelta}
                        </span>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-zinc-800/50">
                    <div className="text-2xl font-bold text-purple-400">{scan.threats.length}</div>
                    <div className="text-xs text-zinc-500">Threats</div>
                    {newThreats > 0 && (
                        <div className="text-xs text-red-400 mt-1">+{newThreats} new</div>
                    )}
                    {resolvedThreats > 0 && (
                        <div className="text-xs text-emerald-400 mt-1">-{resolvedThreats} resolved</div>
                    )}
                </div>

                <div className="p-3 rounded-lg bg-zinc-800/50">
                    <div className="text-2xl font-bold text-cyan-400">{scan.exposures.length}</div>
                    <div className="text-xs text-zinc-500">Exposures</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-800/50">
                    <div className="text-2xl font-bold text-amber-400">{scan.recommendations.length}</div>
                    <div className="text-xs text-zinc-500">Actions</div>
                </div>
            </div>
        </div>
    );
}

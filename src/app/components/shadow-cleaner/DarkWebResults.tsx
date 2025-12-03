"use client";

import { Globe, AlertTriangle, Shield, ExternalLink } from "lucide-react";
import type { DarkWebResult } from "@/lib/shadow-cleaner/types";

interface DarkWebResultsProps {
    results: DarkWebResult[];
}

export default function DarkWebResults({ results }: DarkWebResultsProps) {
    if (results.length === 0) {
        return (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 text-center">
                <Shield className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Dark Web Exposure</h3>
                <p className="text-zinc-400">Your data was not found on dark web forums or marketplaces.</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Dark Web Findings</h2>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 font-mono text-sm">{results.length} Found</span>
                </div>
            </div>

            <div className="space-y-4">
                {results.map((result, idx) => (
                    <DarkWebCard key={idx} result={result} />
                ))}
            </div>

            {/* Recommendations */}
            <div className="mt-6 p-6 rounded-lg bg-red-500/5 border border-red-500/20">
                <h3 className="text-sm font-mono text-red-400 uppercase mb-3">Critical Actions Required</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Change passwords for all accounts immediately
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Enable two-factor authentication everywhere
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Monitor credit reports for suspicious activity
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Consider credit freeze and fraud alerts
                    </li>
                </ul>
            </div>
        </div>
    );
}

function DarkWebCard({ result }: { result: DarkWebResult }) {
    const severityColors = {
        low: "emerald",
        medium: "yellow",
        high: "orange",
        critical: "red",
    };

    const color = severityColors[result.severity];

    const typeIcons = {
        forum: Globe,
        marketplace: AlertTriangle,
        paste: ExternalLink,
        breach: AlertTriangle,
    };

    const Icon = typeIcons[result.type];

    return (
        <div className={`p-5 rounded-lg bg-zinc-800/50 border border-${color}-500/20`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                        <Icon className={`w-5 h-5 text-${color}-500`} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white">{result.source}</h4>
                        <div className="text-xs text-zinc-500 font-mono capitalize">{result.type}</div>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 uppercase`}>
                    {result.severity}
                </span>
            </div>

            {/* Data Found */}
            <div className="mb-3">
                <div className="text-xs text-zinc-600 font-mono mb-2">DATA EXPOSED:</div>
                <div className="flex flex-wrap gap-2">
                    {result.dataFound.map((data, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20"
                        >
                            {data}
                        </span>
                    ))}
                </div>
            </div>

            {/* First Seen */}
            {result.firstSeen && (
                <div className="text-xs text-zinc-500">
                    First seen: {new Date(result.firstSeen).toLocaleDateString()}
                </div>
            )}
        </div>
    );
}

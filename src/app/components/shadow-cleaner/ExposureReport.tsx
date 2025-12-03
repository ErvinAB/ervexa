"use client";

import { Database, AlertCircle, Calendar, ExternalLink } from "lucide-react";
import type { ExposureReport } from "@/lib/shadow-cleaner/types";

interface ExposureReportProps {
    exposures: ExposureReport[];
}

export default function ExposureReportComponent({ exposures }: ExposureReportProps) {
    if (exposures.length === 0 || exposures.every((e) => e.totalBreaches === 0)) {
        return (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 text-center">
                <Database className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Exposures Found</h3>
                <p className="text-zinc-400">Great news! Your email and phone are not in any known breaches.</p>
            </div>
        );
    }

    const totalBreaches = exposures.reduce((sum, e) => sum + e.totalBreaches, 0);

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Exposure Report</h2>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <AlertCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-400 font-mono text-sm">{totalBreaches} Breaches</span>
                </div>
            </div>

            <div className="space-y-6">
                {exposures.map((exposure, idx) => (
                    <ExposureCard key={idx} exposure={exposure} />
                ))}
            </div>
        </div>
    );
}

interface ExposureCardProps {
    exposure: ExposureReport;
}

function ExposureCard({ exposure }: ExposureCardProps) {
    const severityColors = {
        low: "emerald",
        medium: "yellow",
        high: "orange",
        critical: "red",
    };

    const color = severityColors[exposure.severity];

    return (
        <div className={`p-6 rounded-lg bg-zinc-800/50 border border-${color}-500/20`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-mono text-lg text-white">{exposure.value}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-mono bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 uppercase`}>
                            {exposure.severity}
                        </span>
                    </div>
                    <div className="text-sm text-zinc-500">
                        {exposure.type === "email" ? "Email Address" : "Phone Number"}
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-bold text-${color}-500`}>{exposure.totalBreaches}</div>
                    <div className="text-xs text-zinc-600 font-mono">BREACHES</div>
                </div>
            </div>

            {/* Breach List */}
            {exposure.breaches.length > 0 && (
                <div className="space-y-3">
                    <div className="text-xs text-zinc-600 font-mono uppercase">Affected Services:</div>
                    {exposure.breaches.slice(0, 5).map((breach, idx) => (
                        <div key={idx} className="p-4 rounded bg-zinc-900 border border-zinc-800">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="font-bold text-white mb-1">{breach.title || breach.name}</h4>
                                    {breach.domain && (
                                        <a
                                            href={`https://${breach.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                        >
                                            {breach.domain}
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(breach.breachDate).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Data Classes */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {breach.dataClasses.slice(0, 6).map((dataClass, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20"
                                    >
                                        {dataClass}
                                    </span>
                                ))}
                                {breach.dataClasses.length > 6 && (
                                    <span className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-500">
                                        +{breach.dataClasses.length - 6} more
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            {breach.description && (
                                <p className="text-xs text-zinc-500 mt-3 line-clamp-2">{breach.description}</p>
                            )}
                        </div>
                    ))}

                    {exposure.breaches.length > 5 && (
                        <div className="text-center text-sm text-zinc-600">
                            +{exposure.breaches.length - 5} more breaches
                        </div>
                    )}
                </div>
            )}

            {/* Recommendation */}
            <div className={`mt-4 p-4 rounded bg-${color}-500/5 border border-${color}-500/20`}>
                <div className="text-xs text-zinc-600 font-mono mb-2">RECOMMENDED ACTION:</div>
                <p className="text-sm text-zinc-300">
                    {exposure.type === "email" && "Change passwords for all affected accounts. Enable two-factor authentication. Consider using a password manager."}
                    {exposure.type === "phone" && "Enable call filtering. Register for Do Not Call lists. Monitor for suspicious activity."}
                </p>
            </div>
        </div>
    );
}

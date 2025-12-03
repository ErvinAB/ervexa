"use client";

import { AlertTriangle, Shield, Skull, MessageSquare, X } from "lucide-react";
import type { ThreatDetection } from "@/lib/shadow-cleaner/types";

interface ThreatListProps {
    threats: ThreatDetection[];
}

export default function ThreatList({ threats }: ThreatListProps) {
    if (threats.length === 0) {
        return (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 text-center">
                <Shield className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Threats Detected</h3>
                <p className="text-zinc-400">Your contacts look safe! Keep monitoring for new threats.</p>
            </div>
        );
    }

    // Group threats by severity
    const critical = threats.filter((t) => t.severity === "critical");
    const high = threats.filter((t) => t.severity === "high");
    const medium = threats.filter((t) => t.severity === "medium");
    const low = threats.filter((t) => t.severity === "low");

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detected Threats</h2>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 font-mono text-sm">{threats.length} Total</span>
                </div>
            </div>

            <div className="space-y-4">
                {/* Critical Threats */}
                {critical.length > 0 && (
                    <ThreatSection title="Critical" threats={critical} color="red" icon={Skull} />
                )}

                {/* High Threats */}
                {high.length > 0 && (
                    <ThreatSection title="High Risk" threats={high} color="orange" icon={AlertTriangle} />
                )}

                {/* Medium Threats */}
                {medium.length > 0 && (
                    <ThreatSection title="Medium Risk" threats={medium} color="yellow" icon={MessageSquare} />
                )}

                {/* Low Threats */}
                {low.length > 0 && (
                    <ThreatSection title="Low Risk" threats={low} color="blue" icon={MessageSquare} />
                )}
            </div>
        </div>
    );
}

interface ThreatSectionProps {
    title: string;
    threats: ThreatDetection[];
    color: string;
    icon: React.ElementType;
}

function ThreatSection({ title, threats, color, icon: Icon }: ThreatSectionProps) {
    return (
        <div className="space-y-3">
            <h3 className={`text-sm font-mono text-${color}-400 uppercase tracking-wider flex items-center gap-2`}>
                <Icon className="w-4 h-4" />
                {title} ({threats.length})
            </h3>

            {threats.map((threat) => (
                <ThreatCard key={threat.id} threat={threat} color={color} />
            ))}
        </div>
    );
}

interface ThreatCardProps {
    threat: ThreatDetection;
    color: string;
}

function ThreatCard({ threat, color }: ThreatCardProps) {
    const threatTypeLabels: Record<ThreatDetection["threatType"], string> = {
        scam: "Generic Scam",
        phishing: "Phishing Attempt",
        spam: "Spam",
        romance_scam: "Romance Scam",
        crypto_scam: "Crypto Scam",
        fake_profile: "Fake Profile",
    };

    return (
        <div className={`p-5 rounded-lg bg-zinc-800/50 border border-${color}-500/20 hover:border-${color}-500/40 transition-colors`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-white">{threat.contactName}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-mono bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                            {threatTypeLabels[threat.threatType]}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>Confidence: {Math.round(threat.confidence * 100)}%</span>
                        <span>•</span>
                        <span>{new Date(threat.detectedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Message Preview */}
            {threat.message && (
                <div className="mb-4 p-3 rounded bg-zinc-900 border border-zinc-800">
                    <div className="text-xs text-zinc-600 font-mono mb-1">MESSAGE:</div>
                    <p className="text-sm text-zinc-400 italic line-clamp-2">&quot;{threat.message}&quot;</p>
                </div>
            )}

            {/* Indicators */}
            <div className="mb-4">
                <div className="text-xs text-zinc-600 font-mono mb-2">DETECTED INDICATORS:</div>
                <div className="flex flex-wrap gap-2">
                    {threat.indicators.map((indicator, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 rounded text-xs bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                            {indicator}
                        </span>
                    ))}
                </div>
            </div>

            {/* Recommendation */}
            <div className={`p-3 rounded bg-${color}-500/5 border border-${color}-500/20`}>
                <div className="text-xs text-zinc-600 font-mono mb-1">RECOMMENDATION:</div>
                <p className="text-sm text-zinc-300">{threat.recommendation}</p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
                <button className={`flex-1 px-4 py-2 rounded bg-${color}-600 hover:bg-${color}-500 text-white text-sm font-mono transition-colors`}>
                    Block Contact
                </button>
                <button className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-mono transition-colors">
                    Report
                </button>
                <button className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-500 transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

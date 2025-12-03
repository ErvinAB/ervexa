"use client";

import { Shield, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ShadowScore } from "@/lib/shadow-cleaner/types";
import { formatScore } from "@/lib/shadow-cleaner/shadow-score";

interface ShadowScoreDashboardProps {
    shadowScore: ShadowScore;
}

export default function ShadowScoreDashboard({ shadowScore }: ShadowScoreDashboardProps) {
    const { score, threatLevel, breakdown, lastUpdated } = shadowScore;

    // Get color based on threat level
    const colorMap = {
        safe: "emerald",
        caution: "yellow",
        warning: "orange",
        critical: "red",
    };
    const color = colorMap[threatLevel];

    // Calculate percentage for circular progress
    const circumference = 2 * Math.PI * 120; // radius = 120
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Score Visualization */}
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-80 h-80">
                        {/* SVG Circle */}
                        <svg className="transform -rotate-90 w-full h-full">
                            {/* Background circle */}
                            <circle
                                cx="160"
                                cy="160"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="20"
                                fill="none"
                                className="text-zinc-800"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="160"
                                cy="160"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="20"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className={`text-${color}-500 transition-all duration-1000 ease-out`}
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Score Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Shield className={`w-16 h-16 text-${color}-500 mb-4`} />
                            <div className={`text-7xl font-bold text-${color}-500`}>{score}</div>
                            <div className="text-zinc-500 font-mono text-sm mt-2">SHADOW SCORE</div>
                            <div className={`text-${color}-400 font-bold text-lg mt-1 uppercase`}>
                                {formatScore(score)}
                            </div>
                        </div>
                    </div>

                    {/* Threat Level Badge */}
                    <div className={`mt-6 px-6 py-3 rounded-full bg-${color}-500/10 border border-${color}-500/20`}>
                        <div className="flex items-center gap-2">
                            {threatLevel === "safe" && <CheckCircle2 className={`w-5 h-5 text-${color}-500`} />}
                            {threatLevel === "caution" && <TrendingDown className={`w-5 h-5 text-${color}-500`} />}
                            {(threatLevel === "warning" || threatLevel === "critical") && (
                                <AlertTriangle className={`w-5 h-5 text-${color}-500`} />
                            )}
                            <span className={`text-${color}-400 font-mono text-sm uppercase tracking-wider`}>
                                {threatLevel} Level
                            </span>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-4 text-zinc-600 text-xs font-mono">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>

                {/* Breakdown */}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-6">Score Breakdown</h3>

                    <div className="space-y-4">
                        {/* Email Breaches */}
                        <BreakdownItem
                            label="Email Breaches"
                            value={breakdown.emailBreaches}
                            maxValue={5}
                            color="purple"
                            description="Data breaches involving your email"
                        />

                        {/* Phone Leaks */}
                        <BreakdownItem
                            label="Phone Leaks"
                            value={breakdown.phoneLeaks}
                            maxValue={3}
                            color="cyan"
                            description="Phone number exposures detected"
                        />

                        {/* Suspicious Contacts */}
                        <BreakdownItem
                            label="Suspicious Contacts"
                            value={breakdown.suspiciousContacts}
                            maxValue={10}
                            color="amber"
                            description="Contacts flagged as potentially dangerous"
                        />

                        {/* Scam Messages */}
                        <BreakdownItem
                            label="Scam Messages"
                            value={breakdown.scamMessages}
                            maxValue={5}
                            color="red"
                            description="High-confidence scam attempts detected"
                        />

                        {/* Privacy Gaps */}
                        <BreakdownItem
                            label="Privacy Gaps"
                            value={breakdown.privacyGaps}
                            maxValue={10}
                            color="blue"
                            description="Privacy settings that need attention"
                        />
                    </div>

                    {/* Summary */}
                    <div className="mt-8 p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
                        <h4 className="font-mono text-sm text-zinc-400 uppercase mb-2">Summary</h4>
                        <p className="text-zinc-300 leading-relaxed">
                            {score >= 80 && "Your digital footprint is well-protected. Keep monitoring for new threats."}
                            {score >= 60 && score < 80 && "Some exposure points detected. Review recommendations to improve your security."}
                            {score >= 40 && score < 60 && "Multiple security concerns found. Take action on high-priority recommendations."}
                            {score < 40 && "Critical security issues detected. Immediate action required to protect your identity."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Breakdown Item Component
interface BreakdownItemProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    description: string;
}

function BreakdownItem({ label, value, maxValue, color, description }: BreakdownItemProps) {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
        <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="font-mono text-sm text-white">{label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{description}</div>
                </div>
                <div className={`text-2xl font-bold text-${color}-500`}>{value}</div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-${color}-500 transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

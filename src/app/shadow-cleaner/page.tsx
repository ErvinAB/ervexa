"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Scan, FileText, Settings } from "lucide-react";
import ShadowScoreDashboard from "../components/shadow-cleaner/ShadowScoreDashboard";
import ScannerInterface from "../components/shadow-cleaner/ScannerInterface";
import ThreatList from "../components/shadow-cleaner/ThreatList";
import ExposureReportComponent from "../components/shadow-cleaner/ExposureReport";
import PrivacyAdvisor from "../components/shadow-cleaner/PrivacyAdvisor";
import type { ScanResponse } from "@/lib/shadow-cleaner/types";

type Tab = "dashboard" | "scanner" | "reports" | "privacy";

export default function ShadowCleanerPage() {
    const [activeTab, setActiveTab] = useState<Tab>("scanner");
    const [scanResult, setScanResult] = useState<ScanResponse | null>(null);

    const handleScanComplete = (result: ScanResponse) => {
        setScanResult(result);
        setActiveTab("dashboard");
    };

    return (
        <main className="min-h-screen bg-black text-zinc-100 antialiased">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] opacity-20" />
            </div>

            {/* Header */}
            <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Shield className="w-8 h-8 text-purple-500" />
                            <div>
                                <h1 className="text-2xl font-bold text-white">Shadow Cleaner</h1>
                                <p className="text-sm text-zinc-500 font-mono">Your Digital Guardian</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-mono transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="border-b border-zinc-800 bg-zinc-900/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2">
                        <TabButton
                            icon={Shield}
                            label="Dashboard"
                            isActive={activeTab === "dashboard"}
                            onClick={() => setActiveTab("dashboard")}
                            disabled={!scanResult}
                        />
                        <TabButton
                            icon={Scan}
                            label="Scanner"
                            isActive={activeTab === "scanner"}
                            onClick={() => setActiveTab("scanner")}
                        />
                        <TabButton
                            icon={FileText}
                            label="Reports"
                            isActive={activeTab === "reports"}
                            onClick={() => setActiveTab("reports")}
                            disabled={!scanResult}
                        />
                        <TabButton
                            icon={Settings}
                            label="Privacy Advisor"
                            isActive={activeTab === "privacy"}
                            onClick={() => setActiveTab("privacy")}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {activeTab === "scanner" && <ScannerInterface onScanComplete={handleScanComplete} />}

                {activeTab === "dashboard" && scanResult && (
                    <div className="space-y-8">
                        <ShadowScoreDashboard shadowScore={scanResult.shadowScore} />
                        {scanResult.threats.length > 0 && <ThreatList threats={scanResult.threats} />}
                        {scanResult.exposures.length > 0 && (
                            <ExposureReportComponent exposures={scanResult.exposures} />
                        )}
                    </div>
                )}

                {activeTab === "dashboard" && !scanResult && (
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-12 text-center">
                        <Scan className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Scan Results Yet</h3>
                        <p className="text-zinc-400 mb-6">Run a scan to see your Shadow Score and threats.</p>
                        <button
                            onClick={() => setActiveTab("scanner")}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-sm rounded-lg transition-all duration-300"
                        >
                            Go to Scanner
                        </button>
                    </div>
                )}

                {activeTab === "reports" && scanResult && (
                    <div className="space-y-8">
                        {scanResult.exposures.length > 0 && (
                            <ExposureReportComponent exposures={scanResult.exposures} />
                        )}
                        {scanResult.threats.length > 0 && <ThreatList threats={scanResult.threats} />}
                    </div>
                )}

                {activeTab === "reports" && !scanResult && (
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-12 text-center">
                        <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Reports Available</h3>
                        <p className="text-zinc-400">Run a scan to generate exposure and threat reports.</p>
                    </div>
                )}

                {activeTab === "privacy" && <PrivacyAdvisor />}
            </div>
        </main>
    );
}

// Tab Button Component
interface TabButtonProps {
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
}

function TabButton({ icon: Icon, label, isActive, onClick, disabled }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-6 py-4 font-mono text-sm transition-all border-b-2 ${isActive
                ? "border-purple-500 text-white bg-zinc-900/40"
                : disabled
                    ? "border-transparent text-zinc-600 cursor-not-allowed"
                    : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/20"
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, MessageSquare, Smartphone, Shield } from "lucide-react";
import { PRIVACY_CHECKLIST } from "@/lib/shadow-cleaner/constants";

export default function PrivacyAdvisor() {
    const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
    const [selectedPlatform, setSelectedPlatform] = useState<"TELEGRAM" | "WHATSAPP" | "GENERAL">("TELEGRAM");

    const toggleItem = (id: string) => {
        const newCompleted = new Set(completedItems);
        if (newCompleted.has(id)) {
            newCompleted.delete(id);
        } else {
            newCompleted.add(id);
        }
        setCompletedItems(newCompleted);
    };

    const checklist = PRIVACY_CHECKLIST[selectedPlatform];
    const completedCount = checklist.filter((item) => completedItems.has(item.id)).length;
    const progress = (completedCount / checklist.length) * 100;

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Hardening Guide</h2>

            {/* Platform Selector */}
            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => setSelectedPlatform("TELEGRAM")}
                    className={`flex-1 px-4 py-3 rounded-lg font-mono text-sm transition-all ${selectedPlatform === "TELEGRAM"
                        ? "bg-cyan-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                >
                    <MessageSquare className="inline-block w-4 h-4 mr-2" />
                    Telegram
                </button>
                <button
                    onClick={() => setSelectedPlatform("WHATSAPP")}
                    className={`flex-1 px-4 py-3 rounded-lg font-mono text-sm transition-all ${selectedPlatform === "WHATSAPP"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                >
                    <Smartphone className="inline-block w-4 h-4 mr-2" />
                    WhatsApp
                </button>
                <button
                    onClick={() => setSelectedPlatform("GENERAL")}
                    className={`flex-1 px-4 py-3 rounded-lg font-mono text-sm transition-all ${selectedPlatform === "GENERAL"
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                >
                    <Shield className="inline-block w-4 h-4 mr-2" />
                    General
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">
                        {completedCount} of {checklist.length} completed
                    </span>
                    <span className="text-sm font-mono text-cyan-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4">
                {checklist.map((item) => {
                    const isCompleted = completedItems.has(item.id);

                    return (
                        <div
                            key={item.id}
                            className={`p-5 rounded-lg border transition-all cursor-pointer ${isCompleted
                                ? "bg-emerald-500/5 border-emerald-500/20"
                                : "bg-zinc-800/50 border-zinc-800 hover:border-zinc-700"
                                }`}
                            onClick={() => toggleItem(item.id)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <button
                                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                                        ? "bg-emerald-500 border-emerald-500"
                                        : "border-zinc-600 hover:border-cyan-500"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    ) : (
                                        <Circle className="w-4 h-4 text-zinc-600" />
                                    )}
                                </button>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className={`font-bold ${isCompleted ? "text-emerald-400" : "text-white"}`}>
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                                            <Clock className="w-3 h-3" />
                                            {item.estimatedTime}
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-400 mb-3">{item.description}</p>

                                    {/* Steps */}
                                    <div className="space-y-2">
                                        {item.steps.map((step, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-500">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono">
                                                    {idx + 1}
                                                </span>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Completion Message */}
            {progress === 100 && (
                <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-emerald-400 font-bold">All tasks completed!</p>
                    <p className="text-sm text-zinc-400 mt-1">
                        Your {selectedPlatform.toLowerCase()} privacy is now significantly improved.
                    </p>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState } from "react";
import { X, Mail, Sparkles, CheckCircle2, Users } from "lucide-react";
import ButtonWithRipple from "../ButtonWithRipple";
import type { WaitlistResponse } from "@/lib/shadow-cleaner/waitlist-types";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: "homepage" | "shadow-cleaner" | "post-scan";
}

export default function WaitlistModal({ isOpen, onClose, source = "shadow-cleaner" }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<WaitlistResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/shadow-cleaner/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to join waitlist");
            }

            const data: WaitlistResponse = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setEmail("");
        setResult(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <div className="p-8">
                    {!result ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                                    <Sparkles className="w-8 h-8 text-purple-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Join Early Access</h2>
                                <p className="text-zinc-400">
                                    Be among the first to experience Shadow Cleaner and protect your digital identity.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-mono text-zinc-400 mb-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        required
                                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                <ButtonWithRipple
                                    type="submit"
                                    disabled={isSubmitting || !email}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-sm rounded-lg transition-all duration-300"
                                >
                                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                                </ButtonWithRipple>
                            </form>

                            <p className="text-xs text-zinc-600 text-center mt-4">
                                We&apos;ll notify you when Shadow Cleaner launches. No spam, ever.
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">You&apos;re In! 🎉</h2>
                                <p className="text-zinc-400 mb-6">{result.message.replace(/You're/g, "You&apos;re")}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                                        <div className="text-3xl font-bold text-purple-500">#{result.position}</div>
                                        <div className="text-xs text-zinc-500 font-mono mt-1">Your Position</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                                        <div className="text-3xl font-bold text-cyan-500 flex items-center justify-center gap-1">
                                            <Users className="w-6 h-6" />
                                            {result.totalWaitlist}
                                        </div>
                                        <div className="text-xs text-zinc-500 font-mono mt-1">Total Waitlist</div>
                                    </div>
                                </div>

                                {/* Referral Code */}
                                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-6">
                                    <div className="text-xs text-purple-400 font-mono mb-1">YOUR REFERRAL CODE</div>
                                    <div className="text-xl font-bold text-white font-mono">{result.referralCode}</div>
                                    <p className="text-xs text-zinc-500 mt-2">
                                        Share this code to move up the waitlist!
                                    </p>
                                </div>

                                <ButtonWithRipple
                                    onClick={handleClose}
                                    className="w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm rounded-lg transition-colors"
                                >
                                    Close
                                </ButtonWithRipple>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

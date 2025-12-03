"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Sparkles, HelpCircle } from "lucide-react";
import AnimatedScanButton from "./AnimatedScanButton";
import type { ScanResponse } from "@/lib/shadow-cleaner/types";
import { saveScanToHistory } from "@/lib/shadow-cleaner/history-utils";

interface ScannerInterfaceProps {
    onScanComplete: (result: ScanResponse) => void;
}

export default function ScannerInterface({ onScanComplete }: ScannerInterfaceProps) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [telegramMessages, setTelegramMessages] = useState("");
    const [whatsappMessages, setWhatsappMessages] = useState("");
    const [smsMessages, setSmsMessages] = useState("");
    const [checkDarkWeb, setCheckDarkWeb] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fillExample = () => {
        setEmail("test@example.com");
        setTelegramMessages("Hello dear, I have amazing bitcoin investment opportunity! Guaranteed 500% returns in 30 days!");
        setWhatsappMessages("URGENT: Your WhatsApp account will be suspended. Click here to verify now.");
        setSmsMessages("Your bank account has been locked. Click this link immediately to unlock.");
    };

    const handleScan = async () => {
        setError(null);

        // Validate input
        if (!email && !phone && !telegramMessages && !whatsappMessages && !smsMessages) {
            setError("Please enter at least one thing to check");
            throw new Error("No input provided");
        }

        try {
            // Parse messages into simple format
            const telegramContacts = telegramMessages.trim()
                ? [
                    {
                        username: "Unknown Contact",
                        lastMessage: telegramMessages,
                        accountAge: 30,
                    },
                ]
                : [];

            const whatsappContacts = whatsappMessages.trim()
                ? [
                    {
                        name: "Unknown Contact",
                        lastMessage: whatsappMessages,
                        isBusinessAccount: false,
                        isVerified: false,
                    },
                ]
                : [];

            const smsMessagesArray = smsMessages.trim()
                ? [
                    {
                        sender: "Unknown",
                        message: smsMessages,
                        hasLinks: smsMessages.includes("http") || smsMessages.includes("click"),
                    },
                ]
                : [];

            // Call API
            const response = await fetch("/api/shadow-cleaner/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email || undefined,
                    phone: phone || undefined,
                    telegramContacts: telegramContacts.length > 0 ? telegramContacts : undefined,
                    whatsappContacts: whatsappContacts.length > 0 ? whatsappContacts : undefined,
                    smsMessages: smsMessagesArray.length > 0 ? smsMessagesArray : undefined,
                    checkDarkWeb,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Scan failed");
            }

            const result: ScanResponse = await response.json();

            // Save to history
            saveScanToHistory(result);

            onScanComplete(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            throw err;
        }
    };

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Check Your Digital Safety</h2>
                <button
                    onClick={fillExample}
                    className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 transition-colors"
                >
                    <Sparkles className="w-3 h-3" />
                    Try Example
                </button>
            </div>

            <div className="space-y-6">
                {/* Email Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@gmail.com"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        We&apos;ll check if your email was in any data breaches
                    </p>
                </div>

                {/* Phone Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        Phone Number (Optional)
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        Check if your number was leaked online
                    </p>
                </div>

                {/* Telegram Messages */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <MessageCircle className="w-4 h-4 text-cyan-400" />
                        Suspicious Telegram Message (Optional)
                    </label>
                    <textarea
                        value={telegramMessages}
                        onChange={(e) => setTelegramMessages(e.target.value)}
                        placeholder="Paste any suspicious message you received..."
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        We&apos;ll detect romance scams, crypto scams, and phishing
                    </p>
                </div>

                {/* WhatsApp Messages */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        Suspicious WhatsApp Message (Optional)
                    </label>
                    <textarea
                        value={whatsappMessages}
                        onChange={(e) => setWhatsappMessages(e.target.value)}
                        placeholder="Paste any suspicious WhatsApp message..."
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        Detects fake businesses, delivery scams, and impersonation
                    </p>
                </div>

                {/* SMS Messages */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        Suspicious Text Message (Optional)
                    </label>
                    <textarea
                        value={smsMessages}
                        onChange={(e) => setSmsMessages(e.target.value)}
                        placeholder="Paste any suspicious SMS/text message..."
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        Detects bank scams, fake delivery, tax scams, and prize scams
                    </p>
                </div>

                {/* Dark Web Check */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <input
                        type="checkbox"
                        id="darkweb"
                        checked={checkDarkWeb}
                        onChange={(e) => setCheckDarkWeb(e.target.checked)}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="darkweb" className="flex-1 text-sm text-zinc-300 cursor-pointer">
                        <span className="font-medium text-white">Check Dark Web</span>
                        <span className="block text-xs text-zinc-500 mt-0.5">
                            Search if your data appears on dark web forums or marketplaces
                        </span>
                    </label>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Animated Scan Button */}
                <AnimatedScanButton
                    onScan={handleScan}
                    disabled={!email && !phone && !telegramMessages && !whatsappMessages && !smsMessages}
                />

                {/* Privacy Note */}
                <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        <strong className="text-white">🔒 Your Privacy Matters:</strong> Your data is analyzed securely and never stored on our servers.
                        Scan results are saved locally in your browser for your convenience.
                    </p>
                </div>
            </div>
        </div>
    );
}

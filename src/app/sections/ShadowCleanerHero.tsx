"use client";

import { Shield, Scan, Brain, Activity, Lock, ArrowRight } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import ButtonWithRipple from "../components/ButtonWithRipple";
import Link from "next/link";

const FEATURES = [
    {
        id: "telegram",
        icon: Scan,
        title: "Telegram Scam Detector",
        description: "Stops suspicious accounts before they reach you. Detects romance scams, crypto fraud, and phishing attempts.",
        color: "text-cyan-400",
    },
    {
        id: "exposure",
        icon: Activity,
        title: "Digital Exposure Scan",
        description: "Checks if your data is leaked or exposed online. Monitors email breaches and phone number leaks.",
        color: "text-purple-400",
    },
    {
        id: "ai",
        icon: Brain,
        title: "AI Threat Classification",
        description: "Detects scam messages, fake profiles, romance scams, and phishing patterns using advanced AI.",
        color: "text-amber-400",
    },
    {
        id: "score",
        icon: Shield,
        title: "Shadow Score",
        description: "A simple score (0-100) that shows how safe you are. Real-time monitoring of your digital safety.",
        color: "text-emerald-400",
    },
    {
        id: "privacy",
        icon: Lock,
        title: "Privacy Hardening",
        description: "Guides you to lock down your accounts securely. Step-by-step instructions for Telegram, WhatsApp, and more.",
        color: "text-blue-400",
    },
];

export default function ShadowCleanerHero() {
    return (
        <section className="relative py-32 bg-black overflow-hidden border-t border-zinc-800" id="shadow-cleaner">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] opacity-20" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <ScrollAnimationWrapper variant="fade-in">
                    <div className="text-center mb-20">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </div>
                            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                                New Product Launch
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Shadow Cleaner
                        </h1>
                        <p className="text-2xl md:text-3xl text-zinc-400 mb-4">
                            Your Digital <span className="text-white">Guardian</span>
                        </p>

                        {/* Subtext */}
                        <p className="text-lg text-zinc-500 max-w-3xl mx-auto mb-12 leading-relaxed">
                            AI that cleans your digital shadows, detects threats, and protects your identity.
                            <br />
                            Stagbyte Shadow Cleaner quietly hunts down exposure points across your digital life — unknown contacts, leaked emails, suspicious messages, scam attempts, and privacy risks — and helps you eliminate them with one tap.
                        </p>

                        {/* CTA */}
                        <Link href="/shadow-cleaner">
                            <ButtonWithRipple className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-sm rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                                Get Early Access
                                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </ButtonWithRipple>
                        </Link>
                    </div>
                </ScrollAnimationWrapper>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {FEATURES.map((feature, index) => (
                        <ScrollAnimationWrapper key={feature.id} variant="slide-up" delay={index * 0.1}>
                            <div className="group relative p-8 h-full rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300 hover:border-purple-500/30">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl pointer-events-none" />

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-xl text-white mb-3 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 w-full h-0.5 ${feature.color.replace('text-', 'bg-')} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                            </div>
                        </ScrollAnimationWrapper>
                    ))}
                </div>

                {/* Tagline */}
                <ScrollAnimationWrapper variant="fade-in">
                    <div className="text-center">
                        <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest">
                            Clean your shadows. Protect your identity.
                        </p>
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </section>
    );
}

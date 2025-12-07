"use client";

import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import ContentGeneratorInterface from "../components/content-engine/ContentGeneratorInterface";
import TrendingTopics from "../components/content-engine/TrendingTopics";
import ContentHistory from "../components/content-engine/ContentHistory";
import type { TrendingTopic, ContentHistory as ContentHistoryType } from "@/lib/content-engine/content-types";

export default function ContentEnginePage() {
    const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
    const [history, setHistory] = useState<ContentHistoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch trending topics on mount
        fetchTrendingTopics();

        // Load history from localStorage
        const savedHistory = localStorage.getItem("content-engine-history");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const fetchTrendingTopics = async () => {
        try {
            const response = await fetch("/api/content-engine/trending");
            const data = await response.json();
            if (data.success) {
                setTrendingTopics(data.topics);
            }
        } catch (error) {
            console.error("Failed to fetch trending topics:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveToHistory = (item: ContentHistoryType) => {
        const newHistory = [item, ...history].slice(0, 50); // Keep last 50
        setHistory(newHistory);
        localStorage.setItem("content-engine-history", JSON.stringify(newHistory));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-black py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-mono mb-6">
                            <Sparkles className="w-4 h-4" />
                            AI-POWERED CONTENT ENGINE
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
                            CONTENT_ENGINE_V2
                        </h1>

                        <p className="text-xl text-zinc-400 mb-8">
                            Generate high-quality content for LinkedIn, Twitter, and blogs in seconds.
                            <br />
                            AI-powered. Platform-optimized. Ready to publish.
                        </p>

                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-cyan-500" />
                                <span className="text-zinc-500">5 Variations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-zinc-500">Engagement Scoring</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span className="text-zinc-500">SEO Optimized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Sidebar - Trending Topics */}
                        <div className="lg:col-span-1">
                            <TrendingTopics topics={trendingTopics} loading={loading} />
                        </div>

                        {/* Main Generator */}
                        <div className="lg:col-span-2">
                            <ContentGeneratorInterface
                                onSaveToHistory={handleSaveToHistory}
                            />
                        </div>
                    </div>

                    {/* Content History */}
                    {history.length > 0 && (
                        <div className="mt-12">
                            <ContentHistory
                                history={history}
                                onDelete={(id: string) => {
                                    const newHistory = history.filter(item => item.id !== id);
                                    setHistory(newHistory);
                                    localStorage.setItem("content-engine-history", JSON.stringify(newHistory));
                                }}
                            />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import type {
    ContentGenerationRequest,
    ContentGenerationResponse,
    ContentHistory as ContentHistoryType,
    Platform,
    Tone,
    ContentLength,
} from "@/lib/content-engine/content-types";
import ContentVariationCard from "./ContentVariationCard";

interface ContentGeneratorInterfaceProps {
    onSaveToHistory: (item: ContentHistoryType) => void;
}

export default function ContentGeneratorInterface({
    onSaveToHistory,
}: ContentGeneratorInterfaceProps) {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState<Platform>("linkedin");
    const [tone, setTone] = useState<Tone>("professional");
    const [length, setLength] = useState<ContentLength>("medium");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ContentGenerationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Listen for topic selection from trending topics
    useEffect(() => {
        const handleSelectTopic = (e: Event) => {
            const customEvent = e as CustomEvent;
            setTopic(customEvent.detail);
        };

        window.addEventListener("selectTopic", handleSelectTopic);
        return () => window.removeEventListener("selectTopic", handleSelectTopic);
    }, []);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const request: ContentGenerationRequest = {
            topic: topic.trim(),
            platform,
            tone,
            length,
            includeHashtags: true,
            includeCTA: true,
        };

        try {
            const response = await fetch("/api/content-engine/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to generate content");
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate content");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-sm font-mono text-cyan-500 mb-4">CONTENT_GENERATOR</h3>

                {/* Topic Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Topic or Idea
                    </label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The future of AI in business automation"
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                {/* Platform Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Platform
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["linkedin", "twitter", "blog"] as Platform[]).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p)}
                                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${platform === p
                                        ? "bg-cyan-500 text-black"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    }`}
                            >
                                {p.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tone Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Tone
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(["professional", "casual", "technical", "storytelling"] as Tone[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTone(t)}
                                className={`px-3 py-2 rounded-lg text-sm transition-all ${tone === t
                                        ? "bg-purple-500 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    }`}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Length Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Length
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["short", "medium", "long"] as ContentLength[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLength(l)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${length === l
                                        ? "bg-emerald-500 text-black"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    }`}
                            >
                                {l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Content
                        </>
                    )}
                </button>

                {error && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                            Generated Variations ({result.variations.length})
                        </h3>
                        <span className="text-xs text-zinc-500 font-mono">
                            {new Date(result.generatedAt).toLocaleString()}
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {result.variations.map((variation, index) => (
                            <ContentVariationCard
                                key={variation.id}
                                variation={variation}
                                index={index}
                                onSave={() => {
                                    const historyItem: ContentHistoryType = {
                                        id: `history-${Date.now()}`,
                                        topic: result.topic,
                                        platform: variation.platform,
                                        selectedVariation: variation,
                                        generatedAt: new Date(result.generatedAt),
                                        wasPublished: false,
                                    };
                                    onSaveToHistory(historyItem);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

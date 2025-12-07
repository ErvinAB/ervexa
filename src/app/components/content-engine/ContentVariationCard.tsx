"use client";

import { useState, useEffect } from "react";
import { Copy, Check, TrendingUp, Hash, Clock, Edit2, Save, Info, Sparkles, AlertCircle } from "lucide-react";
import type { ContentVariation } from "@/lib/content-engine/content-types";
import { scoreEngagement, type EngagementAnalysis } from "@/lib/content-engine/engagement-scorer";

interface ContentVariationCardProps {
    variation: ContentVariation;
    index: number;
    onSave: () => void;
}

export default function ContentVariationCard({
    variation,
    index,
    onSave,
}: ContentVariationCardProps) {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(variation.content);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [analysis, setAnalysis] = useState<EngagementAnalysis | null>(null);

    // Calculate engagement analysis
    useEffect(() => {
        const result = scoreEngagement(variation.content, variation.platform);
        setAnalysis(result);
    }, [variation.content, variation.platform]);

    const handleCopy = () => {
        navigator.clipboard.writeText(isEditing ? editedContent : variation.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave();
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-500";
        if (score >= 60) return "text-yellow-500";
        if (score >= 40) return "text-orange-500";
        return "text-red-500";
    };

    const getScoreBgColor = (score: number) => {
        if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
        if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
        if (score >= 40) return "bg-orange-500/10 border-orange-500/20";
        return "bg-red-500/10 border-red-500/20";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Fair";
        return "Needs Work";
    };

    const score = analysis?.score.overall || variation.engagementScore;

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                        VARIATION #{index + 1}
                    </div>

                    {/* Engagement Score Badge */}
                    <div className="relative">
                        <button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getScoreBgColor(score)} transition-all hover:scale-105`}
                        >
                            <TrendingUp className={`w-4 h-4 ${getScoreColor(score)}`} />
                            <span className={`text-sm font-mono font-bold ${getScoreColor(score)}`}>
                                {score}
                            </span>
                            <span className={`text-xs ${getScoreColor(score)}`}>
                                {getScoreLabel(score)}
                            </span>
                            <Info className={`w-3 h-3 ${getScoreColor(score)}`} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        title={isEditing ? "Cancel editing" : "Edit content"}
                    >
                        <Edit2 className="w-4 h-4 text-zinc-400" />
                    </button>

                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                        )}
                    </button>
                </div>
            </div>

            {/* Engagement Breakdown */}
            {showBreakdown && analysis && (
                <div className="mb-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        Engagement Analysis
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Hashtags:</span>
                            <span className={getScoreColor(analysis.score.breakdown.hashtags)}>
                                {analysis.score.breakdown.hashtags}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Emojis:</span>
                            <span className={getScoreColor(analysis.score.breakdown.emojis)}>
                                {analysis.score.breakdown.emojis}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Readability:</span>
                            <span className={getScoreColor(analysis.score.breakdown.readability)}>
                                {analysis.score.breakdown.readability}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Structure:</span>
                            <span className={getScoreColor(analysis.score.breakdown.structure)}>
                                {analysis.score.breakdown.structure}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Length:</span>
                            <span className={getScoreColor(analysis.score.breakdown.length)}>
                                {analysis.score.breakdown.length}
                            </span>
                        </div>
                    </div>

                    {/* Strengths */}
                    {analysis.score.strengths.length > 0 && (
                        <div className="pt-2 border-t border-zinc-700">
                            <div className="text-xs text-emerald-400 font-medium mb-1">✓ Strengths:</div>
                            <ul className="text-xs text-zinc-300 space-y-1">
                                {analysis.score.strengths.map((strength, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                        <span className="text-emerald-500">•</span>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Suggestions */}
                    {analysis.score.suggestions.length > 0 && (
                        <div className="pt-2 border-t border-zinc-700">
                            <div className="flex items-center gap-1 text-xs text-orange-400 font-medium mb-1">
                                <AlertCircle className="w-3 h-3" />
                                Suggestions:
                            </div>
                            <ul className="text-xs text-zinc-300 space-y-1">
                                {analysis.score.suggestions.map((suggestion, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                        <span className="text-orange-500">•</span>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Content */}
            {isEditing ? (
                <div className="mb-4">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full min-h-[200px] px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                    <button
                        onClick={handleSave}
                        className="mt-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                        {variation.content}
                    </p>
                </div>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{variation.estimatedReadTime}</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="font-mono">{variation.characterCount} chars</span>
                </div>

                {analysis && (
                    <div className="flex items-center gap-1">
                        <span className="font-mono">{analysis.details.wordCount} words</span>
                    </div>
                )}

                {variation.hashtags.length > 0 && (
                    <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        <span>{variation.hashtags.length} hashtags</span>
                    </div>
                )}

                {variation.seoScore && (
                    <div className="flex items-center gap-1">
                        <span className="font-mono">SEO: {variation.seoScore}</span>
                    </div>
                )}
            </div>

            {/* Hashtags */}
            {variation.hashtags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {variation.hashtags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 rounded bg-zinc-800/50 text-cyan-400 text-xs font-mono"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

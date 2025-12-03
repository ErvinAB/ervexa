"use client";

import { useState, useEffect } from 'react';
import { Send, Loader2, Building2, Mail, AlertCircle, Lock, ArrowRight } from 'lucide-react';

interface AnalysisResult {
    error?: string;
    company?: {
        name: string;
        description: string;
    };
    outreach?: {
        subject: string;
        body: string;
        reasoning: string;
    };
}

export default function SDRAgentPage() {
    const [url, setUrl] = useState('');
    const [valueProp, setValueProp] = useState('We help companies scale their AI automations.');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [usageCount, setUsageCount] = useState(0);
    const [showLimitModal, setShowLimitModal] = useState(false);

    useEffect(() => {
        const count = parseInt(localStorage.getItem('sdr_agent_usage') || '0');
        setUsageCount(count);
    }, []);

    const handleAnalyze = async () => {
        if (!url) return;

        if (usageCount >= 3) {
            setShowLimitModal(true);
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/agents/sdr/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, valueProp }),
            });
            const data = await res.json();
            setResult(data);

            // Increment usage if successful
            if (!data.error) {
                const newCount = usageCount + 1;
                setUsageCount(newCount);
                localStorage.setItem('sdr_agent_usage', newCount.toString());
            }
        } catch (error) {
            console.error(error);
            setResult({ error: 'Failed to connect to the agent API.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans relative">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 text-cyan-500 mb-2">
                            <span className="text-xs font-mono tracking-widest uppercase">Autonomous Agent</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">SDR_SNIPER_V1</h1>
                        <p className="text-zinc-500 mt-2">Targeted outreach automation. Input a URL, get a personalized cold email.</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-zinc-500 uppercase mb-1">Free Tries Left</div>
                        <div className="text-2xl font-mono text-white">{Math.max(0, 3 - usageCount)}/3</div>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Target Company URL</label>
                            <input
                                type="text"
                                placeholder="e.g. stripe.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">My Value Proposition</label>
                            <textarea
                                rows={4}
                                value={valueProp}
                                onChange={(e) => setValueProp(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !url}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Analyzing Target...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Generate Outreach
                                </>
                            )}
                        </button>

                        <div className="md:hidden text-center text-xs text-zinc-500">
                            {Math.max(0, 3 - usageCount)} free generations remaining
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="space-y-6">
                        {result?.error ? (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-red-500 text-sm mb-1">Analysis Failed</h3>
                                    <p className="text-sm text-red-400/80">{result.error}</p>
                                </div>
                            </div>
                        ) : result?.company && result?.outreach ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Company Analysis */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                                    <div className="flex items-center gap-2 text-emerald-500 mb-4">
                                        <Building2 className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Target Analyzed</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{result.company.name}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{result.company.description}</p>
                                </div>

                                {/* Email Draft */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                    <div className="flex items-center gap-2 text-cyan-500 mb-4">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Drafted Email</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-zinc-500 uppercase block mb-1">Subject</span>
                                            <div className="text-white font-medium">{result.outreach.subject}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-zinc-500 uppercase block mb-1">Body</span>
                                            <div className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
                                                {result.outreach.body}
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-zinc-800/50">
                                            <span className="text-xs text-zinc-500 uppercase block mb-1">AI Reasoning</span>
                                            <div className="text-xs text-zinc-500 italic">
                                                &quot;{result.outreach.reasoning}&quot;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-lg p-12">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                                    <Send className="w-6 h-6 opacity-20" />
                                </div>
                                <p className="text-sm">Ready to hunt. Input a target to begin.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Limit Reached Modal */}
            {showLimitModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-cyan-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">Free Trial Limit Reached</h2>
                        <p className="text-zinc-400 mb-8">
                            You&apos;ve used all 3 free generations. To continue using the Autonomous SDR Agent and scale your outreach, please upgrade your plan.
                        </p>

                        <div className="space-y-3">
                            <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                Get Unlimited Access <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowLimitModal(false)}
                                className="text-sm text-zinc-500 hover:text-white transition-colors"
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Database, Brain, Zap, MessageSquare, FileText, Share2, ArrowRight } from "lucide-react";

const NODES = [
    {
        id: "ingest",
        label: "DATA_INGESTION",
        icon: Database,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        id: "process",
        label: "NEURAL_PROCESSING",
        icon: Brain,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        id: "action",
        label: "AUTONOMOUS_ACTION",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    }
];

export default function ArchitectureDiagram() {
    return (
        <div className="w-full p-8 rounded-xl border border-zinc-800 bg-black/50 backdrop-blur-sm relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] opacity-50" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {NODES.map((node, index) => (
                    <div key={node.id} className="flex items-center">
                        {/* Node Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`relative group w-48 p-4 rounded-lg border ${node.border} ${node.bg} backdrop-blur-md`}
                        >
                            <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
                            <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className={`p-3 rounded-full bg-black/40 ${node.color}`}>
                                    <node.icon className="w-6 h-6" />
                                </div>
                                <div className="font-mono text-xs font-bold tracking-wider text-zinc-300">
                                    {node.label}
                                </div>
                            </div>

                            {/* Hover Details */}
                            <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                <span className="font-mono text-[10px] text-cyan-400">VIEW_LOGS >></span>
                            </div>
                        </motion.div>

                        {/* Connector Arrow (not for last item) */}
                        {index < NODES.length - 1 && (
                            <div className="hidden md:flex items-center justify-center w-16 text-zinc-600">
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-6 h-6" />
                                </motion.div>
                            </div>
                        )}

                        {/* Mobile Connector (Down Arrow) */}
                        {index < NODES.length - 1 && (
                            <div className="md:hidden flex items-center justify-center h-12 text-zinc-600">
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-6 h-6 rotate-90" />
                                </motion.div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Simulated Data Flow Particles */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 overflow-hidden pointer-events-none hidden md:block">
                <motion.div
                    className="w-20 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </div>
    );
}

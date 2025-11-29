"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
    { text: "INITIALIZING_NEURAL_LINK...", type: "info" },
    { text: "CONNECTING_TO_MAINNET", type: "info" },
    { text: "OPTIMIZING_WORKFLOW_NODES", type: "success" },
    { text: "DETECTED_INEFFICIENCY_IN_SECTOR_7", type: "warning" },
    { text: "DEPLOYING_AGENT_SWARM", type: "success" },
    { text: "ANALYZING_DATA_STREAMS", type: "info" },
    { text: "SYNCHRONIZING_DATABASES", type: "info" },
    { text: "SECURITY_PROTOCOL_ALPHA_ACTIVE", type: "success" },
];

export default function SystemStatus() {
    const [lines, setLines] = useState<typeof COMMANDS>([]);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setLines((prev) => {
                const newLines = [...prev, COMMANDS[currentIndex]];
                if (newLines.length > 5) newLines.shift();
                return newLines;
            });
            currentIndex = (currentIndex + 1) % COMMANDS.length;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs md:text-sm bg-black/40 backdrop-blur-md border border-zinc-800/60 rounded-lg p-4 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-3 border-b border-zinc-800/60 pb-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider ml-2">System_Log.sh</span>
            </div>

            <div className="flex flex-col gap-1.5 min-h-[120px]">
                <AnimatePresence mode="popLayout">
                    {lines.map((line, i) => (
                        <motion.div
                            key={`${line.text}-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-zinc-600">➜</span>
                            <span
                                className={`${line.type === "success"
                                        ? "text-emerald-400"
                                        : line.type === "warning"
                                            ? "text-amber-400"
                                            : "text-blue-400"
                                    }`}
                            >
                                {line.text}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

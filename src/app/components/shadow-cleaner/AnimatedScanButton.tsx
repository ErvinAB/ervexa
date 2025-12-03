"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ButtonWithRipple from "../ButtonWithRipple";
import ShadowCleanerLogo from "./ShadowCleanerLogo";

interface AnimatedScanButtonProps {
    onScan: () => Promise<void>;
    disabled?: boolean;
}

export default function AnimatedScanButton({
    onScan,
    disabled = false,
}: AnimatedScanButtonProps) {
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        setIsScanning(true);
        try {
            await onScan();
        } finally {
            // Keep animation running for a bit after scan completes
            setTimeout(() => {
                setIsScanning(false);
            }, 1000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Animated Logo */}
            <div className="flex justify-center">
                <ShadowCleanerLogo isScanning={isScanning} size={160} />
            </div>

            {/* Scan Button */}
            <ButtonWithRipple
                onClick={handleScan}
                disabled={disabled || isScanning}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-sm rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
                {isScanning ? (
                    <>
                        <Loader2 className="inline-block w-5 h-5 mr-2 animate-spin" />
                        Cleaning Your Shadows...
                    </>
                ) : (
                    <>
                        <Sparkles className="inline-block w-5 h-5 mr-2" />
                        Start Shadow Scan
                    </>
                )}
            </ButtonWithRipple>

            {/* Status Text */}
            {isScanning && (
                <div className="text-center">
                    <p className="text-sm text-purple-400 font-mono animate-pulse">
                        Analyzing digital footprint...
                    </p>
                </div>
            )}
        </div>
    );
}

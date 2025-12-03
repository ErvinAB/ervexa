"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

interface ShadowCleanerLogoProps {
    isScanning?: boolean;
    size?: number;
    className?: string;
}

export default function ShadowCleanerLogo({
    isScanning = false,
    size = 120,
    className = "",
}: ShadowCleanerLogoProps) {
    const [pixels, setPixels] = useState<boolean[]>([]);
    const gridSize = 20; // 20x20 grid of pixels
    const totalPixels = gridSize * gridSize;

    // Initialize pixels
    useEffect(() => {
        setPixels(new Array(totalPixels).fill(true));
    }, [totalPixels]);

    // Pixel dissolve animation
    useEffect(() => {
        if (!isScanning) {
            // Reset pixels when not scanning
            setPixels(new Array(totalPixels).fill(true));
            return;
        }

        // Dissolve pixels randomly
        const interval = setInterval(() => {
            setPixels((prev) => {
                const remaining = prev.filter((p) => p).length;
                if (remaining === 0) return prev;

                // Find a random pixel that's still visible
                const visibleIndices = prev
                    .map((visible, idx) => (visible ? idx : -1))
                    .filter((idx) => idx !== -1);

                if (visibleIndices.length === 0) return prev;

                const randomIndex =
                    visibleIndices[Math.floor(Math.random() * visibleIndices.length)];

                const newPixels = [...prev];
                newPixels[randomIndex] = false;
                return newPixels;
            });
        }, 30); // Dissolve one pixel every 30ms

        return () => clearInterval(interval);
    }, [isScanning, totalPixels]);

    const pixelSize = size / gridSize;

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            {/* Shield Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Shield
                    className="w-full h-full text-purple-500/20"
                    strokeWidth={1.5}
                />
            </div>

            {/* Clean Shield (revealed as pixels dissolve) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Shield
                    className={`w-full h-full transition-all duration-1000 ${isScanning ? "text-emerald-500" : "text-purple-500/0"
                        }`}
                    strokeWidth={2}
                />
            </div>

            {/* SB Logo with Pixel Grid Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: size * 0.5, height: size * 0.5 }}>
                    {/* SB Logo */}
                    <img
                        src="/logoSBWhite.svg"
                        alt="SB"
                        className="w-full h-full object-contain"
                    />

                    {/* Pixel Grid Overlay */}
                    <div
                        className="absolute inset-0 grid"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                        }}
                    >
                        {pixels.map((visible, idx) => (
                            <div
                                key={idx}
                                className={`transition-opacity duration-200 ${visible ? "bg-black opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    width: pixelSize * 0.5,
                                    height: pixelSize * 0.5,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scanning Pulse Effect */}
            {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-full h-full rounded-full bg-purple-500/20 animate-ping" />
                    <div className="absolute w-full h-full rounded-full bg-cyan-500/20 animate-ping animation-delay-500" />
                </div>
            )}
        </div>
    );
}

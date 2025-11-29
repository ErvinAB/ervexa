"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimationWrapperProps {
    children: ReactNode;
    variant?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";
    delay?: number;
    duration?: number;
    once?: boolean;
    className?: string;
}

const animationVariants: Record<string, Variants> = {
    "fade-in": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    "slide-up": {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function ScrollAnimationWrapper({
    children,
    variant = "fade-in",
    delay = 0,
    duration = 0.6,
    once = true,
    className = "",
}: ScrollAnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        margin: "-100px",
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animationVariants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

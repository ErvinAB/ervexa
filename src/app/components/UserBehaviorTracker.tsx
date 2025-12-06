"use client";

import { useEffect, useRef } from "react";
import { usePersonalization } from "../context/PersonalizationContext";

export default function UserBehaviorTracker() {
    const { updateBehavior, trackSectionView } = usePersonalization();
    const startTime = useRef(Date.now());
    const maxScrollDepth = useRef(0);

    useEffect(() => {
        // Only run in browser environment
        if (typeof window === "undefined") return;

        // Track time on page
        const interval = setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
            updateBehavior({ timeOnPage });
        }, 5000); // Update every 5 seconds

        // Track scroll depth
        const handleScroll = () => {
            if (typeof window === "undefined") return;

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollDepth = Math.floor((window.scrollY / scrollHeight) * 100);

            if (scrollDepth > maxScrollDepth.current) {
                maxScrollDepth.current = scrollDepth;
                updateBehavior({ scrollDepth });
            }
        };

        // Track section visibility with IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        if (sectionId) {
                            trackSectionView(sectionId);
                        }
                    }
                });
            },
            { threshold: 0.5 } // Track when 50% visible
        );

        // Observe all sections (with a small delay to ensure DOM is ready)
        setTimeout(() => {
            const sections = document.querySelectorAll("section[id]");
            sections.forEach((section) => observer.observe(section));
        }, 100);

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [updateBehavior, trackSectionView]);

    return null; // This component doesn't render anything
}

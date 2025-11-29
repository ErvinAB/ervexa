"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    getUserBehavior,
    saveUserBehavior,
    analyzeUserPersona,
    type UserBehavior,
    type UserPersona,
} from "../utils/personalization-utils";

interface PersonalizationContextType {
    behavior: UserBehavior;
    persona: UserPersona;
    updateBehavior: (updates: Partial<UserBehavior>) => void;
    trackSectionView: (sectionId: string) => void;
    trackClick: (elementId: string) => void;
    isReturningUser: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
    // Start with default values to ensure server/client match
    const [behavior, setBehavior] = useState<UserBehavior>(() => ({
        scrollDepth: 0,
        timeOnPage: 0,
        sectionsViewed: [],
        clickedElements: [],
        visitCount: 0,
    }));
    const [persona, setPersona] = useState<UserPersona>(() => ({
        type: "unknown",
        confidence: 0,
        interests: [],
    }));
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [mounted, setMounted] = useState(false);

    // First effect: mark as mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    // Second effect: load personalization after mount (client-only)
    useEffect(() => {
        if (!mounted) return;

        // Load behavior on mount
        const loadedBehavior = getUserBehavior();
        const isReturning = loadedBehavior.visitCount > 0;

        // Increment visit count
        const updatedBehavior = {
            ...loadedBehavior,
            visitCount: loadedBehavior.visitCount + 1,
            lastVisit: Date.now(),
        };

        setBehavior(updatedBehavior);
        setIsReturningUser(isReturning);
        setPersona(analyzeUserPersona(updatedBehavior));
        saveUserBehavior(updatedBehavior);
    }, [mounted]);

    const updateBehavior = (updates: Partial<UserBehavior>) => {
        const newBehavior = { ...behavior, ...updates };
        setBehavior(newBehavior);
        setPersona(analyzeUserPersona(newBehavior));
        saveUserBehavior(newBehavior);
    };

    const trackSectionView = (sectionId: string) => {
        if (!behavior.sectionsViewed.includes(sectionId)) {
            updateBehavior({
                sectionsViewed: [...behavior.sectionsViewed, sectionId],
            });
        }
    };

    const trackClick = (elementId: string) => {
        updateBehavior({
            clickedElements: [...behavior.clickedElements, elementId],
        });
    };

    return (
        <PersonalizationContext.Provider
            value={{
                behavior,
                persona,
                updateBehavior,
                trackSectionView,
                trackClick,
                isReturningUser,
            }}
        >
            {children}
        </PersonalizationContext.Provider>
    );
}

export function usePersonalization() {
    const context = useContext(PersonalizationContext);
    if (context === undefined) {
        throw new Error("usePersonalization must be used within PersonalizationProvider");
    }
    return context;
}

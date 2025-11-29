// Utility functions for AI personalization

export interface UserBehavior {
    scrollDepth: number;
    timeOnPage: number;
    sectionsViewed: string[];
    clickedElements: string[];
    lastVisit?: number;
    visitCount: number;
}

export interface UserPersona {
    type: "technical" | "business" | "operations" | "unknown";
    confidence: number;
    interests: string[];
}

const STORAGE_KEY = "stagbyte_user_behavior";

// Get user behavior from localStorage
export function getUserBehavior(): UserBehavior {
    if (typeof window === "undefined") return getDefaultBehavior();

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return getDefaultBehavior();
        return JSON.parse(stored);
    } catch {
        return getDefaultBehavior();
    }
}

// Save user behavior to localStorage
export function saveUserBehavior(behavior: UserBehavior): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
    } catch (error) {
        console.error("Failed to save user behavior:", error);
    }
}

// Get default behavior for new users
function getDefaultBehavior(): UserBehavior {
    return {
        scrollDepth: 0,
        timeOnPage: 0,
        sectionsViewed: [],
        clickedElements: [],
        visitCount: 0,
    };
}

// Analyze user behavior and determine persona
export function analyzeUserPersona(behavior: UserBehavior): UserPersona {
    const { sectionsViewed, clickedElements, visitCount } = behavior;

    // Initialize scores
    let technicalScore = 0;
    let businessScore = 0;
    let operationsScore = 0;

    // Analyze sections viewed
    if (sectionsViewed.includes("live-feed")) technicalScore += 2;
    if (sectionsViewed.includes("use-cases")) {
        operationsScore += 2;
        businessScore += 1;
    }
    if (sectionsViewed.includes("services")) businessScore += 1;

    // Analyze clicked elements
    clickedElements.forEach((element) => {
        if (element.includes("technical") || element.includes("api")) technicalScore += 3;
        if (element.includes("operations") || element.includes("automation")) operationsScore += 3;
        if (element.includes("business") || element.includes("roi")) businessScore += 3;
    });

    // Return visits indicate serious interest
    if (visitCount > 2) {
        businessScore += 2;
        operationsScore += 1;
    }

    // Determine persona type
    const scores = {
        technical: technicalScore,
        business: businessScore,
        operations: operationsScore,
    };

    const maxScore = Math.max(technicalScore, businessScore, operationsScore);

    if (maxScore === 0) {
        return {
            type: "unknown",
            confidence: 0,
            interests: [],
        };
    }

    const type = (Object.keys(scores) as Array<keyof typeof scores>).find(
        (key) => scores[key] === maxScore
    ) || "unknown";

    // Calculate confidence (0-1)
    const totalScore = technicalScore + businessScore + operationsScore;
    const confidence = totalScore > 0 ? maxScore / totalScore : 0;

    // Determine interests
    const interests: string[] = [];
    if (technicalScore > 0) interests.push("AI", "Automation", "ML");
    if (operationsScore > 0) interests.push("Operations", "Compliance", "Workflows");
    if (businessScore > 0) interests.push("ROI", "Efficiency", "Scale");

    return {
        type: type as UserPersona["type"],
        confidence,
        interests,
    };
}

// Get personalized headline based on persona
export function getPersonalizedHeadline(persona: UserPersona, isReturning: boolean): string {
    if (isReturning) {
        return "Welcome back! Ready to automate what's slowing you down?";
    }

    switch (persona.type) {
        case "technical":
            return "Build intelligent AI agents that actually work.";
        case "operations":
            return "Automate operations tasks that waste your team's time.";
        case "business":
            return "AI agents and automation that drive real ROI.";
        default:
            return "AI agents and automation for the boring, expensive parts of your business.";
    }
}

// Get personalized CTA text
export function getPersonalizedCTA(persona: UserPersona): string {
    switch (persona.type) {
        case "technical":
            return "See the tech stack";
        case "operations":
            return "Explore automations";
        case "business":
            return "Calculate ROI";
        default:
            return "Work with us";
    }
}

// Reorder services based on persona
export function reorderServices<T extends { title: string }>(
    services: T[],
    persona: UserPersona
): T[] {
    const servicesCopy = [...services];

    if (persona.type === "operations") {
        // Move operations-related services to the front
        return servicesCopy.sort((a, b) => {
            const aIsOps = a.title.toLowerCase().includes("monitoring") ||
                a.title.toLowerCase().includes("workflow");
            const bIsOps = b.title.toLowerCase().includes("monitoring") ||
                b.title.toLowerCase().includes("workflow");
            if (aIsOps && !bIsOps) return -1;
            if (!aIsOps && bIsOps) return 1;
            return 0;
        });
    }

    if (persona.type === "technical") {
        // Move AI/technical services to the front
        return servicesCopy.sort((a, b) => {
            const aIsTech = a.title.toLowerCase().includes("ai") ||
                a.title.toLowerCase().includes("quality");
            const bIsTech = b.title.toLowerCase().includes("ai") ||
                b.title.toLowerCase().includes("quality");
            if (aIsTech && !bIsTech) return -1;
            if (!aIsTech && bIsTech) return 1;
            return 0;
        });
    }

    return servicesCopy;
}

import type { DarkWebResult } from "./extended-scanners-types";

/**
 * Check if email/phone appears on dark web
 * NOTE: This is a mock implementation for MVP
 * In production, integrate with services like:
 * - DeHashed API (https://dehashed.com/docs)
 * - Intelligence X (https://intelx.io/)
 * - Breach Directory
 */
export async function checkDarkWeb(
    email?: string,
    phone?: string
): Promise<DarkWebResult[]> {
    // Mock implementation - replace with actual API calls
    console.log(`Dark web check for email: ${email}, phone: ${phone}`);

    // Simulate API delay
    await sleep(1000);

    // Mock results for demonstration
    const results: DarkWebResult[] = [];

    if (email) {
        // Simulate finding email in dark web forums
        // In production, this would call actual dark web monitoring APIs
        const mockResult: DarkWebResult = {
            source: "Dark Web Forum (Mock)",
            type: "forum",
            dataFound: ["Email address", "Username", "Possible password hash"],
            severity: "medium",
            firstSeen: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        };

        // Only add mock result 30% of the time to simulate real behavior
        if (Math.random() > 0.7) {
            results.push(mockResult);
        }
    }

    return results;
}

/**
 * Check specific dark web sources
 */
export async function checkDarkWebSources(): Promise<{
    forums: number;
    marketplaces: number;
    pastes: number;
    breaches: number;
    totalFindings: number;
}> {
    // Mock implementation
    await sleep(500);

    // Simulate findings
    const forums = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
    const marketplaces = Math.random() > 0.9 ? 1 : 0;
    const pastes = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
    const breaches = Math.random() > 0.6 ? Math.floor(Math.random() * 2) : 0;

    return {
        forums,
        marketplaces,
        pastes,
        breaches,
        totalFindings: forums + marketplaces + pastes + breaches,
    };
}

/**
 * Get dark web monitoring recommendations
 */
export function getDarkWebRecommendations(results: DarkWebResult[]): string[] {
    if (results.length === 0) {
        return ["No dark web exposure detected. Continue monitoring regularly."];
    }

    const recommendations: string[] = [
        "Change passwords for all accounts using this email/phone immediately",
        "Enable two-factor authentication on all accounts",
        "Monitor your credit reports for suspicious activity",
        "Consider using a credit freeze",
        "Set up fraud alerts with credit bureaus",
    ];

    const hasCritical = results.some((r) => r.severity === "critical");
    if (hasCritical) {
        recommendations.unshift(
            "🚨 CRITICAL: Your data is actively being traded. Contact your bank and credit card companies immediately."
        );
    }

    return recommendations;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

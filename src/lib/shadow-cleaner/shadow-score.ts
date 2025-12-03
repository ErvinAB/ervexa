import type { ShadowScore, ExposureReport, ThreatDetection, CleanupRecommendation } from "./types";
import { SCORE_WEIGHTS, THREAT_LEVELS, SEVERITY_THRESHOLDS, RECOMMENDATION_TEMPLATES } from "./constants";

/**
 * Calculate Shadow Score based on multiple threat factors
 * Score ranges from 0 (critical) to 100 (safe)
 */
export function calculateShadowScore(data: {
    emailBreaches?: number;
    phoneLeaks?: number;
    suspiciousContacts?: number;
    scamMessages?: number;
    privacyGaps?: number;
}): ShadowScore {
    const {
        emailBreaches = 0,
        phoneLeaks = 0,
        suspiciousContacts = 0,
        scamMessages = 0,
        privacyGaps = 0,
    } = data;

    // Calculate penalties with caps to prevent over-penalization
    const emailPenalty = Math.min(
        emailBreaches * SCORE_WEIGHTS.EMAIL_BREACH,
        SCORE_WEIGHTS.MAX_PENALTY_PER_CATEGORY
    );
    const phonePenalty = Math.min(
        phoneLeaks * SCORE_WEIGHTS.PHONE_LEAK,
        SCORE_WEIGHTS.MAX_PENALTY_PER_CATEGORY
    );
    const contactPenalty = Math.min(
        suspiciousContacts * SCORE_WEIGHTS.SUSPICIOUS_CONTACT,
        SCORE_WEIGHTS.MAX_PENALTY_PER_CATEGORY
    );
    const messagePenalty = Math.min(
        scamMessages * SCORE_WEIGHTS.SCAM_MESSAGE,
        SCORE_WEIGHTS.MAX_PENALTY_PER_CATEGORY
    );
    const privacyPenalty = Math.min(
        privacyGaps * SCORE_WEIGHTS.PRIVACY_GAP,
        SCORE_WEIGHTS.MAX_PENALTY_PER_CATEGORY
    );

    // Calculate final score
    const totalPenalty =
        emailPenalty + phonePenalty + contactPenalty + messagePenalty + privacyPenalty;
    const score = Math.max(0, Math.min(100, 100 - totalPenalty));

    // Determine threat level
    let threatLevel: ShadowScore["threatLevel"] = "safe";
    if (score >= THREAT_LEVELS.SAFE.min) {
        threatLevel = "safe";
    } else if (score >= THREAT_LEVELS.CAUTION.min) {
        threatLevel = "caution";
    } else if (score >= THREAT_LEVELS.WARNING.min) {
        threatLevel = "warning";
    } else {
        threatLevel = "critical";
    }

    return {
        score: Math.round(score),
        threatLevel,
        breakdown: {
            emailBreaches,
            phoneLeaks,
            suspiciousContacts,
            scamMessages,
            privacyGaps,
        },
        lastUpdated: new Date(),
    };
}

/**
 * Determine overall severity based on breach count and score
 */
export function calculateSeverity(
    breachCount: number,
    score: number
): "low" | "medium" | "high" | "critical" {
    if (
        breachCount >= SEVERITY_THRESHOLDS.CRITICAL.breaches ||
        score <= SEVERITY_THRESHOLDS.CRITICAL.score
    ) {
        return "critical";
    }
    if (
        breachCount >= SEVERITY_THRESHOLDS.HIGH.breaches ||
        score <= SEVERITY_THRESHOLDS.HIGH.score
    ) {
        return "high";
    }
    if (
        breachCount >= SEVERITY_THRESHOLDS.MEDIUM.breaches ||
        score <= SEVERITY_THRESHOLDS.MEDIUM.score
    ) {
        return "medium";
    }
    return "low";
}

/**
 * Generate cleanup recommendations based on detected issues
 */
export function generateRecommendations(
    exposures: ExposureReport[],
    threats: ThreatDetection[]
): CleanupRecommendation[] {
    const recommendations: CleanupRecommendation[] = [];

    // Email breach recommendations
    const emailBreaches = exposures.filter((e) => e.type === "email");
    if (emailBreaches.length > 0) {
        emailBreaches.forEach((breach) => {
            recommendations.push({
                id: `rec-email-${breach.value}`,
                category: "security",
                title: RECOMMENDATION_TEMPLATES.EMAIL_BREACH.title,
                description: RECOMMENDATION_TEMPLATES.EMAIL_BREACH.description.replace(
                    "{count}",
                    breach.totalBreaches.toString()
                ),
                priority: breach.severity === "critical" || breach.severity === "high" ? "critical" : "high",
                actionable: true,
                estimatedTime: "5 min",
                steps: [
                    `Change password for accounts using ${breach.value}`,
                    "Use a unique, strong password (16+ characters)",
                    "Enable two-factor authentication",
                    "Check for unauthorized access in account activity",
                ],
                completed: false,
            });
        });
    }

    // Phone leak recommendations
    const phoneLeaks = exposures.filter((e) => e.type === "phone");
    if (phoneLeaks.length > 0) {
        phoneLeaks.forEach((leak) => {
            recommendations.push({
                id: `rec-phone-${leak.value}`,
                category: "exposure",
                title: RECOMMENDATION_TEMPLATES.PHONE_LEAK.title,
                description: RECOMMENDATION_TEMPLATES.PHONE_LEAK.description.replace(
                    "{count}",
                    leak.totalBreaches.toString()
                ),
                priority: "medium",
                actionable: true,
                estimatedTime: "10 min",
                steps: [
                    "Enable call filtering on your device",
                    "Register for Do Not Call lists",
                    "Consider using a secondary number for online services",
                    "Monitor for suspicious calls/texts",
                ],
                completed: false,
            });
        });
    }

    // Suspicious contact recommendations
    const criticalThreats = threats.filter(
        (t) => t.severity === "critical" || t.severity === "high"
    );
    if (criticalThreats.length > 0) {
        criticalThreats.forEach((threat) => {
            recommendations.push({
                id: `rec-contact-${threat.id}`,
                category: "contact",
                title: RECOMMENDATION_TEMPLATES.SUSPICIOUS_CONTACT.title,
                description: RECOMMENDATION_TEMPLATES.SUSPICIOUS_CONTACT.description.replace(
                    "{name}",
                    threat.contactName
                ),
                priority: threat.severity === "critical" ? "critical" : "high",
                platform: "Telegram",
                actionable: true,
                estimatedTime: "1 min",
                steps: [
                    `Block ${threat.contactName}`,
                    "Report as spam/scam",
                    "Delete conversation history",
                    "Do not engage with similar contacts",
                ],
                completed: false,
            });
        });
    }

    // Privacy hardening recommendations
    if (threats.length > 0 || exposures.length > 0) {
        recommendations.push({
            id: "rec-privacy-telegram",
            category: "privacy",
            title: "Tighten Telegram Privacy Settings",
            description:
                "Your account may be vulnerable to scammers. Secure your privacy settings to prevent future threats.",
            priority: "medium",
            platform: "Telegram",
            actionable: true,
            estimatedTime: "5 min",
            steps: [
                "Hide phone number from strangers",
                "Disable 'Last Seen' for non-contacts",
                "Restrict profile photo visibility",
                "Enable two-step verification",
            ],
            completed: false,
        });
    }

    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return recommendations.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
}

/**
 * Get threat level color for UI
 */
export function getThreatLevelColor(
    level: ShadowScore["threatLevel"]
): string {
    return THREAT_LEVELS[level.toUpperCase() as keyof typeof THREAT_LEVELS].color;
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    if (score >= 30) return "Poor";
    return "Critical";
}

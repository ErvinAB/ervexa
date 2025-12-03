import type { TelegramContact, ThreatDetection } from "./types";
import { SCAM_PATTERNS, SUSPICIOUS_INDICATORS } from "./constants";

/**
 * Analyze Telegram contacts for suspicious patterns and scam indicators
 */
export function analyzeTelegramContacts(
    contacts: TelegramContact[]
): ThreatDetection[] {
    const threats: ThreatDetection[] = [];

    contacts.forEach((contact) => {
        const indicators: string[] = [];
        let threatType: ThreatDetection["threatType"] = "spam";
        let severity: ThreatDetection["severity"] = "low";
        let confidence = 0;

        // Check account age
        if (
            contact.accountAge !== undefined &&
            contact.accountAge < SUSPICIOUS_INDICATORS.NEW_ACCOUNT_THRESHOLD
        ) {
            indicators.push(`New account (${contact.accountAge} days old)`);
            confidence += 0.2;
        }

        // Check for foreign phone numbers
        if (contact.phone) {
            const isForeign = SUSPICIOUS_INDICATORS.FOREIGN_AREA_CODES.some((code) =>
                contact.phone?.startsWith(code)
            );
            if (isForeign) {
                indicators.push("Foreign phone number");
                confidence += 0.3;
            }
        }

        // Check for generic usernames
        if (contact.username) {
            const isGeneric = SUSPICIOUS_INDICATORS.GENERIC_USERNAMES.some((pattern) =>
                pattern.test(contact.username!)
            );
            if (isGeneric) {
                indicators.push("Generic username pattern");
                confidence += 0.15;
            }
        }

        // Analyze last message for scam patterns
        if (contact.lastMessage) {
            const message = contact.lastMessage.toLowerCase();

            // Romance scam detection
            const romanceMatches = SCAM_PATTERNS.ROMANCE.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (romanceMatches >= 2) {
                threatType = "romance_scam";
                indicators.push("Romance scam language detected");
                confidence += 0.4;
                severity = "high";
            }

            // Crypto scam detection
            const cryptoMatches = SCAM_PATTERNS.CRYPTO.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (cryptoMatches >= 2) {
                threatType = "crypto_scam";
                indicators.push("Cryptocurrency scam indicators");
                confidence += 0.5;
                severity = "critical";
            }

            // Phishing detection
            const phishingMatches = SCAM_PATTERNS.PHISHING.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (phishingMatches >= 2) {
                threatType = "phishing";
                indicators.push("Phishing attempt detected");
                confidence += 0.45;
                severity = "high";
            }

            // Generic scam keywords
            const genericMatches = SCAM_PATTERNS.GENERIC_SCAM.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (genericMatches >= 2) {
                indicators.push("Suspicious keywords detected");
                confidence += 0.25;
            }

            // Suspicious questions
            const suspiciousQuestions = SCAM_PATTERNS.SUSPICIOUS_QUESTIONS.filter(
                (pattern) => pattern.test(message)
            ).length;
            if (suspiciousQuestions >= 1) {
                indicators.push("Suspicious probing questions");
                confidence += 0.2;
            }
        }

        // Check for unverified accounts
        if (contact.isVerified === false) {
            indicators.push("Unverified account");
            confidence += 0.1;
        }

        // Determine severity based on confidence
        if (confidence >= 0.7) {
            severity = "critical";
        } else if (confidence >= 0.5) {
            severity = "high";
        } else if (confidence >= 0.3) {
            severity = "medium";
        }

        // Only create threat detection if confidence threshold is met
        if (confidence >= 0.3) {
            const contactName =
                contact.username ||
                `${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
                contact.phone ||
                "Unknown Contact";

            threats.push({
                id: `threat-${contact.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                contactId: contact.id,
                contactName,
                threatType,
                severity,
                confidence: Math.min(confidence, 1),
                indicators,
                message: contact.lastMessage,
                detectedAt: new Date(),
                recommendation: getRecommendation(threatType, severity),
            });
        }
    });

    return threats;
}

/**
 * Get recommendation text based on threat type and severity
 */
function getRecommendation(
    threatType: ThreatDetection["threatType"],
    severity: ThreatDetection["severity"]
): string {
    const recommendations: Record<string, string> = {
        romance_scam:
            "Block immediately. Romance scammers build trust before requesting money. Never send money to online contacts.",
        crypto_scam:
            "Block and report. Cryptocurrency scams promise unrealistic returns. Never share wallet info or invest based on unsolicited messages.",
        phishing:
            "Do not click any links. Block and delete. Phishing attempts steal credentials. Verify requests through official channels.",
        fake_profile:
            "Block this contact. Fake profiles are used for various scams. Report to Telegram.",
        spam: "Block to reduce spam. Report if messages continue.",
        scam:
            "Block immediately and report. Do not engage or provide personal information.",
    };

    const baseRecommendation = recommendations[threatType] || recommendations.scam;

    if (severity === "critical") {
        return `🚨 CRITICAL: ${baseRecommendation}`;
    } else if (severity === "high") {
        return `⚠️ HIGH RISK: ${baseRecommendation}`;
    }

    return baseRecommendation;
}

/**
 * Classify a single message for threat detection
 */
export function classifyMessage(
    message: string,
    context?: {
        senderName?: string;
        accountAge?: number;
    }
): {
    isSuspicious: boolean;
    threatType: ThreatDetection["threatType"] | null;
    confidence: number;
    indicators: string[];
} {
    const indicators: string[] = [];
    let confidence = 0;
    let threatType: ThreatDetection["threatType"] | null = null;

    const lowerMessage = message.toLowerCase();

    // Check all pattern categories
    const romanceMatches = SCAM_PATTERNS.ROMANCE.filter((p) => p.test(lowerMessage)).length;
    const cryptoMatches = SCAM_PATTERNS.CRYPTO.filter((p) => p.test(lowerMessage)).length;
    const phishingMatches = SCAM_PATTERNS.PHISHING.filter((p) => p.test(lowerMessage)).length;
    const genericMatches = SCAM_PATTERNS.GENERIC_SCAM.filter((p) => p.test(lowerMessage)).length;
    const suspiciousQs = SCAM_PATTERNS.SUSPICIOUS_QUESTIONS.filter((p) =>
        p.test(lowerMessage)
    ).length;

    // Determine primary threat type
    if (cryptoMatches >= 2) {
        threatType = "crypto_scam";
        confidence += 0.5;
        indicators.push("Crypto scam language");
    } else if (romanceMatches >= 2) {
        threatType = "romance_scam";
        confidence += 0.4;
        indicators.push("Romance scam patterns");
    } else if (phishingMatches >= 2) {
        threatType = "phishing";
        confidence += 0.45;
        indicators.push("Phishing indicators");
    } else if (genericMatches >= 2) {
        threatType = "scam";
        confidence += 0.3;
        indicators.push("Generic scam keywords");
    } else if (suspiciousQs >= 1) {
        threatType = "spam";
        confidence += 0.2;
        indicators.push("Suspicious questions");
    }

    // Context-based adjustments
    if (context?.accountAge && context.accountAge < 30) {
        confidence += 0.15;
        indicators.push("New account");
    }

    return {
        isSuspicious: confidence >= 0.3,
        threatType,
        confidence: Math.min(confidence, 1),
        indicators,
    };
}

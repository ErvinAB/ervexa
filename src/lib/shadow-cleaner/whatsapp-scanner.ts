import type { ThreatDetection, WhatsAppContact } from "./types";
import { WHATSAPP_PATTERNS } from "./extended-scanners-types";

/**
 * Analyze WhatsApp contacts for scam patterns
 */
export function analyzeWhatsAppContacts(contacts: WhatsAppContact[]): ThreatDetection[] {
    const threats: ThreatDetection[] = [];

    contacts.forEach((contact) => {
        const indicators: string[] = [];
        let threatType: ThreatDetection["threatType"] = "spam";
        let severity: ThreatDetection["severity"] = "low";
        let confidence = 0;

        // Check if it's an unverified business account
        if (contact.isBusinessAccount && !contact.isVerified) {
            indicators.push("Unverified business account");
            confidence += 0.3;
            threatType = "fake_profile";
            severity = "medium";
        }

        // Check for missing profile picture (common in scam accounts)
        if (!contact.profilePicture) {
            indicators.push("No profile picture");
            confidence += 0.15;
        }

        // Analyze last message
        if (contact.lastMessage) {
            const message = contact.lastMessage.toLowerCase();

            // Business scam detection
            const businessMatches = WHATSAPP_PATTERNS.BUSINESS_SCAM.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (businessMatches >= 2) {
                threatType = "phishing";
                indicators.push("Business impersonation detected");
                confidence += 0.5;
                severity = "high";
            }

            // Fake delivery scam
            const deliveryMatches = WHATSAPP_PATTERNS.FAKE_DELIVERY.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (deliveryMatches >= 2) {
                threatType = "phishing";
                indicators.push("Fake delivery scam");
                confidence += 0.45;
                severity = "high";
            }

            // WhatsApp impersonation
            const impersonationMatches = WHATSAPP_PATTERNS.IMPERSONATION.filter((pattern) =>
                pattern.test(message)
            ).length;
            if (impersonationMatches >= 2) {
                threatType = "phishing";
                indicators.push("WhatsApp impersonation");
                confidence += 0.6;
                severity = "critical";
            }
        }

        // Only create threat if confidence threshold is met
        if (confidence >= 0.3) {
            const contactName = contact.name || contact.phone || "Unknown Contact";

            threats.push({
                id: `whatsapp-threat-${contact.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                contactId: contact.id,
                contactName,
                threatType,
                severity,
                confidence: Math.min(confidence, 1),
                indicators,
                message: contact.lastMessage,
                detectedAt: new Date(),
                recommendation: getWhatsAppRecommendation(threatType, severity),
            });
        }
    });

    return threats;
}

function getWhatsAppRecommendation(
    threatType: ThreatDetection["threatType"],
    severity: ThreatDetection["severity"]
): string {
    const recommendations: Record<string, string> = {
        phishing: "Block and report to WhatsApp. Do not click any links or provide personal information.",
        fake_profile: "Verify business authenticity through official channels. Block if suspicious.",
        spam: "Block contact and report as spam to WhatsApp.",
    };

    const baseRecommendation = recommendations[threatType] || recommendations.spam;

    if (severity === "critical") {
        return `🚨 CRITICAL: ${baseRecommendation}`;
    } else if (severity === "high") {
        return `⚠️ HIGH RISK: ${baseRecommendation}`;
    }

    return baseRecommendation;
}

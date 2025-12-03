import type { ThreatDetection, SMSMessage } from "./types";
import { SMS_PATTERNS } from "./extended-scanners-types";

/**
 * Analyze SMS messages for scam patterns
 */
export function analyzeSMSMessages(messages: SMSMessage[]): ThreatDetection[] {
    const threats: ThreatDetection[] = [];

    messages.forEach((sms) => {
        const indicators: string[] = [];
        let threatType: ThreatDetection["threatType"] = "spam";
        let severity: ThreatDetection["severity"] = "low";
        let confidence = 0;

        const message = sms.message.toLowerCase();

        // Check for suspicious sender (short codes, unknown numbers)
        if (/^\d{5,6}$/.test(sms.sender)) {
            indicators.push("Short code sender (common in spam)");
            confidence += 0.2;
        }

        // Check for links in message
        if (sms.hasLinks || /https?:\/\//.test(message)) {
            indicators.push("Contains suspicious links");
            confidence += 0.25;
        }

        // Bank scam detection
        const bankMatches = SMS_PATTERNS.BANK_SCAM.filter((pattern) =>
            pattern.test(message)
        ).length;
        if (bankMatches >= 3) {
            threatType = "phishing";
            indicators.push("Bank phishing attempt");
            confidence += 0.6;
            severity = "critical";
        }

        // Delivery scam detection
        const deliveryMatches = SMS_PATTERNS.DELIVERY_SCAM.filter((pattern) =>
            pattern.test(message)
        ).length;
        if (deliveryMatches >= 3) {
            threatType = "phishing";
            indicators.push("Fake delivery notification");
            confidence += 0.5;
            severity = "high";
        }

        // Tax/IRS scam detection
        const taxMatches = SMS_PATTERNS.TAX_SCAM.filter((pattern) =>
            pattern.test(message)
        ).length;
        if (taxMatches >= 2) {
            threatType = "phishing";
            indicators.push("Tax/IRS scam");
            confidence += 0.55;
            severity = "critical";
        }

        // Prize scam detection
        const prizeMatches = SMS_PATTERNS.PRIZE_SCAM.filter((pattern) =>
            pattern.test(message)
        ).length;
        if (prizeMatches >= 2) {
            threatType = "scam";
            indicators.push("Prize/lottery scam");
            confidence += 0.4;
            severity = "medium";
        }

        // Only create threat if confidence threshold is met
        if (confidence >= 0.3) {
            threats.push({
                id: `sms-threat-${sms.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                contactId: sms.id,
                contactName: sms.sender,
                threatType,
                severity,
                confidence: Math.min(confidence, 1),
                indicators,
                message: sms.message,
                detectedAt: new Date(),
                recommendation: getSMSRecommendation(threatType, severity),
            });
        }
    });

    return threats;
}

function getSMSRecommendation(
    threatType: ThreatDetection["threatType"],
    severity: ThreatDetection["severity"]
): string {
    const recommendations: Record<string, string> = {
        phishing: "Delete immediately. Do NOT click any links. Report to your carrier as spam. Never provide personal or financial information via SMS.",
        scam: "Delete and block sender. Report to FTC at reportfraud.ftc.gov. Legitimate companies don't ask for sensitive info via text.",
        spam: "Block sender and report as spam to your carrier.",
    };

    const baseRecommendation = recommendations[threatType] || recommendations.spam;

    if (severity === "critical") {
        return `🚨 CRITICAL THREAT: ${baseRecommendation}`;
    } else if (severity === "high") {
        return `⚠️ HIGH RISK: ${baseRecommendation}`;
    }

    return baseRecommendation;
}

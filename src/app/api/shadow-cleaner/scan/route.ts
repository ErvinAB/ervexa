import { NextRequest, NextResponse } from "next/server";
import type { ScanRequest, ScanResponse, DarkWebResult } from "@/lib/shadow-cleaner/types";
import { calculateShadowScore, generateRecommendations } from "@/lib/shadow-cleaner/shadow-score";
import { analyzeTelegramContacts } from "@/lib/shadow-cleaner/telegram-scanner";
import { analyzeWhatsAppContacts } from "@/lib/shadow-cleaner/whatsapp-scanner";
import { analyzeSMSMessages } from "@/lib/shadow-cleaner/sms-scanner";
import { checkEmailBreaches, checkPhoneLeaks } from "@/lib/shadow-cleaner/exposure-scanner";
import { checkDarkWeb } from "@/lib/shadow-cleaner/darkweb-scanner";

/**
 * POST /api/shadow-cleaner/scan
 * Main endpoint for comprehensive Shadow Cleaner scan
 */
export async function POST(request: NextRequest) {
    try {
        const body: ScanRequest = await request.json();
        const {
            email,
            phone,
            telegramContacts = [],
            whatsappContacts = [],
            smsMessages = [],
            checkDarkWeb: shouldCheckDarkWeb = false,
        } = body;

        // Validate input
        if (
            !email &&
            !phone &&
            telegramContacts.length === 0 &&
            whatsappContacts.length === 0 &&
            smsMessages.length === 0
        ) {
            return NextResponse.json(
                { error: "At least one input is required" },
                { status: 400 }
            );
        }

        // Initialize results
        const exposures = [];
        const threats = [];
        let darkWebResults: DarkWebResult[] = [];

        // 1. Check email breaches
        if (email) {
            const emailExposure = await checkEmailBreaches(email);
            if (emailExposure) {
                exposures.push(emailExposure);
            }
        }

        // 2. Check phone leaks
        if (phone) {
            const phoneExposure = await checkPhoneLeaks(phone);
            if (phoneExposure) {
                exposures.push(phoneExposure);
            }
        }

        // 3. Analyze Telegram contacts
        if (telegramContacts.length > 0) {
            const telegramThreats = analyzeTelegramContacts(telegramContacts);
            threats.push(...telegramThreats);
        }

        // 4. Analyze WhatsApp contacts
        if (whatsappContacts.length > 0) {
            const whatsappThreats = analyzeWhatsAppContacts(whatsappContacts);
            threats.push(...whatsappThreats);
        }

        // 5. Analyze SMS messages
        if (smsMessages.length > 0) {
            const smsThreats = analyzeSMSMessages(smsMessages);
            threats.push(...smsThreats);
        }

        // 6. Check dark web (if requested)
        if (shouldCheckDarkWeb && (email || phone)) {
            darkWebResults = await checkDarkWeb(email, phone);
        }

        // 7. Calculate Shadow Score
        const emailBreaches = exposures
            .filter((e) => e.type === "email")
            .reduce((sum, e) => sum + e.totalBreaches, 0);
        const phoneLeaks = exposures
            .filter((e) => e.type === "phone")
            .reduce((sum, e) => sum + e.totalBreaches, 0);
        const suspiciousContacts = threats.filter(
            (t) => t.severity === "medium" || t.severity === "high" || t.severity === "critical"
        ).length;
        const scamMessages = threats.filter(
            (t) => t.severity === "high" || t.severity === "critical"
        ).length;

        const shadowScore = calculateShadowScore({
            emailBreaches,
            phoneLeaks,
            suspiciousContacts,
            scamMessages,
            privacyGaps: 0,
        });

        // 8. Generate recommendations
        const recommendations = generateRecommendations(exposures, threats);

        // 9. Build response
        const scanId = `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const response: ScanResponse = {
            shadowScore,
            exposures,
            threats,
            recommendations,
            darkWebResults: darkWebResults.length > 0 ? darkWebResults : undefined,
            scanId,
            timestamp: new Date(),
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Scan error:", error);
        return NextResponse.json(
            { error: "Failed to complete scan. Please try again." },
            { status: 500 }
        );
    }
}

/**
 * GET /api/shadow-cleaner/scan
 * Returns API information
 */
export async function GET() {
    return NextResponse.json({
        endpoint: "/api/shadow-cleaner/scan",
        method: "POST",
        description: "Comprehensive Shadow Cleaner scan for digital exposures and threats",
        supportedInputs: [
            "email",
            "phone",
            "telegramContacts",
            "whatsappContacts",
            "smsMessages",
            "checkDarkWeb",
        ],
        example: {
            email: "user@example.com",
            phone: "+1234567890",
            telegramContacts: [
                {
                    username: "suspicious_user",
                    lastMessage: "Hello, I have investment opportunity",
                    accountAge: 5,
                },
            ],
            whatsappContacts: [
                {
                    name: "Unknown Business",
                    isBusinessAccount: true,
                    isVerified: false,
                    lastMessage: "Your account will be suspended",
                },
            ],
            smsMessages: [
                {
                    sender: "12345",
                    message: "Your bank account has been locked. Click here to verify.",
                    hasLinks: true,
                },
            ],
            checkDarkWeb: true,
        },
    });
}

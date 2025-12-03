import { NextRequest, NextResponse } from "next/server";
import type { TelegramScanRequest, TelegramScanResponse } from "@/lib/shadow-cleaner/types";
import { analyzeTelegramContacts } from "@/lib/shadow-cleaner/telegram-scanner";

/**
 * POST /api/shadow-cleaner/telegram
 * Analyze Telegram contacts for threats
 */
export async function POST(request: NextRequest) {
    try {
        const body: TelegramScanRequest = await request.json();
        const { contacts } = body;

        // Validate input
        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            return NextResponse.json(
                { error: "contacts array is required and must not be empty" },
                { status: 400 }
            );
        }

        // Analyze contacts
        const threats = analyzeTelegramContacts(contacts);

        // Count by severity
        const safeCount = contacts.length - threats.length;
        const suspiciousCount = threats.filter(
            (t) => t.severity === "low" || t.severity === "medium"
        ).length;
        const criticalCount = threats.filter(
            (t) => t.severity === "high" || t.severity === "critical"
        ).length;

        const response: TelegramScanResponse = {
            threats,
            safeCount,
            suspiciousCount,
            criticalCount,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Telegram scan error:", error);
        return NextResponse.json(
            { error: "Failed to analyze Telegram contacts" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/shadow-cleaner/telegram
 * Returns API information
 */
export async function GET() {
    return NextResponse.json({
        endpoint: "/api/shadow-cleaner/telegram",
        method: "POST",
        description: "Analyze Telegram contacts for scam patterns and threats",
        requiredFields: "contacts (array)",
        example: {
            contacts: [
                {
                    username: "john_doe",
                    phone: "+1234567890",
                    lastMessage: "Hey, how are you?",
                    accountAge: 365,
                    isVerified: true,
                },
                {
                    username: "crypto_trader123",
                    phone: "+234567890",
                    lastMessage: "Hello dear, I have amazing bitcoin investment opportunity for you!",
                    accountAge: 7,
                    isVerified: false,
                },
            ],
        },
    });
}

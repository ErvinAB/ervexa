import { NextRequest, NextResponse } from "next/server";
import type { ExposureScanRequest, ExposureScanResponse } from "@/lib/shadow-cleaner/types";
import { checkEmailBreaches, checkPhoneLeaks, summarizeExposures } from "@/lib/shadow-cleaner/exposure-scanner";

/**
 * POST /api/shadow-cleaner/exposure
 * Check email/phone for data breaches
 */
export async function POST(request: NextRequest) {
    try {
        const body: ExposureScanRequest = await request.json();
        const { email, phone } = body;

        // Validate input
        if (!email && !phone) {
            return NextResponse.json(
                { error: "At least one of email or phone is required" },
                { status: 400 }
            );
        }

        const exposures = [];

        // Check email breaches
        if (email) {
            const emailExposure = await checkEmailBreaches(email);
            if (emailExposure) {
                exposures.push(emailExposure);
            }
        }

        // Check phone leaks
        if (phone) {
            const phoneExposure = await checkPhoneLeaks(phone);
            if (phoneExposure) {
                exposures.push(phoneExposure);
            }
        }

        // Summarize results
        const summary = summarizeExposures(exposures);

        const response: ExposureScanResponse = {
            exposures,
            totalBreaches: summary.totalBreaches,
            severity: summary.overallSeverity,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Exposure scan error:", error);

        // Check if it's a rate limit error
        if (error instanceof Error && error.message.includes("Rate limited")) {
            return NextResponse.json(
                { error: "Rate limited. Please wait 2 seconds before trying again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to check exposures" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/shadow-cleaner/exposure
 * Returns API information
 */
export async function GET() {
    return NextResponse.json({
        endpoint: "/api/shadow-cleaner/exposure",
        method: "POST",
        description: "Check email and phone number for data breaches using HaveIBeenPwned",
        requiredFields: "At least one of: email, phone",
        rateLimit: "1 request per 1.5 seconds (free tier)",
        example: {
            email: "test@example.com",
            phone: "+1234567890",
        },
        note: "Phone leak detection is currently limited. Email breach detection uses HaveIBeenPwned API.",
    });
}

import { NextRequest, NextResponse } from "next/server";
import type { WaitlistSubmission, WaitlistResponse } from "@/lib/shadow-cleaner/waitlist-types";

// Simple in-memory storage (replace with Firebase/database in production)
const waitlist: Array<{ email: string; timestamp: Date; source: string }> = [];

/**
 * POST /api/shadow-cleaner/waitlist
 * Add email to early access waitlist
 */
export async function POST(request: NextRequest) {
    try {
        const body: WaitlistSubmission = await request.json();
        const { email, source } = body;

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingEntry = waitlist.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

        if (existingEntry) {
            const position = waitlist.indexOf(existingEntry) + 1;
            return NextResponse.json({
                success: true,
                position,
                totalWaitlist: waitlist.length,
                message: "You're already on the waitlist!",
                referralCode: generateReferralCode(email),
            });
        }

        // Add to waitlist
        waitlist.push({
            email: email.toLowerCase(),
            timestamp: new Date(),
            source: source || "shadow-cleaner",
        });

        const position = waitlist.length;
        const referralCode = generateReferralCode(email);

        const response: WaitlistResponse = {
            success: true,
            position,
            totalWaitlist: waitlist.length,
            message: `You're #${position} on the waitlist!`,
            referralCode,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Waitlist error:", error);
        return NextResponse.json(
            { error: "Failed to join waitlist" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/shadow-cleaner/waitlist
 * Get waitlist stats
 */
export async function GET() {
    return NextResponse.json({
        total: waitlist.length,
        message: "Shadow Cleaner Early Access Waitlist",
    });
}

/**
 * Generate a simple referral code from email
 */
function generateReferralCode(email: string): string {
    const hash = email.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return Math.abs(hash).toString(36).toUpperCase().substring(0, 6);
}

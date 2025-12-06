import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/content-engine/content-generator";
import { generateDemoContent } from "@/lib/content-engine/demo-generator";
import type { ContentGenerationRequest } from "@/lib/content-engine/content-types";

/**
 * POST /api/content-engine/generate
 * Generate content variations for a given topic
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as ContentGenerationRequest;

        // Validate request
        if (!body.topic || !body.platform || !body.tone || !body.length) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields: topic, platform, tone, length",
                },
                { status: 400 }
            );
        }

        // Use demo mode if no API key is configured, or if API key is invalid
        const apiKey = process.env.GEMINI_API_KEY;
        const useDemoMode = !apiKey || apiKey === "your-api-key-here";

        let result;
        if (useDemoMode) {
            // Demo mode - no API required!
            console.log("Using demo mode for content generation");
            result = await generateDemoContent(body);
        } else {
            // Try real API, fall back to demo if it fails
            try {
                result = await generateContent(body);
            } catch (error) {
                console.log("API failed, falling back to demo mode:", error);
                result = await generateDemoContent(body);
            }
        }

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Content generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate content",
            },
            { status: 500 }
        );
    }
}

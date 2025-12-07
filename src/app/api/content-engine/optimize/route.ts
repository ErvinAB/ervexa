import { NextRequest, NextResponse } from "next/server";
import { optimizeContent } from "@/lib/content-engine/content-generator";

/**
 * POST /api/content-engine/optimize
 * Optimize existing content for better engagement
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.content || !body.platform) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields: content, platform",
                },
                { status: 400 }
            );
        }

        const result = await optimizeContent(body.content, body.platform);

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Content optimization error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to optimize content",
            },
            { status: 500 }
        );
    }
}

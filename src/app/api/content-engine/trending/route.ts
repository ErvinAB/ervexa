import { NextResponse } from "next/server";
import { getCachedTrendingTopics } from "@/lib/content-engine/news-monitor";

/**
 * GET /api/content-engine/trending
 * Fetch trending topics for content inspiration
 */
export async function GET() {
    try {
        const topics = await getCachedTrendingTopics();

        return NextResponse.json({
            success: true,
            topics,
            cachedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error fetching trending topics:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch trending topics",
            },
            { status: 500 }
        );
    }
}

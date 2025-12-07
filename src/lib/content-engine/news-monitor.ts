import type { TrendingTopic } from "./content-types";

/**
 * Fetch trending topics from various sources
 * Uses free RSS feeds and APIs
 */
export async function fetchTrendingTopics(): Promise<TrendingTopic[]> {
    const topics: TrendingTopic[] = [];

    try {
        // Fetch from multiple sources in parallel
        const [hackerNews, productHunt] = await Promise.all([
            fetchHackerNewsTrending(),
            fetchProductHuntTrending(),
        ]);

        topics.push(...hackerNews, ...productHunt);

        // Sort by relevance score
        topics.sort((a, b) => b.relevanceScore - a.relevanceScore);

        // Return top 10
        return topics.slice(0, 10);
    } catch (error) {
        console.error("Error fetching trending topics:", error);
        // Return fallback topics if fetch fails
        return getFallbackTopics();
    }
}

async function fetchHackerNewsTrending(): Promise<TrendingTopic[]> {
    try {
        // Fetch top stories from Hacker News API
        const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const storyIds = (await response.json()) as number[];

        // Fetch details for top 5 stories
        const stories = await Promise.all(
            storyIds.slice(0, 5).map(async (id) => {
                const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                return storyResponse.json();
            })
        );

        return stories.map((story, index) => ({
            id: `hn-${story.id}`,
            title: story.title,
            description: story.title, // HN doesn't have descriptions
            source: "Hacker News",
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            category: "Tech",
            publishedAt: new Date(story.time * 1000),
            relevanceScore: 90 - index * 5, // Higher score for top stories
        }));
    } catch (error) {
        console.error("Error fetching Hacker News:", error);
        return [];
    }
}

async function fetchProductHuntTrending(): Promise<TrendingTopic[]> {
    // Note: Product Hunt API requires authentication
    // For now, return mock data. In production, integrate with PH API
    return [
        {
            id: "ph-1",
            title: "AI-Powered Productivity Tools",
            description: "New wave of AI tools transforming how we work",
            source: "Product Hunt",
            url: "https://producthunt.com",
            category: "AI",
            publishedAt: new Date(),
            relevanceScore: 85,
        },
    ];
}

function getFallbackTopics(): TrendingTopic[] {
    return [
        {
            id: "fallback-1",
            title: "The Future of AI in Business",
            description: "How artificial intelligence is transforming modern business operations",
            source: "Stagbyte",
            url: "",
            category: "AI",
            publishedAt: new Date(),
            relevanceScore: 80,
        },
        {
            id: "fallback-2",
            title: "Automation Best Practices",
            description: "Key strategies for successful business automation",
            source: "Stagbyte",
            url: "",
            category: "Automation",
            publishedAt: new Date(),
            relevanceScore: 75,
        },
        {
            id: "fallback-3",
            title: "Building AI Agents",
            description: "A guide to creating autonomous AI agents for your business",
            source: "Stagbyte",
            url: "",
            category: "AI",
            publishedAt: new Date(),
            relevanceScore: 70,
        },
        {
            id: "fallback-4",
            title: "Digital Privacy in 2024",
            description: "Protecting your data in an increasingly connected world",
            source: "Stagbyte",
            url: "",
            category: "Privacy",
            publishedAt: new Date(),
            relevanceScore: 65,
        },
        {
            id: "fallback-5",
            title: "The Rise of No-Code Tools",
            description: "How no-code platforms are democratizing software development",
            source: "Stagbyte",
            url: "",
            category: "Tech",
            publishedAt: new Date(),
            relevanceScore: 60,
        },
    ];
}

/**
 * Cache trending topics to avoid excessive API calls
 */
let cachedTopics: { topics: TrendingTopic[]; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getCachedTrendingTopics(): Promise<TrendingTopic[]> {
    const now = Date.now();

    if (cachedTopics && now - cachedTopics.timestamp < CACHE_DURATION) {
        return cachedTopics.topics;
    }

    const topics = await fetchTrendingTopics();
    cachedTopics = { topics, timestamp: now };

    return topics;
}

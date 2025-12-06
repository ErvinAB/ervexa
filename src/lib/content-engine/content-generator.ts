import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
    ContentGenerationRequest,
    ContentGenerationResponse,
    ContentVariation,
} from "./content-types";
import { getTemplate, formatContentForPlatform, getConstraints } from "./content-templates";

/**
 * Generate multiple content variations using AI
 */
export async function generateContent(
    request: ContentGenerationRequest
): Promise<ContentGenerationResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Get platform-specific template
    const template = getTemplate(request.platform, request.tone);
    const constraints = getConstraints(request.platform);

    // Build the prompt
    const prompt = buildPrompt(request, template, constraints);

    try {
        // Generate 3-5 variations
        const variations: ContentVariation[] = [];
        const numVariations = 5;

        for (let i = 0; i < numVariations; i++) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let content = response.text().trim();

            // Format for platform
            content = formatContentForPlatform(content, request.platform, request.length);

            // Extract hashtags
            const hashtags = extractHashtags(content);

            // Calculate engagement score (mock for now, can be improved with ML)
            const engagementScore = calculateEngagementScore(content, request.platform);

            variations.push({
                id: `var-${i + 1}`,
                content,
                platform: request.platform,
                tone: request.tone,
                engagementScore,
                hashtags,
                characterCount: content.length,
                estimatedReadTime: calculateReadTime(content),
            });

            // Small delay between generations to get variety
            if (i < numVariations - 1) {
                await sleep(200);
            }
        }

        return {
            variations,
            topic: request.topic,
            generatedAt: new Date(),
            metadata: {
                platform: request.platform,
                tone: request.tone,
                length: request.length,
            },
        };
    } catch (error) {
        console.error("Content generation error:", error);
        throw new Error("Failed to generate content. Please try again.");
    }
}

function buildPrompt(
    request: ContentGenerationRequest,
    template: string,
    constraints: ReturnType<typeof getConstraints>
): string {
    let prompt = template
        .replace("{topic}", request.topic)
        .replace("{length}", request.length);

    // Add keywords if provided
    if (request.keywords && request.keywords.length > 0) {
        prompt += `\n\nKeywords to include: ${request.keywords.join(", ")}`;
    }

    // Add target audience if provided
    if (request.targetAudience) {
        prompt += `\n\nTarget audience: ${request.targetAudience}`;
    }

    // Add hashtag requirement
    if (request.includeHashtags) {
        prompt += `\n\nInclude ${constraints.hashtagLimit} relevant hashtags at the end.`;
    }

    // Add CTA requirement
    if (request.includeCTA) {
        prompt += `\n\nInclude a clear call-to-action at the end.`;
    }

    // Add character limit
    const idealLength = constraints.idealLength[request.length];
    prompt += `\n\nTarget length: approximately ${idealLength} characters.`;

    // Important: Ask for just the content, no meta-commentary
    prompt += `\n\nIMPORTANT: Return ONLY the content itself. Do not include any meta-commentary, explanations, or labels. Just the post/tweet/article content.`;

    return prompt;
}

function extractHashtags(content: string): string[] {
    const hashtagRegex = /#[\w]+/g;
    const matches = content.match(hashtagRegex) || [];
    return matches.map((tag) => tag.substring(1)); // Remove # symbol
}

function calculateEngagementScore(content: string, platform: string): number {
    let score = 50; // Base score

    // Length factors
    const length = content.length;
    if (platform === "twitter") {
        if (length > 100 && length < 200) score += 10; // Sweet spot for Twitter
    } else if (platform === "linkedin") {
        if (length > 300 && length < 1000) score += 10; // Sweet spot for LinkedIn
    }

    // Engagement indicators
    if (content.includes("?")) score += 5; // Questions drive engagement
    if (content.match(/\d+/)) score += 5; // Numbers attract attention
    if (content.match(/[!]/g)?.length === 1) score += 3; // One exclamation is good
    if (content.match(/[!]/g)?.length && content.match(/[!]/g)!.length > 2) score -= 5; // Too many is bad

    // Hashtags
    const hashtags = extractHashtags(content);
    if (hashtags.length > 0 && hashtags.length <= 3) score += 5;
    if (hashtags.length > 5) score -= 5; // Too many hashtags

    // Emojis (moderate use is good)
    const emojiCount = (content.match(/[\u{1F600}-\u{1F64F}]/gu) || []).length;
    if (emojiCount > 0 && emojiCount <= 3) score += 5;
    if (emojiCount > 5) score -= 5;

    // Cap between 0-100
    return Math.max(0, Math.min(100, score));
}

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    if (minutes < 1) return "< 1 min";
    if (minutes === 1) return "1 min";
    return `${minutes} min`;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Optimize existing content for better engagement
 */
export async function optimizeContent(
    content: string,
    platform: string
): Promise<{ optimized: string; suggestions: string[] }> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a content optimization expert for ${platform}.

Original content:
"""
${content}
"""

Optimize this content for maximum engagement on ${platform}. Consider:
- Hook and opening
- Clarity and readability
- Call-to-action
- Hashtags (if appropriate)
- Length and formatting

Return a JSON object with:
{
  "optimized": "the optimized content",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error("Failed to parse optimization response");
    } catch (error) {
        console.error("Content optimization error:", error);
        throw new Error("Failed to optimize content");
    }
}

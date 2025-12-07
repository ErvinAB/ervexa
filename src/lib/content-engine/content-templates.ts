import type { Platform, Tone, ContentLength } from "./content-types";

// Platform-specific content templates and constraints

export const PLATFORM_CONSTRAINTS = {
    linkedin: {
        maxLength: 3000,
        idealLength: { short: 150, medium: 500, long: 1200 },
        hashtagLimit: 5,
        supportsFormatting: true,
    },
    twitter: {
        maxLength: 280,
        idealLength: { short: 100, medium: 200, long: 280 },
        hashtagLimit: 3,
        supportsFormatting: false,
        threadMaxTweets: 10,
    },
    blog: {
        maxLength: 10000,
        idealLength: { short: 500, medium: 1500, long: 3000 },
        hashtagLimit: 10,
        supportsFormatting: true,
    },
} as const;

export const CONTENT_TEMPLATES = {
    linkedin: {
        professional: `Write a professional LinkedIn post about {topic}.

Structure:
- Hook (first line that grabs attention)
- Main insight or story
- Key takeaways (2-3 bullet points)
- Call to action

Tone: Professional but conversational
Length: {length}
Include relevant emojis sparingly`,

        casual: `Write a casual, relatable LinkedIn post about {topic}.

Structure:
- Personal story or observation
- Why it matters
- Actionable insight
- Engaging question for comments

Tone: Friendly and authentic
Length: {length}
Use emojis to add personality`,

        technical: `Write a technical LinkedIn post about {topic}.

Structure:
- Technical problem or challenge
- Solution or approach
- Code snippet or example (if relevant)
- Technical insights

Tone: Expert but accessible
Length: {length}
Focus on depth and accuracy`,

        storytelling: `Write a storytelling LinkedIn post about {topic}.

Structure:
- Compelling opening scene
- Challenge or conflict
- Resolution or lesson learned
- Broader application

Tone: Narrative and engaging
Length: {length}
Make it memorable and shareable`,
    },

    twitter: {
        professional: `Write a professional tweet about {topic}.

Requirements:
- Clear and concise
- Professional tone
- Include 1-2 relevant hashtags
- Under 280 characters
- Actionable or insightful`,

        casual: `Write a casual, engaging tweet about {topic}.

Requirements:
- Conversational tone
- Relatable and authentic
- Include 1-2 hashtags
- Under 280 characters
- Encourage engagement`,

        technical: `Write a technical tweet about {topic}.

Requirements:
- Technical accuracy
- Clear explanation
- Include relevant hashtags
- Under 280 characters
- Valuable insight`,

        storytelling: `Write a storytelling tweet thread about {topic}.

Requirements:
- Engaging narrative
- 3-5 tweets
- Each under 280 characters
- Numbered (1/5, 2/5, etc.)
- Strong hook in first tweet`,
    },

    blog: {
        professional: `Write a professional blog post outline about {topic}.

Structure:
- Compelling title (SEO-optimized)
- Introduction (hook + overview)
- 3-5 main sections with subheadings
- Conclusion with CTA
- Meta description

Tone: Professional and authoritative
Length: {length}
Include keyword suggestions`,

        casual: `Write a casual blog post outline about {topic}.

Structure:
- Catchy title
- Personal introduction
- 3-5 main sections (conversational)
- Relatable examples
- Friendly conclusion

Tone: Approachable and friendly
Length: {length}
Focus on readability`,

        technical: `Write a technical blog post outline about {topic}.

Structure:
- Technical title
- Problem statement
- Technical deep-dive (3-5 sections)
- Code examples or diagrams
- Technical conclusion

Tone: Expert and detailed
Length: {length}
Include technical keywords`,

        storytelling: `Write a storytelling blog post outline about {topic}.

Structure:
- Narrative title
- Story-driven introduction
- 3-5 story beats
- Lessons and insights
- Memorable conclusion

Tone: Engaging and narrative
Length: {length}
Make it compelling`,
    },
} as const;

export function getTemplate(platform: Platform, tone: Tone): string {
    return CONTENT_TEMPLATES[platform][tone];
}

export function getConstraints(platform: Platform) {
    return PLATFORM_CONSTRAINTS[platform];
}

export function formatContentForPlatform(
    content: string,
    platform: Platform,
    length: ContentLength
): string {
    const constraints = PLATFORM_CONSTRAINTS[platform];
    const idealLength = constraints.idealLength[length];

    // Trim to ideal length if needed
    if (content.length > idealLength * 1.2) {
        content = content.substring(0, idealLength) + "...";
    }

    // Platform-specific formatting
    switch (platform) {
        case "linkedin":
            // LinkedIn supports line breaks and emojis
            return content;

        case "twitter":
            // Twitter: remove excessive line breaks
            return content.replace(/\n{3,}/g, "\n\n");

        case "blog":
            // Blog: add markdown formatting
            return content;

        default:
            return content;
    }
}

// Content Engine Type Definitions

export type Platform = "linkedin" | "twitter" | "blog";
export type Tone = "professional" | "casual" | "technical" | "storytelling";
export type ContentLength = "short" | "medium" | "long";

export interface TrendingTopic {
    id: string;
    title: string;
    description: string;
    source: string;
    url: string;
    category: string;
    publishedAt: Date;
    relevanceScore: number;
}

export interface ContentGenerationRequest {
    topic: string;
    platform: Platform;
    tone: Tone;
    length: ContentLength;
    keywords?: string[];
    targetAudience?: string;
    includeHashtags?: boolean;
    includeCTA?: boolean;
}

export interface ContentVariation {
    id: string;
    content: string;
    platform: Platform;
    tone: Tone;
    engagementScore: number;
    hashtags: string[];
    estimatedReadTime?: string;
    seoScore?: number;
    characterCount: number;
}

export interface ContentGenerationResponse {
    variations: ContentVariation[];
    topic: string;
    generatedAt: Date;
    metadata: {
        platform: Platform;
        tone: Tone;
        length: ContentLength;
    };
}

export interface BrandVoice {
    industry: string;
    targetAudience: string;
    keyTopics: string[];
    writingStyle: string;
    avoidWords?: string[];
    preferredHashtags?: string[];
}

export interface ContentHistory {
    id: string;
    topic: string;
    platform: Platform;
    selectedVariation: ContentVariation;
    generatedAt: Date;
    wasPublished: boolean;
}

export interface SEOAnalysis {
    score: number;
    keywords: string[];
    suggestions: string[];
    metaDescription?: string;
    titleSuggestions?: string[];
}

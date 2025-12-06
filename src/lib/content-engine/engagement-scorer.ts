/**
 * Engagement Scorer - Token-Free Content Analysis
 * 
 * Analyzes content and predicts engagement potential using rule-based algorithms.
 * No AI tokens required - pure algorithmic analysis!
 */

export interface EngagementScore {
    overall: number; // 0-100
    breakdown: {
        hashtags: number;
        emojis: number;
        readability: number;
        structure: number;
        length: number;
        hooks: number;
    };
    suggestions: string[];
    strengths: string[];
}

export interface EngagementAnalysis {
    score: EngagementScore;
    details: {
        hashtagCount: number;
        emojiCount: number;
        wordCount: number;
        sentenceCount: number;
        avgSentenceLength: number;
        hasQuestion: boolean;
        hasCTA: boolean;
        hasHook: boolean;
        readabilityScore: number;
    };
}

const PLATFORM_OPTIMAL_LENGTHS = {
    linkedin: { min: 150, max: 300, ideal: 200 },
    twitter: { min: 100, max: 280, ideal: 150 },
    blog: { min: 800, max: 2000, ideal: 1200 },
};

const OPTIMAL_HASHTAG_COUNT = {
    linkedin: { min: 3, max: 5 },
    twitter: { min: 1, max: 3 },
    blog: { min: 0, max: 2 },
};

const OPTIMAL_EMOJI_COUNT = {
    linkedin: { min: 1, max: 3 },
    twitter: { min: 2, max: 5 },
    blog: { min: 0, max: 1 },
};

const POWER_WORDS = [
    'proven', 'guaranteed', 'exclusive', 'limited', 'secret', 'revolutionary',
    'breakthrough', 'amazing', 'incredible', 'essential', 'critical', 'urgent',
    'now', 'today', 'instant', 'immediately', 'transform', 'boost', 'skyrocket'
];

const CTA_PATTERNS = [
    /learn more/i,
    /click here/i,
    /sign up/i,
    /get started/i,
    /download/i,
    /try (it|now|today)/i,
    /contact (us|me)/i,
    /book a (call|demo)/i,
    /join (us|now)/i,
    /subscribe/i,
    /follow (me|us)/i,
    /share/i,
    /comment below/i,
    /let me know/i,
    /what do you think/i,
];

const HOOK_PATTERNS = [
    /^(did you know|imagine|what if|here's why|the truth is|stop|wait)/i,
    /^[0-9]+ (ways|reasons|tips|secrets|mistakes)/i,
    /^(how to|why you|when to)/i,
];

/**
 * Calculate Flesch Reading Ease Score
 * Higher score = easier to read (0-100)
 */
function calculateReadability(text: string, wordCount: number, sentenceCount: number): number {
    const syllableCount = countSyllables(text);

    if (sentenceCount === 0 || wordCount === 0) return 0;

    const avgSentenceLength = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllableCount / wordCount;

    // Flesch Reading Ease formula
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

    // Normalize to 0-100
    return Math.max(0, Math.min(100, score));
}

/**
 * Approximate syllable count
 */
function countSyllables(text: string): number {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    let count = 0;

    words.forEach(word => {
        // Simple syllable counting algorithm
        const vowels = word.match(/[aeiouy]+/g);
        if (vowels) {
            count += vowels.length;
            // Adjust for silent 'e'
            if (word.endsWith('e')) count--;
        }
        // Minimum 1 syllable per word
        if (count === 0) count = 1;
    });

    return count;
}

/**
 * Count hashtags in content
 */
function countHashtags(text: string): number {
    const hashtags = text.match(/#\w+/g);
    return hashtags ? hashtags.length : 0;
}

/**
 * Count emojis in content
 */
function countEmojis(text: string): number {
    // Unicode emoji ranges
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const emojis = text.match(emojiRegex);
    return emojis ? emojis.length : 0;
}

/**
 * Count sentences in content
 */
function countSentences(text: string): number {
    const sentences = text.match(/[.!?]+/g);
    return sentences ? sentences.length : 1;
}

/**
 * Count words in content
 */
function countWords(text: string): number {
    const words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
}

/**
 * Check if content has a question
 */
function hasQuestion(text: string): boolean {
    return text.includes('?');
}

/**
 * Check if content has a CTA
 */
function hasCTA(text: string): boolean {
    return CTA_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Check if content has a hook
 */
function hasHook(text: string): boolean {
    return HOOK_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Check if content contains power words
 */
function countPowerWords(text: string): number {
    const lowerText = text.toLowerCase();
    return POWER_WORDS.filter(word => lowerText.includes(word)).length;
}

/**
 * Score hashtag usage (0-100)
 */
function scoreHashtags(count: number, platform: keyof typeof OPTIMAL_HASHTAG_COUNT): number {
    const optimal = OPTIMAL_HASHTAG_COUNT[platform];

    if (count >= optimal.min && count <= optimal.max) {
        return 100;
    } else if (count === 0) {
        return platform === 'blog' ? 100 : 40; // Blog doesn't need hashtags
    } else if (count < optimal.min) {
        return 60 + (count / optimal.min) * 40;
    } else {
        // Too many hashtags
        const excess = count - optimal.max;
        return Math.max(30, 100 - (excess * 15));
    }
}

/**
 * Score emoji usage (0-100)
 */
function scoreEmojis(count: number, platform: keyof typeof OPTIMAL_EMOJI_COUNT): number {
    const optimal = OPTIMAL_EMOJI_COUNT[platform];

    if (count >= optimal.min && count <= optimal.max) {
        return 100;
    } else if (count === 0) {
        return platform === 'blog' ? 100 : 60; // Blog doesn't need emojis
    } else if (count < optimal.min) {
        return 70 + (count / optimal.min) * 30;
    } else {
        // Too many emojis
        const excess = count - optimal.max;
        return Math.max(20, 100 - (excess * 20));
    }
}

/**
 * Score content length (0-100)
 */
function scoreLength(wordCount: number, platform: keyof typeof PLATFORM_OPTIMAL_LENGTHS): number {
    const optimal = PLATFORM_OPTIMAL_LENGTHS[platform];

    if (wordCount >= optimal.min && wordCount <= optimal.max) {
        // Within range - score based on proximity to ideal
        const distanceFromIdeal = Math.abs(wordCount - optimal.ideal);
        const maxDistance = optimal.max - optimal.min;
        return 100 - (distanceFromIdeal / maxDistance) * 20;
    } else if (wordCount < optimal.min) {
        // Too short
        return (wordCount / optimal.min) * 70;
    } else {
        // Too long
        const excess = wordCount - optimal.max;
        return Math.max(40, 100 - (excess / optimal.max) * 60);
    }
}

/**
 * Score content structure (0-100)
 */
function scoreStructure(hasQ: boolean, hasCta: boolean, hasHk: boolean, powerWordCount: number): number {
    let score = 50; // Base score

    if (hasQ) score += 15; // Questions engage readers
    if (hasCta) score += 20; // CTAs drive action
    if (hasHk) score += 15; // Hooks grab attention

    // Power words boost engagement
    score += Math.min(powerWordCount * 5, 20);

    return Math.min(100, score);
}

/**
 * Main engagement scoring function
 */
export function scoreEngagement(
    content: string,
    platform: 'linkedin' | 'twitter' | 'blog'
): EngagementAnalysis {
    // Extract metrics
    const hashtagCount = countHashtags(content);
    const emojiCount = countEmojis(content);
    const wordCount = countWords(content);
    const sentenceCount = countSentences(content);
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    const hasQ = hasQuestion(content);
    const hasCta = hasCTA(content);
    const hasHk = hasHook(content);
    const powerWordCount = countPowerWords(content);
    const readabilityScore = calculateReadability(content, wordCount, sentenceCount);

    // Calculate individual scores
    const hashtagScore = scoreHashtags(hashtagCount, platform);
    const emojiScore = scoreEmojis(emojiCount, platform);
    const lengthScore = scoreLength(wordCount, platform);
    const structureScore = scoreStructure(hasQ, hasCta, hasHk, powerWordCount);

    // Normalize readability (60-100 is good, convert to 0-100 scale)
    const readabilityNormalized = readabilityScore >= 60
        ? 100
        : (readabilityScore / 60) * 100;

    // Calculate weighted overall score
    const weights = {
        hashtags: 0.15,
        emojis: 0.10,
        readability: 0.20,
        structure: 0.30,
        length: 0.25,
    };

    const overall = Math.round(
        hashtagScore * weights.hashtags +
        emojiScore * weights.emojis +
        readabilityNormalized * weights.readability +
        structureScore * weights.structure +
        lengthScore * weights.length
    );

    // Generate suggestions
    const suggestions: string[] = [];
    const strengths: string[] = [];

    // Hashtag suggestions
    const optimalHashtags = OPTIMAL_HASHTAG_COUNT[platform];
    if (hashtagCount < optimalHashtags.min && platform !== 'blog') {
        suggestions.push(`Add ${optimalHashtags.min - hashtagCount} more hashtag${optimalHashtags.min - hashtagCount > 1 ? 's' : ''} for better reach`);
    } else if (hashtagCount > optimalHashtags.max) {
        suggestions.push(`Remove ${hashtagCount - optimalHashtags.max} hashtag${hashtagCount - optimalHashtags.max > 1 ? 's' : ''} - too many can look spammy`);
    } else if (hashtagCount >= optimalHashtags.min && hashtagCount <= optimalHashtags.max) {
        strengths.push('Optimal hashtag usage');
    }

    // Emoji suggestions
    const optimalEmojis = OPTIMAL_EMOJI_COUNT[platform];
    if (emojiCount < optimalEmojis.min && platform !== 'blog') {
        suggestions.push('Add 1-2 emojis to make content more engaging');
    } else if (emojiCount > optimalEmojis.max) {
        suggestions.push('Reduce emoji usage for a more professional tone');
    } else if (emojiCount >= optimalEmojis.min && emojiCount <= optimalEmojis.max) {
        strengths.push('Good emoji balance');
    }

    // Length suggestions
    const optimalLength = PLATFORM_OPTIMAL_LENGTHS[platform];
    if (wordCount < optimalLength.min) {
        suggestions.push(`Add ~${optimalLength.min - wordCount} more words for better depth`);
    } else if (wordCount > optimalLength.max) {
        suggestions.push(`Consider shortening by ~${wordCount - optimalLength.max} words`);
    } else {
        strengths.push('Perfect content length');
    }

    // Structure suggestions
    if (!hasQ && platform !== 'blog') {
        suggestions.push('Add a question to encourage engagement');
    }
    if (!hasCta) {
        suggestions.push('Include a clear call-to-action');
    }
    if (!hasHk) {
        suggestions.push('Start with a strong hook to grab attention');
    }
    if (hasQ || hasCta || hasHk) {
        strengths.push('Strong content structure');
    }

    // Readability suggestions
    if (readabilityScore < 60) {
        suggestions.push('Simplify language for better readability');
    } else if (readabilityScore >= 60) {
        strengths.push('Easy to read and understand');
    }

    // Power words
    if (powerWordCount > 0) {
        strengths.push(`Uses ${powerWordCount} power word${powerWordCount > 1 ? 's' : ''}`);
    }

    return {
        score: {
            overall,
            breakdown: {
                hashtags: Math.round(hashtagScore),
                emojis: Math.round(emojiScore),
                readability: Math.round(readabilityNormalized),
                structure: Math.round(structureScore),
                length: Math.round(lengthScore),
                hooks: hasHk ? 100 : 0,
            },
            suggestions: suggestions.slice(0, 3), // Top 3 suggestions
            strengths: strengths.slice(0, 3), // Top 3 strengths
        },
        details: {
            hashtagCount,
            emojiCount,
            wordCount,
            sentenceCount,
            avgSentenceLength,
            hasQuestion: hasQ,
            hasCTA: hasCta,
            hasHook: hasHk,
            readabilityScore,
        },
    };
}

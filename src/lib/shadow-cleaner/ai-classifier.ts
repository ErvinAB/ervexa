import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ClassificationRequest, ClassificationResponse } from "./types";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Classify a message using Gemini AI for advanced threat detection
 */
export async function classifyMessageWithAI(
    request: ClassificationRequest
): Promise<ClassificationResponse> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const prompt = buildClassificationPrompt(request);

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse the AI response
        return parseAIResponse(text);
    } catch (error) {
        console.error("AI classification error:", error);

        // Fallback to basic classification
        return {
            classification: "spam",
            confidence: 0.5,
            indicators: ["AI classification unavailable"],
            reasoning: "Using fallback classification due to AI error",
        };
    }
}

/**
 * Build a structured prompt for Gemini AI
 */
function buildClassificationPrompt(request: ClassificationRequest): string {
    const { message, context } = request;

    return `You are a cybersecurity expert analyzing messages for scam and threat detection.

**Message to analyze:**
"${message}"

**Context:**
${context?.senderName ? `- Sender: ${context.senderName}` : ""}
${context?.accountAge !== undefined ? `- Account age: ${context.accountAge} days` : ""}
${context?.previousMessages ? `- Previous messages: ${context.previousMessages.join("; ")}` : ""}

**Task:**
Classify this message into ONE of the following categories:
1. legitimate - Normal, safe communication
2. spam - Unwanted promotional or bulk messages
3. phishing - Attempts to steal credentials or personal information
4. romance_scam - Romance/relationship scam patterns
5. crypto_scam - Cryptocurrency investment scams
6. fake_profile - Indicators of a fake or bot account

**Provide your response in this EXACT JSON format:**
{
  "classification": "category_name",
  "confidence": 0.0-1.0,
  "indicators": ["indicator1", "indicator2"],
  "reasoning": "brief explanation"
}

**Detection criteria:**
- Romance scams: Excessive affection, requests for money, sob stories, quick relationship escalation
- Crypto scams: Investment opportunities, guaranteed returns, wallet requests, trading signals
- Phishing: Urgency, account verification, suspicious links, credential requests
- Spam: Generic messages, promotional content, mass-sent patterns
- Fake profiles: Generic greetings, probing questions, inconsistent information

Respond ONLY with valid JSON, no additional text.`;
}

/**
 * Parse AI response into structured classification
 */
function parseAIResponse(text: string): ClassificationResponse {
    try {
        // Remove markdown code blocks if present
        const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        const parsed = JSON.parse(cleanText);

        // Validate classification type
        const validClassifications = [
            "legitimate",
            "spam",
            "phishing",
            "romance_scam",
            "crypto_scam",
            "fake_profile",
        ];

        if (!validClassifications.includes(parsed.classification)) {
            throw new Error("Invalid classification type");
        }

        return {
            classification: parsed.classification,
            confidence: Math.max(0, Math.min(1, parsed.confidence)),
            indicators: Array.isArray(parsed.indicators) ? parsed.indicators : [],
            reasoning: parsed.reasoning || "No reasoning provided",
        };
    } catch (error) {
        console.error("Failed to parse AI response:", error);

        // Fallback response
        return {
            classification: "spam",
            confidence: 0.3,
            indicators: ["Unable to parse AI response"],
            reasoning: "Classification failed, defaulting to spam",
        };
    }
}

/**
 * Batch classify multiple messages
 */
export async function classifyMultipleMessages(
    messages: Array<{
        message: string;
        context?: ClassificationRequest["context"];
    }>
): Promise<ClassificationResponse[]> {
    const results: ClassificationResponse[] = [];

    for (const msg of messages) {
        const result = await classifyMessageWithAI({
            message: msg.message,
            context: msg.context,
        });
        results.push(result);

        // Small delay to avoid rate limiting
        await sleep(100);
    }

    return results;
}

/**
 * Get threat score from classification (0-100, higher = more dangerous)
 */
export function getThreatScore(classification: ClassificationResponse): number {
    const baseScores: Record<ClassificationResponse["classification"], number> = {
        legitimate: 0,
        spam: 20,
        phishing: 70,
        romance_scam: 85,
        crypto_scam: 90,
        fake_profile: 60,
    };

    const baseScore = baseScores[classification.classification];
    const confidenceMultiplier = classification.confidence;

    return Math.round(baseScore * confidenceMultiplier);
}

/**
 * Utility function to sleep/delay
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

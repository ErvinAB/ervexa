import { CompanyAnalysis } from './analyzer';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function draftOutreach(company: CompanyAnalysis, myValueProp: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    You are a world-class Sales Development Representative (SDR).
    
    Your Goal: Write a personalized cold email to a decision-maker at the target company.
    
    Target Company Info:
    Name: ${company.name}
    Description: ${company.description}
    Context: ${company.mainContent.slice(0, 1000)}...
    
    My Value Proposition (What I am selling):
    ${myValueProp}
    
    Instructions:
    1. Analyze what the target company does.
    2. Identify a likely pain point they have that my product solves.
    3. Write a short, punchy, 3-sentence email.
    4. Subject line should be casual and relevant.
    5. Tone: Professional but conversational. No marketing fluff.
    
    Output Format:
    You must output ONLY valid JSON. Do not include any other text.
    {
      "subject": "Email Subject",
      "body": "Email Body",
      "reasoning": "Why I wrote this..."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present (Gemini sometimes adds them)
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error: unknown) {
    const err = error as Error & { status?: number; statusText?: string; errorDetails?: unknown };
    console.error('Gemini API Error Details:', {
      message: err.message,
      status: err.status,
      statusText: err.statusText,
      details: err.errorDetails,
      stack: err.stack
    });

    // Check if it's a 404 (Model not found) or 400 (Bad Request)
    if (err.message?.includes('404')) {
      throw new Error('Gemini Model not found. Try using "gemini-pro" or check if your API key has access to this model.');
    }

    throw new Error(`Gemini API Failed: ${err.message || 'Unknown error'}`);
  }
}

import { CompanyAnalysis } from './analyzer';

/**
 * Draft personalized outreach email using AI
 * 
 * Uses Groq API (FREE, 1000 requests/day) with fallback to OpenAI
 */
export async function draftOutreach(company: CompanyAnalysis, myValueProp: string) {
  // Try Groq first (free tier), fallback to OpenAI if needed
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !openaiKey) {
    throw new Error('Please set GROQ_API_KEY or OPENAI_API_KEY in .env.local');
  }

  const prompt = `You are a world-class Sales Development Representative (SDR).

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
}`;

  try {
    // Try Groq first (FREE and FAST!)
    if (groqKey) {
      return await callGroq(groqKey, prompt);
    }

    // Fallback to OpenAI
    if (openaiKey) {
      return await callOpenAI(openaiKey, prompt);
    }

    throw new Error('No API key available');
  } catch (error: unknown) {
    const err = error as Error;
    console.error('AI API Error:', err.message);
    throw new Error(`AI API Failed: ${err.message || 'Unknown error'}`);
  }
}

/**
 * Call Groq API (FREE - 1000 requests/day)
 */
async function callGroq(apiKey: string, prompt: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile', // Fast and smart
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;

  // Clean up markdown code blocks if present
  const jsonString = text.replace(/```json\n|\n```/g, '').trim();

  return JSON.parse(jsonString);
}

/**
 * Call OpenAI API (Fallback)
 */
async function callOpenAI(apiKey: string, prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;

  // Clean up markdown code blocks if present
  const jsonString = text.replace(/```json\n|\n```/g, '').trim();

  return JSON.parse(jsonString);
}


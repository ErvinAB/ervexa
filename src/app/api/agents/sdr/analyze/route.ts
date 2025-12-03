import { NextResponse } from 'next/server';
import { analyzeCompany } from '@/lib/agents/sdr/analyzer';
import { draftOutreach } from '@/lib/agents/sdr/drafter';

export async function POST(request: Request) {
    try {
        const { url, valueProp } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // 1. Analyze the company
        const companyData = await analyzeCompany(url);

        // 2. Draft the email
        const outreach = await draftOutreach(companyData, valueProp || "We help companies scale their AI automations.");

        return NextResponse.json({
            company: companyData,
            outreach
        });

    } catch (error) {
        console.error('SDR Agent Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import { runOutreachCampaign } from '@/lib/outreach/orchestrator';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            minScore = 70,
            limit = 50,
            valueProp = 'We help companies automate their workflows with AI',
            useSequence = false,
            sequenceId,
        } = body;

        const result = await runOutreachCampaign({
            minScore,
            limit,
            valueProp,
            useSequence,
            sequenceId,
        });

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error('Outreach campaign error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

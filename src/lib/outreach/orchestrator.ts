/**
 * Outreach Orchestrator
 * Combines lead generation, AI analysis, and email sending
 */

import { getLeadsForOutreach } from '../supabase/leads';
import { analyzeCompany } from '../agents/sdr/analyzer';
import { draftOutreach } from '../agents/sdr/drafter';
import { sendOutreachEmail } from '../email/sender';
import { startSequence } from '../email/sequences';

/**
 * Run complete outreach campaign
 */
export async function runOutreachCampaign(params: {
    minScore?: number;
    limit?: number;
    valueProp?: string;
    useSequence?: boolean;
    sequenceId?: string;
}): Promise<{
    total: number;
    sent: number;
    failed: number;
    errors: string[];
}> {
    const {
        minScore = 70,
        limit = 50,
        valueProp = 'We help companies automate their workflows with AI',
        useSequence = false,
        sequenceId,
    } = params;

    console.log(`🚀 Starting outreach campaign...`);
    console.log(`- Min score: ${minScore}`);
    console.log(`- Limit: ${limit}`);
    console.log(`- Use sequence: ${useSequence}`);

    // Get high-quality leads
    const leads = await getLeadsForOutreach(minScore, limit);

    if (leads.length === 0) {
        console.log('❌ No leads found matching criteria');
        return { total: 0, sent: 0, failed: 0, errors: [] };
    }

    console.log(`📊 Found ${leads.length} leads`);

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const lead of leads) {
        try {
            console.log(`\n📧 Processing: ${lead.company}`);

            // Skip if no email
            if (!lead.contact_email) {
                console.log(`⚠️  No email for ${lead.company}, skipping`);
                failed++;
                errors.push(`${lead.company}: No email address`);
                continue;
            }

            if (useSequence && sequenceId) {
                // Start email sequence
                const variables = {
                    company: lead.company,
                    contact_name: lead.contact_name || 'there',
                    observation: lead.pain_points?.[0] || 'growing fast',
                    value_prop: valueProp,
                    benefit: 'save time and money',
                    pain_point: lead.pain_points?.[0] || 'manual processes',
                };

                const success = await startSequence(lead.id!, sequenceId, variables);

                if (success) {
                    console.log(`✅ Sequence started for ${lead.company}`);
                    sent++;
                } else {
                    console.log(`❌ Failed to start sequence for ${lead.company}`);
                    failed++;
                    errors.push(`${lead.company}: Failed to start sequence`);
                }
            } else {
                // Send single email with AI personalization

                // 1. Analyze company (if we have website)
                let companyData;
                if (lead.website) {
                    console.log(`  🔍 Analyzing ${lead.website}...`);
                    companyData = await analyzeCompany(lead.website);
                } else {
                    // Use basic info
                    companyData = {
                        url: '',
                        name: lead.company,
                        description: lead.industry || '',
                        mainContent: '',
                    };
                }

                // 2. Generate personalized email
                console.log(`  🤖 Generating personalized email...`);
                const outreach = await draftOutreach(companyData, valueProp);

                // 3. Send email
                console.log(`  📨 Sending email...`);
                const result = await sendOutreachEmail({
                    to: lead.contact_email,
                    subject: outreach.subject,
                    body: outreach.body,
                    leadId: lead.id!,
                    aiReasoning: outreach.reasoning,
                });

                if (result.success) {
                    console.log(`  ✅ Email sent to ${lead.company}`);
                    sent++;
                } else {
                    console.log(`  ❌ Failed to send email to ${lead.company}: ${result.error}`);
                    failed++;
                    errors.push(`${lead.company}: ${result.error}`);
                }
            }

            // Rate limiting: wait 2 seconds between leads
            await new Promise((resolve) => setTimeout(resolve, 2000));

        } catch (error) {
            console.error(`Error processing ${lead.company}:`, error);
            failed++;
            errors.push(`${lead.company}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    console.log(`\n✅ Campaign complete!`);
    console.log(`- Total: ${leads.length}`);
    console.log(`- Sent: ${sent}`);
    console.log(`- Failed: ${failed}`);

    return {
        total: leads.length,
        sent,
        failed,
        errors,
    };
}

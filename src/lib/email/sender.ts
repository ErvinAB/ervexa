/**
 * Email Automation with Resend
 */

import { Resend } from 'resend';
import { supabase } from '../supabase/client';

// Use placeholder key during build if real key is missing
const resendApiKey = process.env.RESEND_API_KEY || 're_123456789';

const resend = new Resend(resendApiKey);

// Warn if using placeholder, but don't crash the build
if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set. Using placeholder for build. Email sending will fail at runtime.');
}

/**
 * Send outreach email
 */
export async function sendOutreachEmail(params: {
    to: string;
    subject: string;
    body: string;
    leadId: string;
    aiReasoning?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Ervin from Stagbyte <ervin@stagbyte.com>',
            to: params.to,
            subject: params.subject,
            html: convertToHTML(params.body),
            text: params.body,
            tags: [
                { name: 'lead_id', value: params.leadId },
                { name: 'campaign', value: 'outreach' },
            ],
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }

        // Track in database
        await supabase.from('outreach').insert({
            lead_id: params.leadId,
            channel: 'email',
            subject: params.subject,
            body: params.body,
            ai_reasoning: params.aiReasoning,
            sent_at: new Date().toISOString(),
        });

        // Update lead status
        await supabase
            .from('leads')
            .update({
                status: 'contacted',
                last_contact: new Date().toISOString(),
            })
            .eq('id', params.leadId);

        return { success: true, messageId: data?.id };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Send bulk outreach emails
 */
export async function sendBulkOutreach(
    leads: Array<{
        id: string;
        email: string;
        subject: string;
        body: string;
        aiReasoning?: string;
    }>
): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;

    for (const lead of leads) {
        const result = await sendOutreachEmail({
            to: lead.email,
            subject: lead.subject,
            body: lead.body,
            leadId: lead.id,
            aiReasoning: lead.aiReasoning,
        });

        if (result.success) {
            sent++;
        } else {
            failed++;
        }

        // Rate limiting: wait 100ms between emails
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return { sent, failed };
}

/**
 * Convert plain text to HTML email
 */
function convertToHTML(text: string): string {
    // Simple conversion: preserve line breaks and add basic styling
    const paragraphs = text
        .split('\n\n')
        .map((p) => `<p style="margin: 0 0 16px 0; line-height: 1.5;">${p.replace(/\n/g, '<br>')}</p>`)
        .join('');

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  ${paragraphs}
  
  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
    <p style="margin: 0;">Ervin Abedin</p>
    <p style="margin: 4px 0 0 0;">Founder, Stagbyte</p>
    <p style="margin: 4px 0 0 0;"><a href="https://stagbyte.com" style="color: #6366f1; text-decoration: none;">stagbyte.com</a></p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Track email open (webhook handler)
 */
export async function trackEmailOpen(messageId: string) {
    // Find outreach by message ID (you'll need to store this)
    // For now, we'll use Resend webhooks
    console.log('Email opened:', messageId);
}

/**
 * Track email click (webhook handler)
 */
export async function trackEmailClick(messageId: string, url: string) {
    console.log('Email clicked:', messageId, url);
}

/**
 * Track email reply
 */
export async function trackEmailReply(leadId: string, replyContent: string) {
    await supabase
        .from('outreach')
        .update({
            replied_at: new Date().toISOString(),
            reply_content: replyContent,
        })
        .eq('lead_id', leadId)
        .order('sent_at', { ascending: false })
        .limit(1);

    await supabase
        .from('leads')
        .update({ status: 'responded' })
        .eq('id', leadId);
}

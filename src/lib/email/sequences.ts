/**
 * Email Sequence Management
 */

import { supabase, type EmailSequence, type ScheduledEmail } from '../supabase/client';

/**
 * Get all email sequences
 */
export async function getSequences(): Promise<EmailSequence[]> {
    const { data, error } = await supabase
        .from('sequences')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching sequences:', error);
        return [];
    }

    return data || [];
}

/**
 * Get a single sequence
 */
export async function getSequence(id: string): Promise<EmailSequence | null> {
    const { data, error } = await supabase
        .from('sequences')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching sequence:', error);
        return null;
    }

    return data;
}

/**
 * Start an email sequence for a lead
 */
export async function startSequence(
    leadId: string,
    sequenceId: string,
    variables: Record<string, string>
): Promise<boolean> {
    const sequence = await getSequence(sequenceId);

    if (!sequence) {
        console.error('Sequence not found:', sequenceId);
        return false;
    }

    // Schedule all emails in the sequence
    const scheduledEmails: Omit<ScheduledEmail, 'id' | 'created_at'>[] = sequence.emails.map((email) => {
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + email.delay_days);

        return {
            lead_id: leadId,
            sequence_id: sequenceId,
            subject: replaceVariables(email.subject, variables),
            body: replaceVariables(email.body, variables),
            scheduled_for: scheduledDate,
            status: 'pending' as const,
        };
    });

    const { error } = await supabase
        .from('scheduled_emails')
        .insert(scheduledEmails);

    if (error) {
        console.error('Error scheduling emails:', error);
        return false;
    }

    return true;
}

/**
 * Replace template variables in text
 */
function replaceVariables(text: string, variables: Record<string, string>): string {
    let result = text;

    for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return result;
}

/**
 * Cancel a sequence for a lead
 */
export async function cancelSequence(leadId: string): Promise<boolean> {
    const { error } = await supabase
        .from('scheduled_emails')
        .update({ status: 'cancelled' })
        .eq('lead_id', leadId)
        .eq('status', 'pending');

    if (error) {
        console.error('Error cancelling sequence:', error);
        return false;
    }

    return true;
}

/**
 * Get pending emails to send (for cron job)
 */
export async function getPendingEmails(): Promise<ScheduledEmail[]> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('scheduled_emails')
        .select('*')
        .eq('status', 'pending')
        .lte('scheduled_for', now)
        .order('scheduled_for', { ascending: true })
        .limit(100);

    if (error) {
        console.error('Error fetching pending emails:', error);
        return [];
    }

    return data || [];
}

/**
 * Mark email as sent
 */
export async function markEmailSent(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('scheduled_emails')
        .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        console.error('Error marking email as sent:', error);
        return false;
    }

    return true;
}

/**
 * Mark email as failed
 */
export async function markEmailFailed(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('scheduled_emails')
        .update({ status: 'failed' })
        .eq('id', id);

    if (error) {
        console.error('Error marking email as failed:', error);
        return false;
    }

    return true;
}

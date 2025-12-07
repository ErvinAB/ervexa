/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Lead {
    id?: string;
    company: string;
    website?: string;
    industry?: string;
    company_size?: string;
    location?: string;
    linkedin_company_url?: string;
    contact_name?: string;
    contact_title?: string;
    contact_email?: string;
    contact_linkedin?: string;
    score?: number;
    pain_points?: string[];
    tech_stack?: string[];
    status?: 'new' | 'researched' | 'contacted' | 'responded' | 'qualified' | 'customer';
    last_contact?: Date;
    notes?: string;
    source?: 'manual' | 'linkedin' | 'referral' | 'scraper';
    created_at?: Date;
    updated_at?: Date;
}

export interface Outreach {
    id?: string;
    lead_id: string;
    channel: 'email' | 'linkedin' | 'phone';
    subject?: string;
    body: string;
    sent_at?: Date;
    opened_at?: Date;
    clicked_at?: Date;
    replied_at?: Date;
    reply_content?: string;
    ai_reasoning?: string;
    created_at?: Date;
}

export interface EmailSequence {
    id?: string;
    name: string;
    description?: string;
    emails: Array<{
        step: number;
        delay_days: number;
        subject: string;
        body: string;
    }>;
    active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface ScheduledEmail {
    id?: string;
    lead_id: string;
    sequence_id?: string;
    subject: string;
    body: string;
    scheduled_for: Date;
    sent_at?: Date;
    status?: 'pending' | 'sent' | 'failed' | 'cancelled';
    created_at?: Date;
}

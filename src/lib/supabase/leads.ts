/**
 * Lead Management Functions
 * CRUD operations for leads in Supabase
 */

import { supabase, type Lead } from './client';

/**
 * Create a new lead
 */
export async function createLead(lead: Lead): Promise<Lead | null> {
    const { data, error } = await supabase
        .from('leads')
        .insert([lead])
        .select()
        .single();

    if (error) {
        console.error('Error creating lead:', error);
        return null;
    }

    return data;
}

/**
 * Get all leads with optional filtering
 */
export async function getLeads(filters?: {
    status?: string;
    minScore?: number;
    limit?: number;
}): Promise<Lead[]> {
    let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    if (filters?.minScore) {
        query = query.gte('score', filters.minScore);
    }

    if (filters?.limit) {
        query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }

    return data || [];
}

/**
 * Get a single lead by ID
 */
export async function getLead(id: string): Promise<Lead | null> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching lead:', error);
        return null;
    }

    return data;
}

/**
 * Update a lead
 */
export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating lead:', error);
        return null;
    }

    return data;
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting lead:', error);
        return false;
    }

    return true;
}

/**
 * Get high-priority leads for outreach
 */
export async function getLeadsForOutreach(minScore: number = 70, limit: number = 50): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', 'new')
        .gte('score', minScore)
        .order('score', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching leads for outreach:', error);
        return [];
    }

    return data || [];
}

/**
 * Bulk create leads
 */
export async function bulkCreateLeads(leads: Lead[]): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .insert(leads)
        .select();

    if (error) {
        console.error('Error bulk creating leads:', error);
        return [];
    }

    return data || [];
}

/**
 * Search leads by company name or contact name
 */
export async function searchLeads(query: string): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .or(`company.ilike.%${query}%,contact_name.ilike.%${query}%`)
        .order('score', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error searching leads:', error);
        return [];
    }

    return data || [];
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
    const { data, error } = await supabase
        .from('outreach_stats')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching stats:', error);
        return null;
    }

    return data;
}

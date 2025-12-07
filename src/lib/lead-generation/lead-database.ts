/**
 * Lead Database Storage
 * 
 * Simple file-based storage for leads
 * In production, use a real database (Supabase, PostgreSQL, etc.)
 */

import fs from 'fs/promises';
import path from 'path';
import type { Lead } from './types';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

/**
 * Load all leads from storage
 */
export async function loadLeads(): Promise<Lead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

/**
 * Save leads to storage
 */
export async function saveLeads(leads: Lead[]): Promise<void> {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

/**
 * Add a new lead
 */
export async function addLead(lead: Lead): Promise<void> {
    const leads = await loadLeads();

    // Check for duplicates
    const exists = leads.some(l =>
        l.company === lead.company ||
        l.website === lead.website
    );

    if (!exists) {
        leads.push(lead);
        await saveLeads(leads);
    }
}

/**
 * Add multiple leads
 */
export async function addLeads(newLeads: Lead[]): Promise<void> {
    const existingLeads = await loadLeads();

    // Filter out duplicates
    const uniqueLeads = newLeads.filter(newLead =>
        !existingLeads.some(existing =>
            existing.company === newLead.company ||
            existing.website === newLead.website
        )
    );

    if (uniqueLeads.length > 0) {
        await saveLeads([...existingLeads, ...uniqueLeads]);
    }
}

/**
 * Update a lead
 */
export async function updateLead(id: string, updates: Partial<Lead>): Promise<void> {
    const leads = await loadLeads();
    const index = leads.findIndex(l => l.id === id);

    if (index !== -1) {
        leads[index] = {
            ...leads[index],
            ...updates,
            updatedAt: new Date(),
        };
        await saveLeads(leads);
    }
}

/**
 * Get leads by status
 */
export async function getLeadsByStatus(
    status: Lead['status']
): Promise<Lead[]> {
    const leads = await loadLeads();
    return leads.filter(l => l.status === status);
}

/**
 * Get high-priority leads
 */
export async function getHighPriorityLeads(
    minScore: number = 70
): Promise<Lead[]> {
    const leads = await loadLeads();
    return leads
        .filter(l => l.score >= minScore && l.status === 'new')
        .sort((a, b) => b.score - a.score);
}

/**
 * Export leads to CSV
 */
export async function exportLeadsToCSV(): Promise<string> {
    const leads = await loadLeads();

    const headers = [
        'Company',
        'Website',
        'Industry',
        'Size',
        'Contact Name',
        'Contact Title',
        'Contact Email',
        'Score',
        'Status',
    ].join(',');

    const rows = leads.map(lead => [
        lead.company,
        lead.website,
        lead.industry,
        lead.companySize || '',
        lead.contactName || '',
        lead.contactTitle || '',
        lead.contactEmail || '',
        lead.score,
        lead.status,
    ].join(','));

    return [headers, ...rows].join('\n');
}

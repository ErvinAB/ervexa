/**
 * Lead Generation Orchestrator
 * 
 * Main entry point for lead generation workflow
 */

import { getTargetCompanies } from './company-scraper';
import { findDecisionMakers } from './profile-scraper';
import { qualifyLead, enrichLead } from './lead-qualifier';
import { addLeads, getHighPriorityLeads } from './lead-database';
import type { Lead } from './types';

/**
 * Complete lead generation workflow
 * 
 * 1. Get target companies
 * 2. Find decision makers
 * 3. Qualify and score leads
 * 4. Save to database
 * 5. Return prioritized list
 */
export async function generateLeads(count: number = 100): Promise<Lead[]> {
    console.log(`🎯 Starting lead generation for ${count} companies...`);

    // Step 1: Get companies
    console.log('📊 Fetching target companies...');
    const companies = getTargetCompanies();

    // Step 2: Enrich with contact info
    console.log('👥 Finding decision makers...');
    const enrichedLeads: Lead[] = [];

    for (const company of companies.slice(0, count)) {
        try {
            // Find contacts at this company
            const contacts = await findDecisionMakers(company.company);

            if (contacts.length > 0) {
                // Use first contact found
                const lead: Lead = {
                    ...company,
                    ...contacts[0],
                };

                // Qualify the lead
                lead.score = qualifyLead(lead);

                enrichedLeads.push(lead);
            } else {
                // No contact found, add company anyway
                company.score = qualifyLead(company);
                enrichedLeads.push(company);
            }
        } catch (error) {
            console.error(`Error processing ${company.company}:`, error);
        }
    }

    // Step 3: Save to database
    console.log('💾 Saving leads to database...');
    await addLeads(enrichedLeads);

    // Step 4: Return prioritized leads
    console.log('✅ Lead generation complete!');
    const prioritized = enrichedLeads.sort((a, b) => b.score - a.score);

    console.log(`\n📈 Results:`);
    console.log(`- Total leads: ${prioritized.length}`);
    console.log(`- High priority (70+): ${prioritized.filter(l => l.score >= 70).length}`);
    console.log(`- Medium priority (50-69): ${prioritized.filter(l => l.score >= 50 && l.score < 70).length}`);
    console.log(`- Low priority (<50): ${prioritized.filter(l => l.score < 50).length}`);

    return prioritized;
}

/**
 * Get leads ready for outreach
 */
export async function getLeadsForOutreach(
    minScore: number = 60,
    limit: number = 50
): Promise<Lead[]> {
    const leads = await getHighPriorityLeads(minScore);
    return leads.slice(0, limit);
}

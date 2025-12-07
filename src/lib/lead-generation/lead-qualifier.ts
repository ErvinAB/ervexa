/**
 * Lead Qualification System
 * 
 * Scores leads based on multiple criteria to prioritize outreach
 */

import type { Lead, LeadQualificationCriteria } from './types';

/**
 * Calculate lead quality score (0-100)
 * 
 * Scoring factors:
 * - Industry match (20%)
 * - Company size (20%)
 * - Tech stack (15%)
 * - Growth indicators (25%)
 * - Pain point match (20%)
 */
export function qualifyLead(lead: Lead): number {
    const criteria: LeadQualificationCriteria = {
        industryMatch: scoreIndustryMatch(lead.industry),
        sizeMatch: scoreSizeMatch(lead.companySize),
        techStackMatch: scoreTechStack(lead.techStack),
        growthIndicators: scoreGrowthIndicators(lead),
        painPointMatch: scorePainPoints(lead.painPoints),
    };

    // Weighted score
    const score =
        criteria.industryMatch * 0.20 +
        criteria.sizeMatch * 0.20 +
        criteria.techStackMatch * 0.15 +
        criteria.growthIndicators * 0.25 +
        criteria.painPointMatch * 0.20;

    return Math.round(score * 100);
}

/**
 * Score industry match
 */
function scoreIndustryMatch(industry?: string): number {
    if (!industry) return 0.5;

    const targetIndustries = [
        'software',
        'saas',
        'technology',
        'fintech',
        'e-commerce',
        'marketing',
        'consulting',
        'agency',
    ];

    const industryLower = industry.toLowerCase();
    const isMatch = targetIndustries.some(target =>
        industryLower.includes(target)
    );

    return isMatch ? 1.0 : 0.3;
}

/**
 * Score company size match
 * 
 * Sweet spot: 50-500 employees
 * - Big enough to have budget
 * - Small enough to move fast
 */
function scoreSizeMatch(size?: string): number {
    if (!size) return 0.5;

    const sizeScores: Record<string, number> = {
        '1-10': 0.3,        // Too small, limited budget
        '11-50': 0.7,       // Good, but might be tight on budget
        '51-200': 1.0,      // Perfect size
        '201-500': 1.0,     // Perfect size
        '501-1000': 0.8,    // Good, but slower decision making
        '1000+': 0.5,       // Too big, slow processes
    };

    return sizeScores[size] || 0.5;
}

/**
 * Score tech stack match
 * 
 * Companies using modern tech are more likely to adopt automation
 */
function scoreTechStack(techStack?: string[]): number {
    if (!techStack || techStack.length === 0) return 0.5;

    const modernTech = [
        'react', 'nextjs', 'typescript', 'node',
        'aws', 'gcp', 'azure', 'vercel', 'netlify',
        'stripe', 'shopify', 'salesforce',
        'slack', 'notion', 'airtable',
    ];

    const matches = techStack.filter(tech =>
        modernTech.some(modern =>
            tech.toLowerCase().includes(modern)
        )
    );

    return Math.min(matches.length / 5, 1.0);
}

/**
 * Score growth indicators
 * 
 * Signals that company is growing and needs automation:
 * - Recent funding
 * - Hiring actively
 * - Expanding to new markets
 * - New product launches
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scoreGrowthIndicators(_lead: Lead): number {
    // This would check:
    // - Recent job postings (hiring = growth)
    // - Funding announcements
    // - Product launches
    // - Team size growth

    // For now, return neutral score
    // In production, integrate with:
    // - Crunchbase API (funding data)
    // - LinkedIn job postings
    // - Company news/press releases

    return 0.7; // Default to slightly positive
}

/**
 * Score pain point match
 * 
 * How well does their pain match our solution?
 */
function scorePainPoints(painPoints?: string[]): number {
    if (!painPoints || painPoints.length === 0) return 0.5;

    const ourSolutions = [
        'automation',
        'ai',
        'efficiency',
        'scaling',
        'manual processes',
        'repetitive tasks',
        'data entry',
        'lead generation',
        'content creation',
        'outreach',
    ];

    const matches = painPoints.filter(pain =>
        ourSolutions.some(solution =>
            pain.toLowerCase().includes(solution)
        )
    );

    return Math.min(matches.length / 3, 1.0);
}

/**
 * Enrich lead with additional data
 * 
 * Use various APIs to gather more information
 */

export async function enrichLead(lead: Lead): Promise<Lead> {
    // 1. Get company data from Clearbit
    // 2. Find tech stack from BuiltWith
    // 3. Check funding from Crunchbase
    // 4. Find pain points from job postings

    // For now, return lead as-is
    // In production, integrate with data providers

    return {
        ...lead,
        score: qualifyLead(lead),
        updatedAt: new Date(),
    };
}

/**
 * Prioritize leads for outreach
 * 
 * Returns leads sorted by score (highest first)
 */
export function prioritizeLeads(leads: Lead[]): Lead[] {
    return leads
        .map(lead => ({
            ...lead,
            score: qualifyLead(lead),
        }))
        .sort((a, b) => b.score - a.score);
}

/**
 * Filter leads by minimum score
 */
export function filterQualifiedLeads(
    leads: Lead[],
    minScore: number = 60
): Lead[] {
    return leads.filter(lead => lead.score >= minScore);
}

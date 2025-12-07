/**
 * LinkedIn Profile Scraper
 * 
 * Finds decision makers at target companies
 */

import type { Lead } from './types';

interface ScrapedProfile {
    name: string;
    title: string;
    company: string;
    linkedinUrl: string;
    location?: string;
    email?: string; // Often not publicly available
}

/**
 * Find decision makers at a company
 * 
 * LEGAL ALTERNATIVES (Recommended):
 * 1. Apollo.io - B2B contact database
 * 2. Hunter.io - Email finder
 * 3. Clearbit - Company data enrichment
 * 4. LinkedIn Sales Navigator - Official API
 * 5. Manual research - Most reliable
 */
export async function findDecisionMakers(
    companyName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _titles: string[] = ['CTO', 'VP Engineering', 'Head of Operations']
): Promise<Partial<Lead>[]> {
    console.warn('Use legal data providers like Apollo.io or Hunter.io');

    // Mock data for demonstration
    const mockProfiles: ScrapedProfile[] = [
        {
            name: 'John Smith',
            title: 'CTO',
            company: companyName,
            linkedinUrl: 'https://linkedin.com/in/johnsmith',
            location: 'San Francisco, CA',
        },
    ];

    return mockProfiles.map(profile => ({
        contactName: profile.name,
        contactTitle: profile.title,
        contactLinkedIn: profile.linkedinUrl,
        contactEmail: profile.email,
    }));
}

/**
 * Recommended: Use Apollo.io API
 * 
 * Apollo.io provides legal B2B contact data
 */
export async function getContactsFromApollo(
    companyDomain: string,
    titles: string[]
): Promise<Partial<Lead>[]> {
    const APOLLO_API_KEY = process.env.APOLLO_API_KEY;

    if (!APOLLO_API_KEY) {
        throw new Error('Apollo API key not configured');
    }

    // Example Apollo.io API call
    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Api-Key': APOLLO_API_KEY,
        },
        body: JSON.stringify({
            organization_domains: [companyDomain],
            person_titles: titles,
            page: 1,
            per_page: 10,
        }),
    });

    const data = await response.json();

    // Convert Apollo data to Lead format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.people?.map((person: any) => ({
        contactName: person.name,
        contactTitle: person.title,
        contactEmail: person.email,
        contactLinkedIn: person.linkedin_url,
    })) || [];
}

/**
 * Recommended: Use Hunter.io for email finding
 */
export async function findEmailWithHunter(
    firstName: string,
    lastName: string,
    domain: string
): Promise<string | null> {
    const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

    if (!HUNTER_API_KEY) {
        throw new Error('Hunter API key not configured');
    }

    const response = await fetch(
        `https://api.hunter.io/v2/email-finder?domain=${domain}&first_name=${firstName}&last_name=${lastName}&api_key=${HUNTER_API_KEY}`
    );

    const data = await response.json();
    return data.data?.email || null;
}

/**
 * Manual research helper
 * 
 * This is the most reliable and legal approach
 */
export function getManualResearchTemplate(companyName: string): string {
    return `
Manual Research Checklist for ${companyName}:

1. Visit company website
2. Check "About" or "Team" page
3. Look for leadership team
4. Find relevant decision makers:
   - CTO / VP Engineering (for technical products)
   - COO / VP Operations (for automation/efficiency)
   - Head of Growth (for marketing tools)
   
5. Find contact info:
   - LinkedIn profile
   - Company email format (use Hunter.io)
   - Direct email if available
   
6. Research pain points:
   - Recent blog posts
   - Job postings (what they're hiring for)
   - LinkedIn posts (what they're talking about)
   - Tech stack (BuiltWith, Wappalyzer)
`;
}

/**
 * LinkedIn Lead Generation System
 * 
 * Complete lead scraping and qualification system for B2B outreach
 */

export interface Lead {
    id: string;

    // Company Info
    company: string;
    website: string;
    industry: string;
    companySize?: string;
    location?: string;
    linkedinCompanyUrl?: string;

    // Contact Info
    contactName?: string;
    contactTitle?: string;
    contactLinkedIn?: string;
    contactEmail?: string;

    // Qualification
    score: number; // 0-100
    painPoints?: string[];
    techStack?: string[];

    // Status
    status: 'new' | 'researched' | 'contacted' | 'responded' | 'qualified' | 'customer';
    lastContact?: Date;
    notes?: string;

    // Metadata
    source: 'linkedin' | 'manual' | 'referral';
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanySearchFilters {
    industry?: string[];
    size?: string[]; // '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
    location?: string[];
    keywords?: string[];
}

export interface ProfileSearchFilters {
    title?: string[]; // 'CTO', 'VP Engineering', 'Head of Operations'
    company?: string;
    location?: string[];
    keywords?: string[];
}

export interface LeadQualificationCriteria {
    industryMatch: number; // Weight: 0-1
    sizeMatch: number;
    techStackMatch: number;
    growthIndicators: number;
    painPointMatch: number;
}

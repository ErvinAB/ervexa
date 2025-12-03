// Shadow Cleaner Type Definitions

export interface ShadowScore {
    score: number; // 0-100
    threatLevel: "safe" | "caution" | "warning" | "critical";
    breakdown: {
        emailBreaches: number;
        phoneLeaks: number;
        suspiciousContacts: number;
        scamMessages: number;
        privacyGaps: number;
    };
    lastUpdated: Date;
}

export interface TelegramContact {
    id?: string;
    username?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    lastMessage?: string;
    accountAge?: number; // days since account creation
    messageCount?: number;
    isVerified?: boolean;
}

export interface ExposureReport {
    type: "email" | "phone" | "password";
    value: string; // the exposed email/phone
    breaches: Breach[];
    totalBreaches: number;
    severity: "low" | "medium" | "high" | "critical";
    firstSeen?: Date;
    lastSeen?: Date;
}

export interface Breach {
    name: string; // e.g., "LinkedIn", "Adobe"
    title: string;
    domain?: string;
    breachDate: string; // ISO date
    addedDate?: string;
    modifiedDate?: string;
    pwnCount?: number; // number of accounts affected
    description?: string;
    dataClasses: string[]; // ["Emails", "Passwords", "Phone numbers"]
    isVerified: boolean;
    isFabricated: boolean;
    isSensitive: boolean;
    isRetired: boolean;
    isSpamList: boolean;
    logoPath?: string;
}

export interface ThreatDetection {
    id: string;
    contactId?: string;
    contactName: string;
    threatType: "scam" | "phishing" | "spam" | "romance_scam" | "crypto_scam" | "fake_profile";
    severity: "low" | "medium" | "high" | "critical";
    confidence: number; // 0-1
    indicators: string[]; // detected patterns
    message?: string; // the suspicious message
    detectedAt: Date;
    recommendation: string;
}

export interface CleanupRecommendation {
    id: string;
    category: "privacy" | "security" | "exposure" | "contact";
    title: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
    platform?: string; // "Telegram", "WhatsApp", etc.
    actionable: boolean;
    estimatedTime?: string; // "2 min", "5 min"
    steps?: string[];
    completed: boolean;
}

export interface ScanRequest {
    email?: string;
    phone?: string;
    telegramContacts?: TelegramContact[];
    whatsappContacts?: WhatsAppContact[];
    smsMessages?: SMSMessage[];
    checkDarkWeb?: boolean;
}

// WhatsApp types
export interface WhatsAppContact {
    id?: string;
    name?: string;
    phone?: string;
    lastMessage?: string;
    isBusinessAccount?: boolean;
    isVerified?: boolean;
    profilePicture?: boolean;
    messageCount?: number;
}

// SMS types
export interface SMSMessage {
    id?: string;
    sender: string;
    message: string;
    timestamp?: Date;
    hasLinks?: boolean;
}

// Dark Web types
export interface DarkWebResult {
    source: string;
    type: "forum" | "marketplace" | "paste" | "breach";
    dataFound: string[];
    severity: "low" | "medium" | "high" | "critical";
    firstSeen?: Date;
    url?: string;
}

export interface ScanResponse {
    shadowScore: ShadowScore;
    exposures: ExposureReport[];
    threats: ThreatDetection[];
    recommendations: CleanupRecommendation[];
    darkWebResults?: DarkWebResult[];
    scanId: string;
    timestamp: Date;
}

export interface TelegramScanRequest {
    contacts: TelegramContact[];
}

export interface TelegramScanResponse {
    threats: ThreatDetection[];
    safeCount: number;
    suspiciousCount: number;
    criticalCount: number;
}

export interface ExposureScanRequest {
    email?: string;
    phone?: string;
}

export interface ExposureScanResponse {
    exposures: ExposureReport[];
    totalBreaches: number;
    severity: "low" | "medium" | "high" | "critical";
}

// AI Classifier Types
export interface ClassificationRequest {
    message: string;
    context?: {
        senderName?: string;
        accountAge?: number;
        previousMessages?: string[];
    };
}

export interface ClassificationResponse {
    classification: "legitimate" | "spam" | "phishing" | "romance_scam" | "crypto_scam" | "fake_profile";
    confidence: number; // 0-1
    indicators: string[];
    reasoning: string;
}

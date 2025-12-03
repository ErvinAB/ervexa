// Waitlist types

export interface WaitlistEntry {
    id: string;
    email: string;
    timestamp: Date;
    position: number;
    source: "homepage" | "shadow-cleaner" | "post-scan";
    referralCode?: string;
}

export interface WaitlistSubmission {
    email: string;
    source: WaitlistEntry["source"];
    referralCode?: string;
}

export interface WaitlistResponse {
    success: boolean;
    position: number;
    totalWaitlist: number;
    message: string;
    referralCode: string;
}

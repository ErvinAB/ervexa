// WhatsApp-specific scam patterns
export const WHATSAPP_PATTERNS = {
    BUSINESS_SCAM: [
        /\b(official|verified|customer service|support team)\b/i,
        /\b(account suspended|verify now|update payment)\b/i,
        /\b(claim your prize|you've won|congratulations)\b/i,
    ],

    FAKE_DELIVERY: [
        /\b(package|delivery|shipment|parcel)\b/i,
        /\b(failed delivery|rescheduled|customs fee)\b/i,
        /\b(track your order|confirm address)\b/i,
    ],

    IMPERSONATION: [
        /\b(whatsapp|meta|facebook)\b/i,
        /\b(security code|verification code|otp)\b/i,
        /\b(account will be deleted|suspended)\b/i,
    ],
};

// SMS-specific scam patterns
export const SMS_PATTERNS = {
    BANK_SCAM: [
        /\b(bank|card|account)\b/i,
        /\b(suspended|locked|blocked|frozen)\b/i,
        /\b(verify|confirm|update)\b/i,
        /\b(click|tap|visit)\b/i,
    ],

    DELIVERY_SCAM: [
        /\b(usps|fedex|ups|dhl|amazon)\b/i,
        /\b(delivery|package|shipment)\b/i,
        /\b(failed|attempted|rescheduled)\b/i,
        /\b(click here|track|confirm)\b/i,
    ],

    TAX_SCAM: [
        /\b(irs|tax|refund|revenue)\b/i,
        /\b(claim|owed|entitled)\b/i,
        /\b(urgent|immediate|expires)\b/i,
    ],

    PRIZE_SCAM: [
        /\b(winner|won|prize|reward|gift)\b/i,
        /\b(claim|collect|redeem)\b/i,
        /\b(congratulations|selected|chosen)\b/i,
    ],
};

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

export interface SMSMessage {
    id?: string;
    sender: string;
    message: string;
    timestamp?: Date;
    hasLinks?: boolean;
}

export interface DarkWebResult {
    source: string;
    type: "forum" | "marketplace" | "paste" | "breach";
    dataFound: string[];
    severity: "low" | "medium" | "high" | "critical";
    firstSeen?: Date;
    url?: string;
}

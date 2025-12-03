// Shadow Cleaner Constants and Configuration

// Scam Pattern Detection Rules
export const SCAM_PATTERNS = {
    // Romance scam indicators
    ROMANCE: [
        /\b(love|dear|honey|sweetheart|darling)\b/i,
        /\b(lonely|alone|single)\b/i,
        /\b(marry|marriage|relationship)\b/i,
        /\b(trust me|believe me)\b/i,
    ],

    // Crypto scam indicators
    CRYPTO: [
        /\b(bitcoin|btc|ethereum|eth|crypto|nft|trading)\b/i,
        /\b(investment|profit|earn|passive income)\b/i,
        /\b(guaranteed|risk-free|100%)\b/i,
        /\b(wallet|exchange|binance|coinbase)\b/i,
    ],

    // Phishing indicators
    PHISHING: [
        /\b(verify|confirm|update|suspended|locked)\b/i,
        /\b(account|password|security|urgent)\b/i,
        /\b(click here|link|download)\b/i,
        /\b(expire|limited time|act now)\b/i,
    ],

    // Generic scam keywords
    GENERIC_SCAM: [
        /\b(money|cash|payment|transfer|send)\b/i,
        /\b(prize|winner|won|lottery|gift)\b/i,
        /\b(urgent|immediately|asap|hurry)\b/i,
        /\b(congratulations|selected|chosen)\b/i,
    ],

    // Suspicious questions
    SUSPICIOUS_QUESTIONS: [
        /are you from/i,
        /do you live in/i,
        /what do you do/i,
        /are you single/i,
        /how old are you/i,
    ],
};

// Suspicious Contact Indicators
export const SUSPICIOUS_INDICATORS = {
    NEW_ACCOUNT_THRESHOLD: 30, // days
    HIGH_MESSAGE_FREQUENCY: 10, // messages per day
    FOREIGN_AREA_CODES: [
        "+234", // Nigeria
        "+233", // Ghana
        "+254", // Kenya
        "+91", // India (common for scams)
        "+62", // Indonesia
        "+60", // Malaysia
    ],
    GENERIC_USERNAMES: [
        /^user\d+$/i,
        /^[a-z]+\d{4,}$/i, // e.g., "john12345"
        /^(admin|support|service|help)/i,
    ],
};

// Shadow Score Weights
export const SCORE_WEIGHTS = {
    EMAIL_BREACH: 15,
    PHONE_LEAK: 20,
    SUSPICIOUS_CONTACT: 10,
    SCAM_MESSAGE: 25,
    PRIVACY_GAP: 5,
    MAX_PENALTY_PER_CATEGORY: 40, // cap to prevent over-penalization
};

// Threat Level Thresholds
export const THREAT_LEVELS = {
    SAFE: { min: 80, max: 100, color: "emerald" },
    CAUTION: { min: 60, max: 79, color: "yellow" },
    WARNING: { min: 40, max: 59, color: "orange" },
    CRITICAL: { min: 0, max: 39, color: "red" },
};

// Privacy Hardening Checklist
export const PRIVACY_CHECKLIST = {
    TELEGRAM: [
        {
            id: "tg-1",
            title: "Hide Phone Number",
            description: "Prevent strangers from finding you via phone number",
            steps: [
                "Go to Settings → Privacy and Security",
                "Tap 'Phone Number'",
                "Select 'Nobody'",
            ],
            estimatedTime: "1 min",
        },
        {
            id: "tg-2",
            title: "Disable Last Seen",
            description: "Hide your online status from unknown contacts",
            steps: [
                "Go to Settings → Privacy and Security",
                "Tap 'Last Seen & Online'",
                "Select 'My Contacts'",
            ],
            estimatedTime: "1 min",
        },
        {
            id: "tg-3",
            title: "Restrict Profile Photo",
            description: "Only show profile photo to contacts",
            steps: [
                "Go to Settings → Privacy and Security",
                "Tap 'Profile Photo'",
                "Select 'My Contacts'",
            ],
            estimatedTime: "1 min",
        },
        {
            id: "tg-4",
            title: "Enable Two-Step Verification",
            description: "Add extra security to your account",
            steps: [
                "Go to Settings → Privacy and Security",
                "Tap 'Two-Step Verification'",
                "Set a password",
            ],
            estimatedTime: "3 min",
        },
    ],

    WHATSAPP: [
        {
            id: "wa-1",
            title: "Hide Last Seen",
            description: "Prevent strangers from seeing when you're online",
            steps: [
                "Go to Settings → Privacy",
                "Tap 'Last Seen'",
                "Select 'My Contacts'",
            ],
            estimatedTime: "1 min",
        },
        {
            id: "wa-2",
            title: "Disable Read Receipts",
            description: "Don't let others know when you've read their messages",
            steps: [
                "Go to Settings → Privacy",
                "Toggle off 'Read Receipts'",
            ],
            estimatedTime: "30 sec",
        },
        {
            id: "wa-3",
            title: "Enable Two-Step Verification",
            description: "Add a PIN to your account",
            steps: [
                "Go to Settings → Account → Two-step verification",
                "Tap 'Turn On'",
                "Enter a 6-digit PIN",
            ],
            estimatedTime: "2 min",
        },
    ],

    GENERAL: [
        {
            id: "gen-1",
            title: "Use Strong Passwords",
            description: "Create unique passwords for each account",
            steps: [
                "Use a password manager (1Password, Bitwarden)",
                "Generate 16+ character passwords",
                "Enable auto-fill for convenience",
            ],
            estimatedTime: "5 min",
        },
        {
            id: "gen-2",
            title: "Enable MFA Everywhere",
            description: "Add multi-factor authentication to all accounts",
            steps: [
                "Use an authenticator app (Authy, Google Authenticator)",
                "Enable MFA on email, banking, social media",
                "Save backup codes securely",
            ],
            estimatedTime: "10 min",
        },
        {
            id: "gen-3",
            title: "Review App Permissions",
            description: "Remove unnecessary access to your data",
            steps: [
                "Check connected apps on Google/Facebook/Apple",
                "Revoke access for unused apps",
                "Review location/camera/microphone permissions",
            ],
            estimatedTime: "5 min",
        },
    ],
};

// HaveIBeenPwned API Configuration
export const HIBP_CONFIG = {
    BASE_URL: "https://haveibeenpwned.com/api/v3",
    RATE_LIMIT_MS: 1500, // 1 request per 1.5 seconds (free tier)
    USER_AGENT: "Stagbyte-Shadow-Cleaner",
};

// Severity Calculation
export const SEVERITY_THRESHOLDS = {
    LOW: { breaches: 1, score: 90 },
    MEDIUM: { breaches: 3, score: 70 },
    HIGH: { breaches: 5, score: 50 },
    CRITICAL: { breaches: 10, score: 30 },
};

// Cleanup Recommendation Templates
export const RECOMMENDATION_TEMPLATES = {
    EMAIL_BREACH: {
        title: "Change Password for Breached Account",
        description: "Your email was found in {count} data breach(es). Update your password immediately.",
        priority: "high" as const,
        category: "security" as const,
    },
    PHONE_LEAK: {
        title: "Phone Number Exposed",
        description: "Your phone number was found in {count} leak(s). Consider changing it or enabling call filtering.",
        priority: "medium" as const,
        category: "exposure" as const,
    },
    SUSPICIOUS_CONTACT: {
        title: "Block Suspicious Contact",
        description: "Contact '{name}' shows scam indicators. Consider blocking and reporting.",
        priority: "high" as const,
        category: "contact" as const,
    },
    PRIVACY_GAP: {
        title: "Tighten Privacy Settings",
        description: "Your {platform} privacy settings are not optimized. Follow our guide to secure your account.",
        priority: "medium" as const,
        category: "privacy" as const,
    },
};

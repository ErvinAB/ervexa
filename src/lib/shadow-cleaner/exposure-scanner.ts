import type { ExposureReport, Breach } from "./types";
import { calculateSeverity } from "./shadow-score";

/**
 * Check if an email has been involved in data breaches using Breach Directory via RapidAPI
 * Sign up at: https://rapidapi.com/rohan-patra/api/breachdirectory
 */
export async function checkEmailBreaches(email: string): Promise<ExposureReport | null> {
    try {
        const apiKey = process.env.RAPIDAPI_KEY;

        if (!apiKey) {
            console.warn("RAPIDAPI_KEY not set - skipping breach check");
            return {
                type: "email",
                value: email,
                breaches: [],
                totalBreaches: 0,
                severity: "low",
            };
        }

        // Breach Directory via RapidAPI
        const response = await fetch(
            `https://breachdirectory.p.rapidapi.com/?func=auto&term=${encodeURIComponent(email)}`,
            {
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Breach Directory API error: ${response.status}`);
        }

        const data = await response.json();

        // Check if breaches were found
        if (!data.found || !data.result || data.result.length === 0) {
            return {
                type: "email",
                value: email,
                breaches: [],
                totalBreaches: 0,
                severity: "low",
            };
        }

        // Convert Breach Directory format to our format
        const breaches: Breach[] = data.result.map((breach: Record<string, unknown>) => ({
            name: breach.source || "Unknown Breach",
            title: breach.source || "Data Breach",
            domain: "",
            breachDate: breach.date || new Date().toISOString(),
            addedDate: breach.date,
            modifiedDate: breach.date,
            pwnCount: 0,
            description: `Data exposed: ${(breach.has as string[])?.join(", ") || "Unknown"}`,
            dataClasses: (breach.has as string[]) || ["Email addresses"],
            isVerified: true,
            isFabricated: false,
            isSensitive: true,
            isRetired: false,
            isSpamList: false,
            logoPath: "",
        }));

        // Calculate severity based on breach count
        const severity = calculateSeverity(breaches.length, 100 - breaches.length * 15);

        // Find earliest and latest breach dates
        const dates = breaches
            .map((b) => new Date(b.breachDate))
            .sort((a, b) => a.getTime() - b.getTime());

        return {
            type: "email",
            value: email,
            breaches,
            totalBreaches: breaches.length,
            severity,
            firstSeen: dates[0],
            lastSeen: dates[dates.length - 1],
        };
    } catch (error) {
        console.error("Error checking email breaches:", error);
        // Return null on error to allow graceful degradation
        return null;
    }
}

/**
 * Check if a phone number has been exposed using Breach Directory
 */
export async function checkPhoneLeaks(phone: string): Promise<ExposureReport | null> {
    try {
        const apiKey = process.env.RAPIDAPI_KEY;

        if (!apiKey) {
            console.warn("RAPIDAPI_KEY not set - skipping phone check");
            return {
                type: "phone",
                value: phone,
                breaches: [],
                totalBreaches: 0,
                severity: "low",
            };
        }

        // Normalize phone number (remove spaces, dashes, etc.)
        const normalizedPhone = phone.replace(/[\s\-\(\)]/g, "");

        // Breach Directory also supports phone lookups
        const response = await fetch(
            `https://breachdirectory.p.rapidapi.com/?func=auto&term=${encodeURIComponent(normalizedPhone)}`,
            {
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com",
                },
            }
        );

        if (!response.ok) {
            console.log(`Phone leak check for ${normalizedPhone} - API error`);
            return {
                type: "phone",
                value: normalizedPhone,
                breaches: [],
                totalBreaches: 0,
                severity: "low",
            };
        }

        const data = await response.json();

        if (!data.found || !data.result || data.result.length === 0) {
            return {
                type: "phone",
                value: normalizedPhone,
                breaches: [],
                totalBreaches: 0,
                severity: "low",
            };
        }

        // Convert breaches
        const breaches: Breach[] = data.result.map((breach: Record<string, unknown>) => ({
            name: breach.source || "Unknown Breach",
            title: breach.source || "Data Breach",
            domain: "",
            breachDate: breach.date || new Date().toISOString(),
            dataClasses: breach.has || ["Phone numbers"],
            isVerified: true,
            isFabricated: false,
            isSensitive: true,
            isRetired: false,
            isSpamList: false,
        }));

        const severity = calculateSeverity(breaches.length, 100 - breaches.length * 20);

        return {
            type: "phone",
            value: normalizedPhone,
            breaches,
            totalBreaches: breaches.length,
            severity,
        };
    } catch (error) {
        console.error("Error checking phone leaks:", error);
        return {
            type: "phone",
            value: phone,
            breaches: [],
            totalBreaches: 0,
            severity: "low",
        };
    }
}

/**
 * Check multiple emails for breaches
 */
export async function checkMultipleEmails(emails: string[]): Promise<ExposureReport[]> {
    const results: ExposureReport[] = [];

    for (const email of emails) {
        const result = await checkEmailBreaches(email);
        if (result) {
            results.push(result);
        }

        // Small delay between requests
        if (emails.indexOf(email) < emails.length - 1) {
            await sleep(500);
        }
    }

    return results;
}

/**
 * Check if a password has been exposed in breaches (using k-anonymity)
 * This uses the Pwned Passwords API which is safe and doesn't send the full password
 */
export async function checkPasswordExposure(password: string): Promise<{
    isExposed: boolean;
    exposureCount: number;
}> {
    try {
        // Hash the password using SHA-1
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-1", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        const hash = hashHex.toUpperCase();

        // Use k-anonymity: send only first 5 characters
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: {
                "User-Agent": "ShadowCleaner/1.0",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to check password");
        }

        const text = await response.text();
        const lines = text.split("\n");

        // Check if our hash suffix appears in the results
        for (const line of lines) {
            const [hashSuffix, count] = line.split(":");
            if (hashSuffix === suffix) {
                return {
                    isExposed: true,
                    exposureCount: parseInt(count, 10),
                };
            }
        }

        return {
            isExposed: false,
            exposureCount: 0,
        };
    } catch (error) {
        console.error("Error checking password exposure:", error);
        return {
            isExposed: false,
            exposureCount: 0,
        };
    }
}

/**
 * Utility function to sleep/delay
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get summary of all exposures
 */
export function summarizeExposures(exposures: ExposureReport[]): {
    totalBreaches: number;
    affectedEmails: number;
    affectedPhones: number;
    overallSeverity: "low" | "medium" | "high" | "critical";
    mostSevereExposure: ExposureReport | null;
} {
    const totalBreaches = exposures.reduce((sum, e) => sum + e.totalBreaches, 0);
    const affectedEmails = exposures.filter((e) => e.type === "email" && e.totalBreaches > 0).length;
    const affectedPhones = exposures.filter((e) => e.type === "phone" && e.totalBreaches > 0).length;

    // Determine overall severity
    const severityLevels = { low: 0, medium: 1, high: 2, critical: 3 };
    const maxSeverity = exposures.reduce((max, e) => {
        return severityLevels[e.severity] > severityLevels[max] ? e.severity : max;
    }, "low" as ExposureReport["severity"]);

    // Find most severe exposure
    const mostSevere = exposures.reduce((worst, current) => {
        if (!worst) return current;
        return severityLevels[current.severity] > severityLevels[worst.severity] ? current : worst;
    }, null as ExposureReport | null);

    return {
        totalBreaches,
        affectedEmails,
        affectedPhones,
        overallSeverity: maxSeverity,
        mostSevereExposure: mostSevere,
    };
}

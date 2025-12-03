// Scan history utilities

import type { ScanHistoryEntry, ScanComparison } from "./history-types";
import type { ScanResponse } from "./types";

const HISTORY_KEY = "shadow-cleaner-history";
const MAX_HISTORY = 10;

/**
 * Save scan to history
 */
export function saveScanToHistory(scan: ScanResponse): ScanHistoryEntry {
    const entry: ScanHistoryEntry = {
        ...scan,
        id: `scan-${Date.now()}`,
        savedAt: new Date(),
    };

    const history = getScanHistory();
    history.unshift(entry);

    // Keep only last MAX_HISTORY scans
    const trimmed = history.slice(0, MAX_HISTORY);

    if (typeof window !== "undefined") {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    }

    return entry;
}

/**
 * Get all scan history
 */
export function getScanHistory(): ScanHistoryEntry[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return parsed.map((entry: Record<string, unknown>) => ({
            ...entry,
            savedAt: new Date(entry.savedAt as string),
            timestamp: new Date(entry.timestamp as string),
            shadowScore: {
                ...(entry.shadowScore as Record<string, unknown>),
                lastUpdated: new Date((entry.shadowScore as Record<string, unknown>).lastUpdated as string),
            },
        }));
    } catch {
        return [];
    }
}

/**
 * Get latest scan
 */
export function getLatestScan(): ScanHistoryEntry | null {
    const history = getScanHistory();
    return history[0] || null;
}

/**
 * Compare current scan with previous
 */
export function compareScan(current: ScanHistoryEntry): ScanComparison {
    const history = getScanHistory();
    const previous = history.find((entry) => entry.id !== current.id) || null;

    if (!previous) {
        return {
            current,
            previous: null,
            scoreDelta: 0,
            newThreats: current.threats.length,
            resolvedThreats: 0,
            newExposures: current.exposures.length,
        };
    }

    const scoreDelta = current.shadowScore.score - previous.shadowScore.score;

    // Find new threats (not in previous scan)
    const newThreats = current.threats.filter(
        (t) => !previous.threats.some((pt) => pt.contactName === t.contactName)
    ).length;

    // Find resolved threats (in previous but not current)
    const resolvedThreats = previous.threats.filter(
        (pt) => !current.threats.some((t) => t.contactName === pt.contactName)
    ).length;

    // Find new exposures
    const newExposures = current.exposures.filter(
        (e) => !previous.exposures.some((pe) => pe.value === e.value)
    ).length;

    return {
        current,
        previous,
        scoreDelta,
        newThreats,
        resolvedThreats,
        newExposures,
    };
}

/**
 * Clear all history
 */
export function clearScanHistory(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(HISTORY_KEY);
    }
}

/**
 * Delete specific scan from history
 */
export function deleteScan(scanId: string): void {
    const history = getScanHistory();
    const filtered = history.filter((entry) => entry.id !== scanId);

    if (typeof window !== "undefined") {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    }
}

/**
 * Export scan as JSON
 */
export function exportScanAsJSON(scan: ScanHistoryEntry): void {
    const dataStr = JSON.stringify(scan, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `shadow-cleaner-scan-${scan.id}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

/**
 * Export scan as text report
 */
export function exportScanAsText(scan: ScanHistoryEntry): string {
    const lines = [
        "SHADOW CLEANER SCAN REPORT",
        "=".repeat(50),
        "",
        `Scan ID: ${scan.scanId}`,
        `Date: ${new Date(scan.timestamp).toLocaleString()}`,
        "",
        "SHADOW SCORE",
        "-".repeat(50),
        `Score: ${scan.shadowScore.score}/100`,
        `Threat Level: ${scan.shadowScore.threatLevel.toUpperCase()}`,
        "",
        "BREAKDOWN:",
        `  Email Breaches: ${scan.shadowScore.breakdown.emailBreaches}`,
        `  Phone Leaks: ${scan.shadowScore.breakdown.phoneLeaks}`,
        `  Suspicious Contacts: ${scan.shadowScore.breakdown.suspiciousContacts}`,
        `  Scam Messages: ${scan.shadowScore.breakdown.scamMessages}`,
        `  Privacy Gaps: ${scan.shadowScore.breakdown.privacyGaps}`,
        "",
        "DETECTED THREATS",
        "-".repeat(50),
    ];

    if (scan.threats.length === 0) {
        lines.push("No threats detected.");
    } else {
        scan.threats.forEach((threat, idx) => {
            lines.push(`${idx + 1}. ${threat.contactName} (${threat.threatType})`);
            lines.push(`   Severity: ${threat.severity}`);
            lines.push(`   Confidence: ${Math.round(threat.confidence * 100)}%`);
            lines.push(`   Recommendation: ${threat.recommendation}`);
            lines.push("");
        });
    }

    lines.push("");
    lines.push("EXPOSURES");
    lines.push("-".repeat(50));

    if (scan.exposures.length === 0) {
        lines.push("No exposures found.");
    } else {
        scan.exposures.forEach((exposure) => {
            lines.push(`${exposure.value} (${exposure.type})`);
            lines.push(`  Total Breaches: ${exposure.totalBreaches}`);
            lines.push(`  Severity: ${exposure.severity}`);
            lines.push("");
        });
    }

    return lines.join("\n");
}

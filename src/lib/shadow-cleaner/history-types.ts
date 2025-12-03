// Scan history types

import type { ScanResponse } from "./types";

export interface ScanHistoryEntry extends ScanResponse {
    id: string;
    savedAt: Date;
}

export interface ScanComparison {
    current: ScanHistoryEntry;
    previous: ScanHistoryEntry | null;
    scoreDelta: number;
    newThreats: number;
    resolvedThreats: number;
    newExposures: number;
}

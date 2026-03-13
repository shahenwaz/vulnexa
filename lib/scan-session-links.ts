import { getRecentScans, getScanResultById } from "@/lib/mock-data";
import type { ScanHistoryItem, ScanSessionPreset } from "@/lib/types";

type ScanSessionLinks = {
  scanId: string;
  projectName: string;
  scanHref: string;
  reportHref: string;
};

const presetFallbackScanIdMap: Record<string, string> = {
  session_draft: "scan_001",
  session_queued: "scan_002",
  session_running: "scan_003",
  session_completed: "scan_001",
};

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function getMatchByProjectName(projectName: string): ScanHistoryItem | null {
  const normalizedProjectName = normalizeValue(projectName);
  const scans = getRecentScans();

  return (
    scans.find(
      (scan) => normalizeValue(scan.projectName) === normalizedProjectName,
    ) ?? null
  );
}

export function getSessionLinks(preset: ScanSessionPreset): ScanSessionLinks {
  const matchedHistoryItem = getMatchByProjectName(preset.projectName);

  if (matchedHistoryItem && getScanResultById(matchedHistoryItem.scanId)) {
    return {
      scanId: matchedHistoryItem.scanId,
      projectName: matchedHistoryItem.projectName,
      scanHref: `/scans/${matchedHistoryItem.scanId}`,
      reportHref: `/reports/${matchedHistoryItem.scanId}`,
    };
  }

  const fallbackScanId = presetFallbackScanIdMap[preset.id] ?? "scan_001";
  const fallbackResult = getScanResultById(fallbackScanId);

  return {
    scanId: fallbackScanId,
    projectName: fallbackResult?.projectName ?? preset.projectName,
    scanHref: `/scans/${fallbackScanId}`,
    reportHref: `/reports/${fallbackScanId}`,
  };
}

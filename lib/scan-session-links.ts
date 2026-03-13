import type { ScanSessionPreset } from "@/lib/types";

type ScanSessionLinks = {
  scanId: string;
  scanHref: string;
  reportHref: string;
};

const presetToScanIdMap: Record<string, string> = {
  session_draft: "scan_001",
  session_queued: "scan_002",
  session_running: "scan_003",
  session_completed: "scan_001",
};

export function getSessionLinks(preset: ScanSessionPreset): ScanSessionLinks {
  const scanId = presetToScanIdMap[preset.id] ?? "scan_001";

  return {
    scanId,
    scanHref: `/scans/${scanId}`,
    reportHref: `/reports/${scanId}`,
  };
}

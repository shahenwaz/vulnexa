import type { BackendScanListItem } from "@/lib/api/backend-types";
import { getBackendScanDisplayName } from "@/lib/api/backend-mappers";

export function getScanRunDisplayNames(scans: BackendScanListItem[]) {
  const groupedScans = new Map<string, BackendScanListItem[]>();

  for (const scan of scans) {
    const groupKey =
      scan.project_key ||
      scan.repo_url ||
      scan.uploaded_file_name ||
      scan.target;

    const existing = groupedScans.get(groupKey) ?? [];
    existing.push(scan);
    groupedScans.set(groupKey, existing);
  }

  const scanNameMap = new Map<string, string>();

  for (const [, group] of groupedScans) {
    const ordered = [...group].sort((a, b) => {
      const aTime = a.scanned_at ?? "";
      const bTime = b.scanned_at ?? "";
      return aTime.localeCompare(bTime);
    });

    ordered.forEach((scan, index) => {
      const baseName = getBackendScanDisplayName(scan);
      const displayName =
        index === 0 ? baseName : `${baseName} · Run ${index + 1}`;

      scanNameMap.set(scan.scan_id, displayName);
    });
  }

  return scanNameMap;
}

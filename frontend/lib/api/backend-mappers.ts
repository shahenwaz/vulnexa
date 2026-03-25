import type {
  BackendFinding,
  BackendScanListItem,
  BackendScanResult,
} from "@/lib/api/backend-types";
import type { ScanFinding, ScanResult, Severity } from "@/lib/types";
import type { ScanStatus } from "@/components/scan/scan-status-badge";

function mapBackendSeverityToUiSeverity(
  severity: BackendFinding["severity"],
): Severity {
  return severity;
}

function mapBackendFindingToUiFinding(finding: BackendFinding): ScanFinding {
  return {
    id: finding.id,
    title: finding.title,
    severity: mapBackendSeverityToUiSeverity(finding.severity),
    status: "open",
    description: finding.description,
    filePath: finding.file,
    line: finding.line,
    cwe: finding.cwe_id,
    remediation: `Review ${finding.cwe_name} guidance and refactor the affected code pattern.`,
    codeSnippet: finding.matched_text,
    confidence: "medium",
  };
}

function stripZipExtension(fileName: string): string {
  return fileName.replace(/\.zip$/i, "");
}

function getLastPathSegment(path: string): string {
  return path.split(/[\\/]/).filter(Boolean).pop() ?? path;
}

function getRepoNameFromUrl(repoUrl: string): string {
  const cleaned = repoUrl.replace(/\/$/, "");
  return cleaned.split("/").pop() ?? repoUrl;
}

export function getBackendScanDisplayName(
  scan: Pick<
    BackendScanResult | BackendScanListItem,
    "repo_url" | "uploaded_file_name" | "target"
  >,
): string {
  if (scan.repo_url) {
    return getRepoNameFromUrl(scan.repo_url);
  }

  if (scan.uploaded_file_name) {
    return stripZipExtension(scan.uploaded_file_name);
  }

  return getLastPathSegment(scan.target);
}

export function getHighestSeverityFromSummary(
  summary: BackendScanResult["summary"] | BackendScanListItem["summary"],
): Severity {
  if (summary.critical > 0) return "critical";
  if (summary.high > 0) return "high";
  if (summary.medium > 0) return "medium";
  return "low";
}

export function mapBackendStatusToUiStatus(status: string): ScanStatus {
  switch (status) {
    case "queued":
      return "queued";
    case "running":
      return "running";
    case "completed":
      return "completed";
    default:
      return "completed";
  }
}

export function mapBackendScanResultToUiScanResult(
  scan: BackendScanResult,
): ScanResult {
  const findings = scan.findings.map(mapBackendFindingToUiFinding);

  return {
    scanId: scan.scan_id,
    projectName: getBackendScanDisplayName(scan),
    scannedAt: new Date().toISOString(),
    totalFiles: scan.scanned_files,
    totalFindings: scan.summary.total_findings,
    severityCounts: {
      critical: scan.summary.critical,
      high: scan.summary.high,
      medium: scan.summary.medium,
      low: scan.summary.low,
      info: 0,
    },
    findings,
  };
}

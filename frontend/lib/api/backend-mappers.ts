import type {
  BackendFinding,
  BackendScanResult,
} from "@/lib/api/backend-types";
import type { ScanFinding, ScanResult, Severity } from "@/lib/types";

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

function getScanDisplayName(scan: BackendScanResult): string {
  if (scan.repo_url) {
    return getRepoNameFromUrl(scan.repo_url);
  }

  if (scan.uploaded_file_name) {
    return stripZipExtension(scan.uploaded_file_name);
  }

  return getLastPathSegment(scan.target);
}

export function mapBackendScanResultToUiScanResult(
  scan: BackendScanResult,
): ScanResult {
  const findings = scan.findings.map(mapBackendFindingToUiFinding);

  return {
    scanId: scan.scan_id,
    projectName: getScanDisplayName(scan),
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

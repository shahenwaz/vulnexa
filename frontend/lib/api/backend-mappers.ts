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

export function mapBackendScanResultToUiScanResult(
  scan: BackendScanResult,
): ScanResult {
  const findings = scan.findings.map(mapBackendFindingToUiFinding);

  return {
    scanId: scan.scan_id,
    projectName: scan.repo_url ?? scan.uploaded_file_name ?? scan.target,
    scannedAt: new Date().toISOString(),
    totalFiles: 0,
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

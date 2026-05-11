import type { ScanStatus } from "@/components/scan/scan-status-badge";
import type {
  BackendFinding,
  BackendScanListItem,
  BackendScanResult,
} from "@/lib/api/backend-types";
import type {
  BusinessReport,
  ScanFinding,
  ScanResult,
  Severity,
  ScanRunStatus,
} from "@/lib/types";

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

export function mapBackendStatusToUiRunStatus(status: string): ScanRunStatus {
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

export function getBackendSourceLabel(
  scan: Pick<
    BackendScanResult | BackendScanListItem,
    "source_type" | "repo_url" | "uploaded_file_name"
  >,
): string {
  switch (scan.source_type) {
    case "repo_url":
      return "GitHub repository";
    case "zip_upload":
      return "ZIP upload";
    case "local_directory":
      return "Local directory";
    default:
      if (scan.repo_url) return "GitHub repository";
      if (scan.uploaded_file_name) return "ZIP upload";
      return "Local directory";
  }
}

function mapBackendBusinessReportToUiReport(
  report: BackendScanResult["business_report"],
): BusinessReport | undefined {
  if (!report) return undefined;

  return {
    profile: report.profile,
    profileLabel: report.profile_label,
    riskLevel: report.risk_level,
    executiveSummary: report.executive_summary,
    businessImpact: report.business_impact,
    customerImpact: report.customer_impact,
    priorityRecommendation: report.priority_recommendation,
  };
}

export function mapBackendScanResultToUiScanResult(
  scan: BackendScanResult,
): ScanResult {
  const findings = scan.findings.map(mapBackendFindingToUiFinding);

  return {
    scanId: scan.scan_id,
    projectName: getBackendScanDisplayName(scan),
    scannedAt: scan.scanned_at ?? new Date().toISOString(),
    totalFiles: scan.scanned_files,
    totalFindings: scan.summary.total_findings,
    severityCounts: {
      critical: scan.summary.critical,
      high: scan.summary.high,
      medium: scan.summary.medium,
      low: scan.summary.low,
    },
    findings,
    status: mapBackendStatusToUiRunStatus(scan.status),
    projectKey: scan.project_key,
    sourceType: scan.source_type,
    target: scan.target,
    savedTo: scan.saved_to,
    repoUrl: scan.repo_url,
    uploadedFileName: scan.uploaded_file_name,
    businessProfile: scan.business_profile,
    businessReport: mapBackendBusinessReportToUiReport(scan.business_report),
  };
}

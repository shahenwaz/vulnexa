import type { ScanFinding, ScanResult, Severity } from "@/lib/types";

const severityOrder: Severity[] = ["critical", "high", "medium", "low"];

export function getSeverityOrder() {
  return severityOrder;
}

export function getHighestSeverity(result: ScanResult): Severity {
  return (
    severityOrder.find((severity) => result.severityCounts[severity] > 0) ??
    "low"
  );
}

export function groupFindingsBySeverity(findings: ScanFinding[]) {
  return severityOrder.map((severity) => ({
    severity,
    findings: findings.filter((finding) => finding.severity === severity),
  }));
}

export function getOpenFindingsCount(findings: ScanFinding[]) {
  return findings.filter((finding) => finding.status === "open").length;
}

export function getResolvedFindingsCount(findings: ScanFinding[]) {
  return findings.filter((finding) => finding.status === "resolved").length;
}

export function getReviewingFindingsCount(findings: ScanFinding[]) {
  return findings.filter((finding) => finding.status === "reviewing").length;
}

export function getTopRemediationActions(findings: ScanFinding[]) {
  const unique = new Map<
    string,
    { remediation: string; severity: Severity; count: number }
  >();

  for (const finding of findings) {
    const existing = unique.get(finding.remediation);

    if (existing) {
      existing.count += 1;
      continue;
    }

    unique.set(finding.remediation, {
      remediation: finding.remediation,
      severity: finding.severity,
      count: 1,
    });
  }

  return [...unique.values()].sort((a, b) => {
    const severityDiff =
      severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity);

    if (severityDiff !== 0) return severityDiff;

    return b.count - a.count;
  });
}

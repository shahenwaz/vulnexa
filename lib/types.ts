export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type FindingStatus = "open" | "reviewing" | "resolved";

export type ScanFinding = {
  id: string;
  ruleId?: string;
  title: string;
  severity: Severity;
  status: FindingStatus;
  description: string;
  impact?: string;
  filePath: string;
  line: number;
  cwe?: string;
  confidence?: "high" | "medium" | "low";
  remediation: string;
  codeSnippet?: string;
};

export type ScanResult = {
  scanId: string;
  projectName: string;
  scannedAt: string;
  totalFiles: number;
  totalFindings: number;
  severityCounts: Record<Severity, number>;
  findings: ScanFinding[];
};

export type ScanHistoryItem = {
  scanId: string;
  projectName: string;
  scannedAt: string;
  status: "completed" | "queued" | "draft";
  totalFiles: number;
  totalFindings: number;
  highestSeverity: Severity;
};

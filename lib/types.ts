export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type ScanFinding = {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  filePath: string;
  line: number;
  cwe?: string;
  remediation: string;
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

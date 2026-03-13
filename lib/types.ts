export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type FindingStatus = "open" | "reviewing" | "resolved";

export type ScanRunStatus = "draft" | "queued" | "running" | "completed";

export type ScanTargetType = "repository" | "upload" | "folder";

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
  status: ScanRunStatus;
  totalFiles: number;
  totalFindings: number;
  highestSeverity: Severity;
};

export type ScanSessionPreset = {
  id: string;
  label: string;
  description: string;
  status: ScanRunStatus;
  estimatedDuration: string;
  projectName: string;
  targetType: ScanTargetType;
  targetValue: string;
  notes?: string;
  includeSecrets: boolean;
  includeDependencies: boolean;
  includeConfiguration: boolean;
};

export type CreateScanRequest = {
  projectName: string;
  targetType: ScanTargetType;
  targetValue: string;
  notes?: string;
  options: {
    includeSecrets: boolean;
    includeDependencies: boolean;
    includeConfiguration: boolean;
  };
};

export type CreateScanResponse = {
  sessionId: string;
  scanId?: string;
  status: Exclude<ScanRunStatus, "draft">;
  projectName: string;
  createdAt: string;
  estimatedDuration?: string;
  message?: string;
};

export type ScanSessionStatusResponse = {
  sessionId: string;
  scanId?: string;
  projectName: string;
  status: Exclude<ScanRunStatus, "draft">;
  progressPercent?: number;
  currentStage?: string;
  message?: string;
  startedAt?: string;
  updatedAt: string;
  completedAt?: string;
};

export type ScanSessionResultResponse = {
  sessionId: string;
  scanId: string;
  status: "completed";
  result: ScanResult;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type BackendSeverity = "critical" | "high" | "medium" | "low";

export type BackendFinding = {
  id: string;
  title: string;
  severity: BackendSeverity;
  file: string;
  line: number;
  matched_text: string;
  cwe_id: string;
  cwe_name: string;
  description: string;
};

export type BackendScanSummary = {
  total_findings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export type BackendScanResult = {
  scan_id: string;
  target: string;
  status: string;
  scanned_at?: string;
  summary: BackendScanSummary;
  findings: BackendFinding[];
  scanned_files: number;
  saved_to?: string;
  source_type?: string;
  uploaded_file_name?: string;
  repo_url?: string;
};

export type BackendScanListItem = {
  scan_id: string;
  target: string;
  status: string;
  scanned_at?: string;
  summary: BackendScanSummary;
  scanned_files?: number;
  source_type?: string;
  uploaded_file_name?: string;
  repo_url?: string;
};

export type BackendScanListResponse = {
  scans: BackendScanListItem[];
};

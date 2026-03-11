import type { ScanResult } from "@/lib/types";

export const mockScanResult: ScanResult = {
  scanId: "scan_001",
  projectName: "demo-ecommerce-app",
  scannedAt: "2026-03-11T16:30:00Z",
  totalFiles: 42,
  totalFindings: 5,
  severityCounts: {
    critical: 1,
    high: 1,
    medium: 1,
    low: 1,
    info: 1,
  },
  findings: [
    {
      id: "finding_001",
      title: "Potential hardcoded secret detected",
      severity: "critical",
      description:
        "A likely API key or secret token appears to be stored directly in source code.",
      filePath: "src/config/auth.ts",
      line: 18,
      cwe: "CWE-798",
      remediation:
        "Move secrets to environment variables and rotate the exposed secret immediately.",
    },
    {
      id: "finding_002",
      title: "Unsanitized user input in query construction",
      severity: "high",
      description:
        "User input may be concatenated into a database query without safe parameterization.",
      filePath: "src/api/search.ts",
      line: 44,
      cwe: "CWE-89",
      remediation:
        "Use parameterized queries or ORM query bindings instead of string concatenation.",
    },
    {
      id: "finding_003",
      title: "Unescaped output rendered in template",
      severity: "medium",
      description:
        "Untrusted content may be rendered without proper output encoding.",
      filePath: "src/components/comment-view.tsx",
      line: 29,
      cwe: "CWE-79",
      remediation:
        "Sanitize or escape untrusted content before rendering it in the browser.",
    },
    {
      id: "finding_004",
      title: "Debug mode enabled in production config",
      severity: "low",
      description:
        "Debug-related settings appear active in a production-oriented configuration file.",
      filePath: "config/app.json",
      line: 7,
      cwe: "CWE-489",
      remediation:
        "Disable debug mode and remove verbose logging in production environments.",
    },
    {
      id: "finding_005",
      title: "Security headers not yet evaluated",
      severity: "info",
      description:
        "Header analysis is planned for a later backend-integrated scan phase.",
      filePath: "N/A",
      line: 0,
      remediation:
        "Add response header analysis when the backend scan engine is introduced.",
    },
  ],
};

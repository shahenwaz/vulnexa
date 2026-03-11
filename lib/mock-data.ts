import type { ScanHistoryItem, ScanResult } from "@/lib/types";

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
      ruleId: "secrets.hardcoded-api-key",
      title: "Potential hardcoded secret detected",
      severity: "critical",
      status: "open",
      description:
        "A likely API key or secret token appears to be stored directly in source code.",
      impact:
        "Exposed secrets may allow unauthorized access to protected services or internal systems.",
      filePath: "src/config/auth.ts",
      line: 18,
      cwe: "CWE-798",
      confidence: "high",
      remediation:
        "Move secrets to environment variables, rotate the exposed key immediately, and review commit history for accidental exposure.",
      codeSnippet: `export const API_KEY = "sk_live_demo_123456";`,
    },
    {
      id: "finding_002",
      ruleId: "injection.sql-string-concat",
      title: "Unsanitized user input in query construction",
      severity: "high",
      status: "open",
      description:
        "User input may be concatenated into a database query without safe parameterization.",
      impact:
        "Attackers may manipulate queries to read, alter, or delete sensitive data.",
      filePath: "src/api/search.ts",
      line: 44,
      cwe: "CWE-89",
      confidence: "high",
      remediation:
        "Use parameterized queries or ORM query bindings instead of string concatenation.",
      codeSnippet: `const query = "SELECT * FROM users WHERE email = '" + email + "'";`,
    },
    {
      id: "finding_003",
      ruleId: "xss.unescaped-render",
      title: "Unescaped output rendered in template",
      severity: "medium",
      status: "reviewing",
      description:
        "Untrusted content may be rendered without proper output encoding.",
      impact:
        "Malicious script content could execute in a user's browser if hostile input reaches the page.",
      filePath: "src/components/comment-view.tsx",
      line: 29,
      cwe: "CWE-79",
      confidence: "medium",
      remediation:
        "Sanitize or escape untrusted content before rendering it in the browser.",
      codeSnippet: `<div dangerouslySetInnerHTML={{ __html: comment.body }} />`,
    },
    {
      id: "finding_004",
      ruleId: "config.debug-enabled",
      title: "Debug mode enabled in production config",
      severity: "low",
      status: "reviewing",
      description:
        "Debug-related settings appear active in a production-oriented configuration file.",
      impact:
        "Verbose errors and debug output can reveal internal logic and implementation details.",
      filePath: "config/app.json",
      line: 7,
      cwe: "CWE-489",
      confidence: "medium",
      remediation:
        "Disable debug mode and remove verbose logging in production environments.",
      codeSnippet: `"debug": true`,
    },
    {
      id: "finding_005",
      ruleId: "headers.analysis-pending",
      title: "Security headers not yet evaluated",
      severity: "info",
      status: "resolved",
      description:
        "Header analysis is planned for a later backend-integrated scan phase.",
      impact:
        "This is currently informational and does not indicate a confirmed weakness yet.",
      filePath: "N/A",
      line: 0,
      confidence: "low",
      remediation:
        "Add response header analysis when the backend scan engine is introduced.",
      codeSnippet: `// Header analysis pending in frontend-only prototype`,
    },
  ],
};

export const mockScanHistory: ScanHistoryItem[] = [
  {
    scanId: "scan_001",
    projectName: "demo-ecommerce-app",
    scannedAt: "2026-03-11T16:30:00Z",
    status: "completed",
    totalFiles: 42,
    totalFindings: 5,
    highestSeverity: "critical",
  },
  {
    scanId: "scan_002",
    projectName: "student-portal-ui",
    scannedAt: "2026-03-10T12:10:00Z",
    status: "completed",
    totalFiles: 28,
    totalFindings: 3,
    highestSeverity: "high",
  },
  {
    scanId: "scan_003",
    projectName: "internal-admin-dashboard",
    scannedAt: "2026-03-09T18:45:00Z",
    status: "queued",
    totalFiles: 65,
    totalFindings: 0,
    highestSeverity: "info",
  },
];

import type { ScanHistoryItem, ScanResult } from "@/lib/types";

export const mockScanResults: ScanResult[] = [
  {
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
  },
  {
    scanId: "scan_002",
    projectName: "student-portal-ui",
    scannedAt: "2026-03-10T12:10:00Z",
    totalFiles: 28,
    totalFindings: 3,
    severityCounts: {
      critical: 0,
      high: 1,
      medium: 1,
      low: 1,
      info: 0,
    },
    findings: [
      {
        id: "finding_006",
        ruleId: "auth.weak-session-config",
        title: "Weak session cookie configuration",
        severity: "high",
        status: "open",
        description:
          "Session cookies appear to be missing secure attributes in an environment intended for deployment.",
        impact:
          "Attackers may gain access to active user sessions more easily on insecure or shared networks.",
        filePath: "src/lib/session.ts",
        line: 12,
        cwe: "CWE-614",
        confidence: "high",
        remediation:
          "Set Secure, HttpOnly, and SameSite attributes appropriately for all session cookies.",
        codeSnippet: `cookie: { httpOnly: true, secure: false }`,
      },
      {
        id: "finding_007",
        ruleId: "validation.missing-input-check",
        title: "Missing server-side input validation",
        severity: "medium",
        status: "reviewing",
        description:
          "A server endpoint appears to trust client-supplied fields without validating allowed values.",
        impact:
          "Unexpected or malformed input may trigger errors or bypass expected business rules.",
        filePath: "src/app/api/profile/route.ts",
        line: 31,
        cwe: "CWE-20",
        confidence: "medium",
        remediation:
          "Validate and normalize incoming request data on the server before processing.",
        codeSnippet: `const role = body.role;`,
      },
      {
        id: "finding_008",
        ruleId: "logging.verbose-error-leak",
        title: "Verbose error details exposed to logs",
        severity: "low",
        status: "resolved",
        description:
          "Detailed internal error objects appear to be logged without sanitization.",
        impact:
          "Sensitive implementation details may be exposed in shared log environments.",
        filePath: "src/lib/logger.ts",
        line: 22,
        cwe: "CWE-209",
        confidence: "medium",
        remediation:
          "Sanitize logged error content and avoid exposing stack traces outside development.",
        codeSnippet: `console.error("profile update failed", error);`,
      },
    ],
  },
  {
    scanId: "scan_003",
    projectName: "internal-admin-dashboard",
    scannedAt: "2026-03-09T18:45:00Z",
    totalFiles: 65,
    totalFindings: 2,
    severityCounts: {
      critical: 0,
      high: 0,
      medium: 1,
      low: 1,
      info: 0,
    },
    findings: [
      {
        id: "finding_009",
        ruleId: "auth.missing-rate-limit",
        title: "Login endpoint missing rate limiting",
        severity: "medium",
        status: "open",
        description:
          "The authentication endpoint appears to accept repeated requests without visible throttling or lockout protection.",
        impact:
          "Attackers may attempt credential stuffing or brute-force login attempts at a higher rate.",
        filePath: "src/app/api/auth/login/route.ts",
        line: 17,
        cwe: "CWE-307",
        confidence: "medium",
        remediation:
          "Add per-user and per-IP rate limiting with temporary lockout rules for repeated failures.",
        codeSnippet: `return NextResponse.json({ success: false }, { status: 401 });`,
      },
      {
        id: "finding_010",
        ruleId: "config.cors-wildcard-origin",
        title: "Wildcard CORS origin allowed",
        severity: "low",
        status: "reviewing",
        description:
          "CORS configuration appears to allow requests from any origin in a deployment-oriented environment.",
        impact:
          "Overly broad cross-origin access can increase exposure of internal APIs and weakens origin trust boundaries.",
        filePath: "src/lib/cors.ts",
        line: 9,
        cwe: "CWE-942",
        confidence: "medium",
        remediation:
          "Restrict allowed origins to known frontend domains and separate development from production configuration.",
        codeSnippet: `origin: "*"`,
      },
    ],
  },
];

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
    status: "completed",
    totalFiles: 65,
    totalFindings: 2,
    highestSeverity: "medium",
  },
];

export const mockScanResult = mockScanResults[0];

export function getRecentScans(): ScanHistoryItem[] {
  return mockScanHistory;
}

export function getScanHistoryItemById(scanId: string): ScanHistoryItem | null {
  return mockScanHistory.find((scan) => scan.scanId === scanId) ?? null;
}

export function getScanResultById(scanId: string): ScanResult | null {
  return mockScanResults.find((scan) => scan.scanId === scanId) ?? null;
}

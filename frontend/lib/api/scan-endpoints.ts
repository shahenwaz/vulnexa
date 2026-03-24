export const scanApiEndpoints = {
  createScan: "/api/scans",
  getScanSessionStatus: (sessionId: string) =>
    `/api/scans/sessions/${sessionId}`,
  getScanSessionResult: (scanId: string) => `/api/scans/${scanId}`,
} as const;

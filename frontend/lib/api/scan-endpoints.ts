export const scanApiEndpoints = {
  createLocalScan: "/scan/local",
  createRepoScan: "/scan/repo",
  createUploadScan: "/scan/upload",
  listScans: "/scan",
  getScanById: (scanId: string) => `/scan/${scanId}`,
} as const;

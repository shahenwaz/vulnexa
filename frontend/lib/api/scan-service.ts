import {
  advanceMockScanSession,
  createMockScanSession,
  getMockScanSessionResult,
  getMockScanSessionStatus,
} from "@/lib/api/mock-scan-service";
import type {
  CreateScanRequest,
  CreateScanResponse,
  ScanSessionResultResponse,
  ScanSessionStatusResponse,
} from "@/lib/types";

export async function createScan(
  request: CreateScanRequest,
): Promise<CreateScanResponse> {
  return createMockScanSession(request);
}

export async function getScanSessionStatus(
  sessionId: string,
): Promise<ScanSessionStatusResponse | null> {
  return getMockScanSessionStatus(sessionId);
}

export async function advanceScanSession(
  sessionId: string,
): Promise<ScanSessionStatusResponse | null> {
  return advanceMockScanSession(sessionId);
}

export async function getScanSessionResult(
  scanId: string,
): Promise<ScanSessionResultResponse | null> {
  return getMockScanSessionResult(scanId);
}

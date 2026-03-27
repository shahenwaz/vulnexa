import { mapBackendScanResultToUiScanResult } from "@/lib/api/backend-mappers";
import { getScanById } from "@/lib/api/scan-service";
import type { ScanResult } from "@/lib/types";

export async function loadUiScanResult(scanId: string): Promise<ScanResult> {
  const backendResult = await getScanById(scanId);
  return mapBackendScanResultToUiScanResult(backendResult);
}

import { createLocalScan, createRepoScan } from "@/lib/api/scan-service";
import type { BackendScanResult } from "@/lib/api/backend-types";
import type { ScanSessionPreset } from "@/lib/types";

function normalizeRepoUrl(value: string): string {
  const trimmed = value.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export async function createBackendScanFromSession(
  session: ScanSessionPreset,
): Promise<BackendScanResult> {
  const targetValue = session.targetValue.trim();

  if (!targetValue) {
    throw new Error("Please enter a target value.");
  }

  switch (session.targetType) {
    case "repository":
      return createRepoScan(normalizeRepoUrl(targetValue));

    case "folder":
      return createLocalScan(targetValue);

    case "upload":
      throw new Error(
        "ZIP upload should be submitted from the upload flow with a File object.",
      );

    default:
      throw new Error("Unsupported scan target type.");
  }
}

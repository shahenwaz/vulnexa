import type { CreateScanRequest, ScanSessionPreset } from "@/lib/types";

export function mapSessionPresetToCreateScanRequest(
  session: ScanSessionPreset,
): CreateScanRequest {
  return {
    projectName: session.projectName,
    targetType: session.targetType,
    targetValue: session.targetValue,
    notes: session.notes,
    options: {
      includeSecrets: session.includeSecrets,
      includeDependencies: session.includeDependencies,
      includeConfiguration: session.includeConfiguration,
    },
  };
}

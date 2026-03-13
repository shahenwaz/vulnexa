import type { ScanSessionPreset } from "@/lib/types";

export const mockScanSessionPresets: ScanSessionPreset[] = [
  {
    id: "session_draft",
    label: "Draft setup",
    description:
      "A prepared scan configuration before analysis starts. Useful for setting project details and scope.",
    status: "draft",
    estimatedDuration: "Not started",
    projectName: "demo-ecommerce-app",
    targetType: "repository",
    targetValue: "github.com/example/demo-ecommerce-app",
    notes: "Primary demo target for frontend prototype walkthrough.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
  {
    id: "session_queued",
    label: "Queued scan",
    description:
      "The scan request has been submitted and is waiting for an available analysis worker.",
    status: "queued",
    estimatedDuration: "~ 2 min waiting time",
    projectName: "student-portal-ui",
    targetType: "upload",
    targetValue: "student-portal-ui.zip",
    notes: "Queue state used to demonstrate early pipeline feedback.",
    includeSecrets: true,
    includeDependencies: false,
    includeConfiguration: true,
  },
  {
    id: "session_running",
    label: "Running scan",
    description:
      "Analysis is actively processing files and building the findings summary.",
    status: "running",
    estimatedDuration: "~ 1 min remaining",
    projectName: "internal-admin-dashboard",
    targetType: "folder",
    targetValue: "/src/internal-admin-dashboard",
    notes: "Running state used for live session preview in demos.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
  {
    id: "session_completed",
    label: "Completed scan",
    description:
      "The scan has finished and the results are ready to review in the details and report pages.",
    status: "completed",
    estimatedDuration: "Completed",
    projectName: "demo-ecommerce-app",
    targetType: "repository",
    targetValue: "github.com/example/demo-ecommerce-app",
    notes: "Completed state should link naturally into scan and report pages.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
];

export function getDefaultScanSessionPreset(): ScanSessionPreset {
  return mockScanSessionPresets[0];
}

export function getScanSessionPresetById(id: string): ScanSessionPreset | null {
  return mockScanSessionPresets.find((preset) => preset.id === id) ?? null;
}

import type { ScanSessionPreset } from "@/lib/types";

export const mockScanSessionPresets: ScanSessionPreset[] = [
  {
    id: "session_draft",
    label: "Draft setup",
    description: "Prepared scan configuration before analysis starts.",
    status: "draft",
    estimatedDuration: "Not started",
    projectName: "demo-ecommerce-app",
    targetType: "repository",
    targetValue: "github.com/example/demo-ecommerce-app",
    notes: "Primary frontend prototype target.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
  {
    id: "session_queued",
    label: "Queued scan",
    description: "The scan request is waiting for an available worker.",
    status: "queued",
    estimatedDuration: "~ 2 min waiting time",
    projectName: "student-portal-ui",
    targetType: "upload",
    targetValue: "student-portal-ui.zip",
    notes: "Used to demo queue feedback.",
    includeSecrets: true,
    includeDependencies: false,
    includeConfiguration: true,
  },
  {
    id: "session_running",
    label: "Running scan",
    description:
      "Analysis is currently processing files and building findings.",
    status: "running",
    estimatedDuration: "~ 1 min remaining",
    projectName: "internal-admin-dashboard",
    targetType: "folder",
    targetValue: "/src/internal-admin-dashboard",
    notes: "Used for live demo walkthrough.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
  {
    id: "session_completed",
    label: "Completed scan",
    description: "The scan has finished and results are ready to review.",
    status: "completed",
    estimatedDuration: "Completed",
    projectName: "demo-ecommerce-app",
    targetType: "repository",
    targetValue: "github.com/example/demo-ecommerce-app",
    notes: "Completed state should link naturally into results pages.",
    includeSecrets: true,
    includeDependencies: true,
    includeConfiguration: true,
  },
];

export function getDefaultScanSessionPreset(): ScanSessionPreset {
  return mockScanSessionPresets[0];
}

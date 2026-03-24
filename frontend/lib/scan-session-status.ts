import type { ScanRunStatus } from "@/lib/types";

export function getNextScanRunStatus(status: ScanRunStatus): ScanRunStatus {
  switch (status) {
    case "draft":
      return "queued";
    case "queued":
      return "running";
    case "running":
      return "completed";
    case "completed":
      return "draft";
  }
}

export function getScanRunStatusDuration(status: ScanRunStatus): string {
  switch (status) {
    case "draft":
      return "Not started";
    case "queued":
      return "~ 2 min waiting time";
    case "running":
      return "~ 1 min remaining";
    case "completed":
      return "Completed";
  }
}

export function getScanRunStatusDescription(status: ScanRunStatus): string {
  switch (status) {
    case "draft":
      return "Prepared scan configuration before analysis starts.";
    case "queued":
      return "The scan request is waiting for an available worker.";
    case "running":
      return "Analysis is currently processing files and building findings.";
    case "completed":
      return "The scan has finished and results are ready to review.";
  }
}

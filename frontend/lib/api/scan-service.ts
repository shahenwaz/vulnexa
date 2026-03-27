import { scanApiEndpoints } from "@/lib/api/scan-endpoints";
import type {
  BackendScanListResponse,
  BackendScanResult,
} from "@/lib/api/backend-types";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

export class ScanApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ScanApiError";
    this.status = status;
  }
}

function getReadableScanError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("only zip files are supported")) {
    return "Please upload a valid ZIP file.";
  }

  if (
    normalized.includes("uploaded zip is too large") ||
    normalized.includes("maximum size is")
  ) {
    return "This ZIP file is too large. Please upload a smaller archive.";
  }

  if (
    normalized.includes("unsafe zip entry detected") ||
    normalized.includes("unsafe zip")
  ) {
    return "This ZIP file contains unsafe paths and cannot be scanned.";
  }

  if (normalized.includes("missing file name")) {
    return "The selected file could not be read properly. Please choose it again.";
  }

  return message;
}

function getBackendUnavailableMessage(): string {
  return "Unable to reach the backend. Make sure the backend server is running and try again.";
}

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    throw new ScanApiError(getBackendUnavailableMessage(), 503);
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody?.detail) {
        message = getReadableScanError(errorBody.detail);
      }
    } catch {
      // keep fallback
    }

    throw new ScanApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

async function fetchFormData<T>(input: string, body: FormData): Promise<T> {
  let response: Response;

  try {
    response = await fetch(input, {
      method: "POST",
      body,
      cache: "no-store",
    });
  } catch {
    throw new ScanApiError(getBackendUnavailableMessage(), 503);
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody?.detail) {
        message = getReadableScanError(errorBody.detail);
      }
    } catch {
      // keep fallback
    }

    throw new ScanApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export async function getSavedScans(): Promise<BackendScanListResponse> {
  return fetchJson<BackendScanListResponse>(
    `${BACKEND_BASE_URL}${scanApiEndpoints.listScans}`,
  );
}

export async function getScanById(scanId: string): Promise<BackendScanResult> {
  return fetchJson<BackendScanResult>(
    `${BACKEND_BASE_URL}${scanApiEndpoints.getScanById(scanId)}`,
  );
}

export async function createRepoScan(
  repoUrl: string,
): Promise<BackendScanResult> {
  return fetchJson<BackendScanResult>(
    `${BACKEND_BASE_URL}${scanApiEndpoints.createRepoScan}`,
    {
      method: "POST",
      body: JSON.stringify({ repo_url: repoUrl }),
    },
  );
}

export async function createLocalScan(
  directoryPath: string,
): Promise<BackendScanResult> {
  return fetchJson<BackendScanResult>(
    `${BACKEND_BASE_URL}${scanApiEndpoints.createLocalScan}`,
    {
      method: "POST",
      body: JSON.stringify({ directory_path: directoryPath }),
    },
  );
}

export async function createUploadScan(file: File): Promise<BackendScanResult> {
  const formData = new FormData();
  formData.append("file", file);

  return fetchFormData<BackendScanResult>(
    `${BACKEND_BASE_URL}${scanApiEndpoints.createUploadScan}`,
    formData,
  );
}

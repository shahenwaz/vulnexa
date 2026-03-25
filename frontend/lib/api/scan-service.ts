import { scanApiEndpoints } from "@/lib/api/scan-endpoints";
import type {
  BackendScanListResponse,
  BackendScanResult,
} from "@/lib/api/backend-types";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
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

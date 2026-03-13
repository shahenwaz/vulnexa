import { getScanResultById } from "@/lib/mock-data";
import {
  getNextScanRunStatus,
  getScanRunStatusDescription,
  getScanRunStatusDuration,
} from "@/lib/scan-session-status";
import type {
  CreateScanRequest,
  CreateScanResponse,
  ScanRunStatus,
  ScanSessionResultResponse,
  ScanSessionStatusResponse,
} from "@/lib/types";

type MockSessionRecord = {
  sessionId: string;
  scanId: string;
  projectName: string;
  status: Exclude<ScanRunStatus, "draft">;
  createdAt: string;
  updatedAt: string;
};

const mockSessionStore = new Map<string, MockSessionRecord>();

function createMockSessionId() {
  return `session_${Math.random().toString(36).slice(2, 10)}`;
}

function resolveScanIdFromProjectName(projectName: string) {
  const normalizedProjectName = projectName.trim().toLowerCase();

  if (normalizedProjectName === "demo-ecommerce-app") {
    return "scan_001";
  }

  if (normalizedProjectName === "student-portal-ui") {
    return "scan_002";
  }

  if (normalizedProjectName === "internal-admin-dashboard") {
    return "scan_003";
  }

  return "scan_001";
}

function getProgressPercent(status: Exclude<ScanRunStatus, "draft">) {
  switch (status) {
    case "queued":
      return 20;
    case "running":
      return 65;
    case "completed":
      return 100;
  }
}

function getCurrentStage(status: Exclude<ScanRunStatus, "draft">) {
  switch (status) {
    case "queued":
      return "Queued for worker allocation";
    case "running":
      return "Analyzing project files";
    case "completed":
      return "Results ready";
  }
}

export async function createMockScanSession(
  request: CreateScanRequest,
): Promise<CreateScanResponse> {
  const sessionId = createMockSessionId();
  const createdAt = new Date().toISOString();
  const scanId = resolveScanIdFromProjectName(request.projectName);

  const session: MockSessionRecord = {
    sessionId,
    scanId,
    projectName: request.projectName,
    status: "queued",
    createdAt,
    updatedAt: createdAt,
  };

  mockSessionStore.set(sessionId, session);

  return {
    sessionId,
    scanId,
    status: session.status,
    projectName: session.projectName,
    createdAt,
    estimatedDuration: getScanRunStatusDuration(session.status),
    message: "Mock scan session created successfully.",
  };
}

export async function getMockScanSessionStatus(
  sessionId: string,
): Promise<ScanSessionStatusResponse | null> {
  const session = mockSessionStore.get(sessionId);

  if (!session) {
    return null;
  }

  return {
    sessionId: session.sessionId,
    scanId: session.scanId,
    projectName: session.projectName,
    status: session.status,
    progressPercent: getProgressPercent(session.status),
    currentStage: getCurrentStage(session.status),
    message: getScanRunStatusDescription(session.status),
    startedAt: session.createdAt,
    updatedAt: session.updatedAt,
    completedAt: session.status === "completed" ? session.updatedAt : undefined,
  };
}

export async function advanceMockScanSession(
  sessionId: string,
): Promise<ScanSessionStatusResponse | null> {
  const session = mockSessionStore.get(sessionId);

  if (!session) {
    return null;
  }

  const nextStatus = getNextScanRunStatus(session.status);

  const resolvedStatus: Exclude<ScanRunStatus, "draft"> =
    nextStatus === "draft" ? "queued" : nextStatus;

  const updatedSession: MockSessionRecord = {
    ...session,
    status: resolvedStatus,
    updatedAt: new Date().toISOString(),
  };

  mockSessionStore.set(sessionId, updatedSession);

  return {
    sessionId: updatedSession.sessionId,
    scanId: updatedSession.scanId,
    projectName: updatedSession.projectName,
    status: updatedSession.status,
    progressPercent: getProgressPercent(updatedSession.status),
    currentStage: getCurrentStage(updatedSession.status),
    message: getScanRunStatusDescription(updatedSession.status),
    startedAt: updatedSession.createdAt,
    updatedAt: updatedSession.updatedAt,
    completedAt:
      updatedSession.status === "completed"
        ? updatedSession.updatedAt
        : undefined,
  };
}

export async function getMockScanSessionResult(
  scanId: string,
): Promise<ScanSessionResultResponse | null> {
  const result = getScanResultById(scanId);

  if (!result) {
    return null;
  }

  const matchedSession = Array.from(mockSessionStore.values()).find(
    (session) => session.scanId === scanId,
  );

  return {
    sessionId: matchedSession?.sessionId ?? "mock_session_result",
    scanId,
    status: "completed",
    result,
  };
}

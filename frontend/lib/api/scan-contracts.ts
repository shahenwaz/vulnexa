import type {
  ApiErrorResponse,
  CreateScanRequest,
  CreateScanResponse,
  ScanSessionResultResponse,
  ScanSessionStatusResponse,
} from "@/lib/types";

export type CreateScanApiContract = {
  request: CreateScanRequest;
  response: CreateScanResponse;
  error: ApiErrorResponse;
};

export type GetScanSessionStatusApiContract = {
  response: ScanSessionStatusResponse;
  error: ApiErrorResponse;
};

export type GetScanSessionResultApiContract = {
  response: ScanSessionResultResponse;
  error: ApiErrorResponse;
};

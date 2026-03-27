import { notFound } from "next/navigation";

import { BackendUnavailableState } from "@/components/shared/backend-unavailable-state";
import { ScanDetailsView } from "@/components/scan/scan-details-view";
import { mapBackendScanResultToUiScanResult } from "@/lib/api/backend-mappers";
import { getScanById, ScanApiError } from "@/lib/api/scan-service";
import type { ScanResult } from "@/lib/types";

type ScanDetailsPageProps = {
  params: Promise<{
    scanId: string;
  }>;
};

export default async function ScanDetailsPage({
  params,
}: ScanDetailsPageProps) {
  const { scanId } = await params;

  let result: ScanResult | null = null;
  let isBackendUnavailable = false;

  try {
    const backendResult = await getScanById(scanId);
    result = mapBackendScanResultToUiScanResult(backendResult);
  } catch (error) {
    if (error instanceof ScanApiError && error.status === 404) {
      notFound();
    }

    isBackendUnavailable = true;
  }

  if (isBackendUnavailable || !result) {
    return (
      <BackendUnavailableState
        title="Scan details are unavailable"
        description="Vulnexa could not load this saved scan from the backend right now. Make sure the backend is running, then try again."
      />
    );
  }

  return <ScanDetailsView result={result} />;
}

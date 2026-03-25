import { notFound } from "next/navigation";

import { ScanDetailsView } from "@/components/scan/scan-details-view";
import { mapBackendScanResultToUiScanResult } from "@/lib/api/backend-mappers";
import { getScanById } from "@/lib/api/scan-service";
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

  let result: ScanResult;

  try {
    const backendResult = await getScanById(scanId);
    result = mapBackendScanResultToUiScanResult(backendResult);
  } catch {
    notFound();
  }

  return <ScanDetailsView result={result} />;
}

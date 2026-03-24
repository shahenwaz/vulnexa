import { notFound } from "next/navigation";

import { ScanDetailsView } from "@/components/scan/scan-details-view";
import { getScanResultById } from "@/lib/mock-data";

type ScanDetailsPageProps = {
  params: Promise<{
    scanId: string;
  }>;
};

export default async function ScanDetailsPage({
  params,
}: ScanDetailsPageProps) {
  const { scanId } = await params;
  const result = getScanResultById(scanId);

  if (!result) {
    notFound();
  }

  return <ScanDetailsView result={result} />;
}

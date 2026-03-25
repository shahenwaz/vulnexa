import { notFound } from "next/navigation";

import { ExecutiveSummary } from "@/components/reports/executive-summary";
import { GroupedFindings } from "@/components/reports/grouped-findings";
import { RemediationSummary } from "@/components/reports/remediation-summary";
import { ReportHeader } from "@/components/reports/report-header";
import { SeveritySummaryTable } from "@/components/reports/severity-summary-table";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { mapBackendScanResultToUiScanResult } from "@/lib/api/backend-mappers";
import { getScanById } from "@/lib/api/scan-service";
import type { ScanResult } from "@/lib/types";

type ReportPageProps = {
  params: Promise<{
    scanId: string;
  }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { scanId } = await params;

  let result: ScanResult;

  try {
    const backendResult = await getScanById(scanId);
    result = mapBackendScanResultToUiScanResult(backendResult);
  } catch {
    notFound();
  }

  return (
    <Section className="pt-10 md:pt-14 print:pt-0">
      <Container className="max-w-5xl space-y-6 md:space-y-8 print:max-w-none print:px-0">
        <ReportHeader result={result} />
        <ExecutiveSummary result={result} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <GroupedFindings result={result} />

          <div className="space-y-6 lg:sticky lg:top-24 print:static">
            <SeveritySummaryTable result={result} />
            <RemediationSummary result={result} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

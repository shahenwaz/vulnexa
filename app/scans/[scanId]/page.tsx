import { FindingsPreview } from "@/components/scan/findings-preview";
import { ScanSummaryCard } from "@/components/scan/scan-summary-card";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";
import { mockScanResult } from "@/lib/mock-data";

export default function ScanDetailsPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <PageIntro
          eyebrow="Scan results"
          title={mockScanResult.projectName}
          description={`Scan ID: ${mockScanResult.scanId} • Files scanned: ${mockScanResult.totalFiles}`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ScanSummaryCard
            label="Total findings"
            value={String(mockScanResult.totalFindings)}
          />
          <ScanSummaryCard
            label="Critical"
            value={String(mockScanResult.severityCounts.critical)}
          />
          <ScanSummaryCard
            label="High"
            value={String(mockScanResult.severityCounts.high)}
          />
          <ScanSummaryCard
            label="Medium"
            value={String(mockScanResult.severityCounts.medium)}
          />
          <ScanSummaryCard
            label="Low + Info"
            value={String(
              mockScanResult.severityCounts.low +
                mockScanResult.severityCounts.info,
            )}
          />
        </div>

        <FindingsPreview />
      </Container>
    </Section>
  );
}

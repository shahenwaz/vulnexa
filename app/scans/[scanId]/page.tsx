"use client";

import { useMemo, useState } from "react";

import { FindingCard } from "@/components/scan/finding-card";
import { FindingsFilters } from "@/components/scan/findings-filters";
import { RemediationPanel } from "@/components/scan/remediation-panel";
import { ScanMetadataPanel } from "@/components/scan/scan-metadata-panel";
import { ScanSummaryCard } from "@/components/scan/scan-summary-card";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";
import { mockScanResult } from "@/lib/mock-data";
import type { Severity } from "@/lib/types";

export default function ScanDetailsPage() {
  const [filter, setFilter] = useState<Severity | "all">("all");

  const filteredFindings = useMemo(() => {
    if (filter === "all") return mockScanResult.findings;
    return mockScanResult.findings.filter(
      (finding) => finding.severity === filter,
    );
  }, [filter]);

  return (
    <Section className="pt-10 md:pt-14">
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

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px] xl:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  Findings overview
                </h2>
                <p className="text-sm text-muted-foreground">
                  Filter findings by severity and review detailed impact,
                  evidence, and remediation context.
                </p>
              </div>

              <FindingsFilters value={filter} onChange={setFilter} />
            </div>

            <div className="space-y-4">
              {filteredFindings.map((finding) => (
                <FindingCard key={finding.id} finding={finding} />
              ))}

              {filteredFindings.length === 0 ? (
                <div className="panel rounded-3xl border-border/70 p-8 text-center">
                  <h3 className="text-lg font-semibold">No findings found</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    There are no findings for the selected severity filter in
                    this prototype dataset.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 xl:sticky xl:top-24">
            <ScanMetadataPanel />
            <RemediationPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}

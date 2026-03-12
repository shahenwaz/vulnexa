"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

import { FindingCard } from "@/components/scan/finding-card";
import { FindingsFilters } from "@/components/scan/findings-filters";
import { RemediationPanel } from "@/components/scan/remediation-panel";
import { ScanMetadataPanel } from "@/components/scan/scan-metadata-panel";
import { ScanSummaryCard } from "@/components/scan/scan-summary-card";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { mockScanResult } from "@/lib/mock-data";
import { getHighestSeverity, getOpenFindingsCount } from "@/lib/report";
import type { Severity } from "@/lib/types";

export default function ScanDetailsPage() {
  const [filter, setFilter] = useState<Severity | "all">("all");

  const filteredFindings = useMemo(() => {
    if (filter === "all") return mockScanResult.findings;

    return mockScanResult.findings.filter(
      (finding) => finding.severity === filter,
    );
  }, [filter]);

  const highestSeverity = getHighestSeverity(mockScanResult);
  const openFindings = getOpenFindingsCount(mockScanResult.findings);

  return (
    <Section className="pt-10 md:pt-14">
      <Container className="space-y-8">
        <PageIntro
          eyebrow="Scan results"
          title={mockScanResult.projectName}
          description="Review vulnerability findings, inspect evidence, and prepare remediation work through a cleaner technical scan view."
        />

        <div className="panel-glow flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Highest severity
              </span>
              <SeverityBadge severity={highestSeverity} />
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {mockScanResult.totalFindings} findings detected across{" "}
              {mockScanResult.totalFiles} files. {openFindings} finding
              {openFindings > 1 ? "s are" : " is"} currently open and should be
              reviewed first.
            </p>
          </div>

          <Button asChild variant="outline" className="w-full md:w-auto">
            <Link href={`/reports/${mockScanResult.scanId}`}>
              Open security report
              <FileText className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ScanSummaryCard
            label="Total findings"
            value={String(mockScanResult.totalFindings)}
            tone="default"
          />
          <ScanSummaryCard
            label="Critical"
            value={String(mockScanResult.severityCounts.critical)}
            tone="critical"
          />
          <ScanSummaryCard
            label="High"
            value={String(mockScanResult.severityCounts.high)}
            tone="high"
          />
          <ScanSummaryCard
            label="Medium"
            value={String(mockScanResult.severityCounts.medium)}
            tone="medium"
          />
          <ScanSummaryCard
            label="Low + Info"
            value={String(
              mockScanResult.severityCounts.low +
                mockScanResult.severityCounts.info,
            )}
            tone="muted"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px] xl:items-start">
          <div className="space-y-6">
            <div className="panel rounded-3xl border-border/70 p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Findings overview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Filter findings by severity and review detailed impact,
                    evidence, and remediation context.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Showing</span>
                  <span className="font-medium text-foreground">
                    {filteredFindings.length}
                  </span>
                  <span>of</span>
                  <span className="font-medium text-foreground">
                    {mockScanResult.findings.length}
                  </span>
                  <span>findings</span>
                </div>
              </div>

              <div className="mt-5">
                <FindingsFilters value={filter} onChange={setFilter} />
              </div>
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
            <ScanMetadataPanel result={mockScanResult} />
            <RemediationPanel result={mockScanResult} />

            <div className="panel rounded-3xl border-border/70 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-2">
                  <ArrowRight className="size-4 text-primary" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Next step</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Use the report view for a cleaner stakeholder summary and
                    print-friendly export layout.
                  </p>
                  <Link
                    href={`/reports/${mockScanResult.scanId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                  >
                    Go to report page
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

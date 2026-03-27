"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";

import { FindingCard } from "@/components/scan/finding-card";
import { FindingsFilters } from "@/components/scan/findings-filters";
import { RemediationPanel } from "@/components/scan/remediation-panel";
import { ScanMetadataPanel } from "@/components/scan/scan-metadata-panel";
import { ScanSummaryCard } from "@/components/scan/scan-summary-card";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { getHighestSeverity, getOpenFindingsCount } from "@/lib/report";
import type { ScanResult, Severity } from "@/lib/types";

type ScanDetailsViewProps = {
  result: ScanResult;
};

type SummaryTone = "default" | "critical" | "high" | "medium" | "muted";

function getSummaryTone(
  severity: Severity | null | undefined,
  fallback: SummaryTone = "default",
): SummaryTone {
  switch (severity) {
    case "critical":
    case "high":
    case "medium":
      return severity;
    case "low":
      return "default";
    default:
      return fallback;
  }
}

export function ScanDetailsView({ result }: ScanDetailsViewProps) {
  const [filter, setFilter] = useState<Severity | "all">("all");

  const filteredFindings = useMemo(() => {
    if (filter === "all") {
      return result.findings;
    }

    return result.findings.filter((finding) => finding.severity === filter);
  }, [filter, result.findings]);

  const highestSeverity = getHighestSeverity(result);
  const openFindings = getOpenFindingsCount(result.findings);

  return (
    <div className="pb-10">
      <Container className="space-y-5 pt-5 md:space-y-8 md:pt-8">
        <div className="space-y-3">
          <PageIntro
            eyebrow="Scan details"
            title={result.projectName}
            description="This result is loaded from the saved backend scan output and includes findings, severity distribution, and remediation guidance."
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {result.scanId}
            </span>

            <Button asChild size="sm" className="gap-2">
              <Link href={`/reports/${result.scanId}`}>
                <FileText className="size-4" />
                Open Report
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-4">
            <div className="panel-glow rounded-3xl border border-border/60 bg-card/70 p-4 sm:p-5 md:p-6">
              <div className="flex flex-col gap-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity={highestSeverity} />
                    <span className="text-sm text-muted-foreground">
                      Highest severity
                    </span>
                  </div>

                  <div className="text-sm leading-7 text-muted-foreground">
                    {result.totalFindings} findings detected across{" "}
                    {result.totalFiles} files. {openFindings} finding
                    {openFindings === 1 ? " is" : "s are"} currently open and
                    should be reviewed first.
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <ScanSummaryCard
                    label="Total findings"
                    value={String(result.totalFindings)}
                    tone={
                      result.totalFindings > 0
                        ? getSummaryTone(highestSeverity, "default")
                        : "muted"
                    }
                  />
                  <ScanSummaryCard
                    label="Files scanned"
                    value={String(result.totalFiles)}
                  />
                  <ScanSummaryCard
                    label="Open findings"
                    value={String(openFindings)}
                    tone={
                      openFindings > 0
                        ? getSummaryTone(highestSeverity, "default")
                        : "muted"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Findings overview
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Filter findings by severity and review detailed impact,
                    evidence, and remediation context.
                  </p>
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredFindings.length} of {result.findings.length}{" "}
                  findings
                </div>
              </div>

              <FindingsFilters value={filter} onChange={setFilter} />

              <div className="space-y-4">
                {filteredFindings.map((finding) => (
                  <FindingCard key={finding.id} finding={finding} />
                ))}

                {filteredFindings.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-8 text-center">
                    <h3 className="text-lg font-semibold text-foreground">
                      No findings found
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no findings for the selected severity filter in
                      this saved scan result.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-4 lg:self-start">
            <ScanMetadataPanel result={result} />
            <RemediationPanel result={result} />
          </div>
        </div>
      </Container>
    </div>
  );
}

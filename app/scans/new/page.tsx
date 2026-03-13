"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";

import { ScanConfigurationForm } from "@/components/scan/scan-configuration-form";
import { ScanReadinessPanel } from "@/components/scan/scan-readiness-panel";
import { ScanSessionPreview } from "@/components/scan/scan-session-preview";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { getDefaultScanSessionPreset } from "@/lib/scan-session";
import { getSessionLinks } from "@/lib/scan-session-links";
import type { ScanRunStatus, ScanSessionPreset } from "@/lib/types";

function getNextStatus(status: ScanRunStatus): ScanRunStatus {
  switch (status) {
    case "draft":
      return "queued";
    case "queued":
      return "running";
    case "running":
      return "completed";
    case "completed":
      return "draft";
  }
}

function getEstimatedDuration(status: ScanRunStatus): string {
  switch (status) {
    case "draft":
      return "Not started";
    case "queued":
      return "~ 2 min waiting time";
    case "running":
      return "~ 1 min remaining";
    case "completed":
      return "Completed";
  }
}

function getStatusDescription(status: ScanRunStatus): string {
  switch (status) {
    case "draft":
      return "Prepared scan configuration before analysis starts.";
    case "queued":
      return "The scan request is waiting for an available worker.";
    case "running":
      return "Analysis is currently processing files and building findings.";
    case "completed":
      return "The scan has finished and results are ready to review.";
  }
}

export default function NewScanPage() {
  const [session, setSession] = useState<ScanSessionPreset>(
    getDefaultScanSessionPreset(),
  );

  const sessionLinks = useMemo(() => getSessionLinks(session), [session]);

  function handleStartDemoScan() {
    const nextStatus = getNextStatus(session.status);

    setSession((current) => ({
      ...current,
      status: nextStatus,
      estimatedDuration: getEstimatedDuration(nextStatus),
      description: getStatusDescription(nextStatus),
    }));
  }

  const isCompleted = session.status === "completed";

  return (
    <div className="pb-10">
      <Container className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        <PageIntro
          eyebrow="New scan"
          title="Start a new security scan"
          description="Create a believable scan session flow for the demo with configurable state, target details, and review-ready structure."
        />

        {isCompleted ? (
          <div className="panel-glow rounded-3xl border border-primary/20 bg-primary/8 p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <CheckCircle2 className="size-5" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    Scan completed successfully
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {session.projectName}
                    </span>{" "}
                    is now linked to result ID{" "}
                    <span className="font-medium text-foreground">
                      {sessionLinks.scanId}
                    </span>
                    . Continue into the detailed scan view, open the report, or
                    return to the dashboard.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild className="gap-2">
                  <Link href={sessionLinks.scanHref}>
                    View scan
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="gap-2">
                  <Link href={sessionLinks.reportHref}>
                    Open report
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="self-start">
            <ScanConfigurationForm
              value={session}
              onChange={setSession}
              onStartDemoScan={handleStartDemoScan}
            />
          </div>

          <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <ScanSessionPreview preset={session} />
            <ScanReadinessPanel />
          </div>
        </div>
      </Container>
    </div>
  );
}

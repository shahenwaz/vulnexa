"use client";

import { useState } from "react";

import { ScanConfigurationForm } from "@/components/scan/scan-configuration-form";
import { ScanReadinessPanel } from "@/components/scan/scan-readiness-panel";
import { ScanSessionPreview } from "@/components/scan/scan-session-preview";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { getDefaultScanSessionPreset } from "@/lib/scan-session";
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

  function handleStartDemoScan() {
    const nextStatus = getNextStatus(session.status);

    setSession((current) => ({
      ...current,
      status: nextStatus,
      estimatedDuration: getEstimatedDuration(nextStatus),
      description: getStatusDescription(nextStatus),
    }));
  }

  return (
    <div className="pb-10">
      <Container className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        <PageIntro
          eyebrow="New scan"
          title="Start a new security scan"
          description="Create a believable scan session flow for the demo with configurable state, target details, and review-ready structure."
        />

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

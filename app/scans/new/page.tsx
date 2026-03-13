"use client";

import { useState } from "react";

import { ScanConfigurationForm } from "@/components/scan/scan-configuration-form";
import { ScanReadinessPanel } from "@/components/scan/scan-readiness-panel";
import { ScanSessionPreview } from "@/components/scan/scan-session-preview";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { getDefaultScanSessionPreset } from "@/lib/scan-session";
import type { ScanSessionPreset } from "@/lib/types";

export default function NewScanPage() {
  const [session, setSession] = useState<ScanSessionPreset>(
    getDefaultScanSessionPreset(),
  );

  return (
    <div className="pb-10">
      <Container className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        <PageIntro
          eyebrow="New scan"
          title="Start a new security scan"
          description="Create a believable scan session flow for the demo with configurable state, target details, and review-ready structure."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <ScanConfigurationForm value={session} onChange={setSession} />

          <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <ScanSessionPreview preset={session} />
            <ScanReadinessPanel />
          </div>
        </div>
      </Container>
    </div>
  );
}

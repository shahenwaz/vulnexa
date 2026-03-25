"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";

import { createBackendScanFromSession } from "@/lib/api/create-backend-scan";
import { ScanConfigurationForm } from "@/components/scan/scan-configuration-form";
import { ScanReadinessPanel } from "@/components/scan/scan-readiness-panel";
import { ScanSessionPreview } from "@/components/scan/scan-session-preview";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { getDefaultScanSessionPreset } from "@/lib/scan-session";
import { getSessionLinks } from "@/lib/scan-session-links";
import {
  getScanRunStatusDescription,
  getScanRunStatusDuration,
} from "@/lib/scan-session-status";
import type { ScanSessionPreset } from "@/lib/types";

export default function NewScanPage() {
  const router = useRouter();

  const [session, setSession] = useState<ScanSessionPreset>(
    getDefaultScanSessionPreset(),
  );
  const [resolvedScanId, setResolvedScanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sessionLinks = useMemo(
    () => getSessionLinks(session, resolvedScanId),
    [session, resolvedScanId],
  );

  async function handleStartScan() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      setSession((current) => ({
        ...current,
        status: "queued",
        estimatedDuration: getScanRunStatusDuration("queued"),
        description: getScanRunStatusDescription("queued"),
      }));

      const created = await createBackendScanFromSession(session);

      setResolvedScanId(created.scan_id);

      setSession((current) => ({
        ...current,
        status: "completed",
        estimatedDuration: getScanRunStatusDuration("completed"),
        description: "Backend scan completed and results are ready to review.",
        projectName: current.projectName || created.scan_id,
      }));

      router.push(`/scans/${created.scan_id}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create scan. Please try again.";

      setSubmitError(message);

      setSession((current) => ({
        ...current,
        status: "draft",
        estimatedDuration: getScanRunStatusDuration("draft"),
        description: "Update the scan settings and try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResetSession() {
    setSession(getDefaultScanSessionPreset());
    setResolvedScanId(null);
    setSubmitError(null);
  }

  function handleJumpToCompleted() {
    setSession((current) => ({
      ...current,
      status: "completed",
      estimatedDuration: getScanRunStatusDuration("completed"),
      description: getScanRunStatusDescription("completed"),
    }));
  }

  const isCompleted = session.status === "completed";

  return (
    <div className="pb-10">
      <Container className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <PageIntro
            eyebrow="New scan"
            title="Start a new security scan"
            description="Submit a real scan request to the backend and move directly into the saved scan results."
          />

          <div className="flex flex-wrap gap-3 xl:justify-end">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dashboard">
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {submitError ? (
          <div className="rounded-3xl border border-destructive/25 bg-destructive/10 p-5 text-sm text-destructive md:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/15">
                <AlertCircle className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="text-base font-semibold text-foreground">
                  Scan could not be created
                </h2>
                <p className="leading-6 text-muted-foreground">{submitError}</p>
              </div>
            </div>
          </div>
        ) : null}

        {isCompleted && resolvedScanId ? (
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
                    .
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
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="self-start">
            <ScanConfigurationForm
              value={session}
              onChange={setSession}
              onStartScan={handleStartScan}
              onJumpToCompleted={handleJumpToCompleted}
              onReset={handleResetSession}
              isSubmitting={isSubmitting}
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

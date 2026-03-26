"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FolderGit2,
  LayoutDashboard,
  Loader2,
  LaptopMinimal,
} from "lucide-react";

import { createLocalScan, createRepoScan } from "@/lib/api/scan-service";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ScanTargetType = "repository" | "folder";
type SubmitStatus = "idle" | "submitting" | "completed";

function normalizeRepoUrl(value: string): string {
  const trimmed = value.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function getDisplayName(
  targetType: ScanTargetType,
  targetValue: string,
): string {
  const trimmed = targetValue.trim();

  if (!trimmed) {
    return targetType === "repository"
      ? "Repository scan"
      : "Local folder scan";
  }

  if (targetType === "repository") {
    const cleaned = trimmed.replace(/\/$/, "");
    return cleaned.split("/").pop() || trimmed;
  }

  return trimmed.split(/[\\/]/).filter(Boolean).pop() || trimmed;
}

function getActionLabel(
  targetType: ScanTargetType,
  status: SubmitStatus,
  hasValue: boolean,
): string {
  if (status === "submitting") {
    return targetType === "repository"
      ? "Scanning repository..."
      : "Scanning folder...";
  }

  if (status === "completed") {
    return "Scan completed";
  }

  if (!hasValue) {
    return targetType === "repository"
      ? "Paste repository URL"
      : "Enter folder path";
  }

  return targetType === "repository"
    ? "Start repository scan"
    : "Start folder scan";
}

export default function NewScanPage() {
  const router = useRouter();

  const [targetType, setTargetType] = useState<ScanTargetType>("repository");
  const [targetValue, setTargetValue] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdScanId, setCreatedScanId] = useState<string | null>(null);

  const trimmedTargetValue = targetValue.trim();
  const hasValue = trimmedTargetValue.length > 0;

  const previewName = useMemo(
    () => getDisplayName(targetType, trimmedTargetValue),
    [targetType, trimmedTargetValue],
  );

  const actionLabel = getActionLabel(targetType, submitStatus, hasValue);

  async function handleStartScan() {
    if (!hasValue || submitStatus === "submitting") {
      return;
    }

    setSubmitError(null);
    setSubmitStatus("submitting");

    try {
      const created =
        targetType === "repository"
          ? await createRepoScan(normalizeRepoUrl(trimmedTargetValue))
          : await createLocalScan(trimmedTargetValue);

      setCreatedScanId(created.scan_id);
      setSubmitStatus("completed");

      router.push(`/scans/${created.scan_id}`);
    } catch (error) {
      setSubmitStatus("idle");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create scan. Please try again.",
      );
    }
  }

  function handleReset() {
    setTargetValue("");
    setSubmitError(null);
    setSubmitStatus("idle");
    setCreatedScanId(null);
  }

  return (
    <div className="pb-10">
      <Container className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <PageIntro
            eyebrow="New scan"
            title="Start a new security scan"
            description="Choose a target, submit the scan, and move straight into the saved result."
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
          <div className="rounded-3xl border border-destructive/25 bg-destructive/10 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
                <AlertCircle className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="text-base font-semibold text-foreground">
                  Scan could not be created
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {submitError}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {submitStatus === "completed" && createdScanId ? (
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
                      {previewName}
                    </span>{" "}
                    is ready to review under scan ID{" "}
                    <span className="font-medium text-foreground">
                      {createdScanId}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild className="gap-2">
                  <Link href={`/scans/${createdScanId}`}>
                    View scan
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="gap-2">
                  <Link href={`/reports/${createdScanId}`}>
                    Open report
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <Card className="border-border/60 bg-card/70">
            <CardHeader className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Scan target</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the target type and submit it to the backend.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setTargetType("repository");
                    setSubmitError(null);
                    setSubmitStatus("idle");
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                    targetType === "repository"
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:bg-accent/40",
                  )}
                >
                  <div className="rounded-xl border bg-background/70 p-2">
                    <FolderGit2 className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub repository</p>
                    <p className="text-xs text-muted-foreground">
                      Paste a public repository URL
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTargetType("folder");
                    setSubmitError(null);
                    setSubmitStatus("idle");
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                    targetType === "folder"
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:bg-accent/40",
                  )}
                >
                  <div className="rounded-xl border bg-background/70 p-2">
                    <LaptopMinimal className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Local folder</p>
                    <p className="text-xs text-muted-foreground">
                      Enter a directory path on the backend machine
                    </p>
                  </div>
                </button>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {targetType === "repository"
                    ? "Repository URL"
                    : "Folder path"}
                </label>
                <Input
                  value={targetValue}
                  onChange={(event) => {
                    setTargetValue(event.target.value);
                    setSubmitError(null);
                    if (submitStatus !== "idle") {
                      setSubmitStatus("idle");
                    }
                  }}
                  placeholder={
                    targetType === "repository"
                      ? "https://github.com/owner/repository"
                      : "C:\\projects\\my-app"
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {targetType === "repository"
                    ? "Use a public GitHub repository link."
                    : "This path must exist on the machine running the Python backend."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleStartScan}
                  disabled={!hasValue || submitStatus === "submitting"}
                  className="gap-2"
                >
                  {submitStatus === "submitting" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {actionLabel}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={submitStatus === "submitting"}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/70 xl:sticky xl:top-24">
            <CardHeader>
              <CardTitle className="text-lg">Live preview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="rounded-2xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Project
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {previewName}
                </p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Target type
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {targetType === "repository"
                    ? "GitHub repository"
                    : "Local folder"}
                </p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Current target
                </p>
                <p className="mt-1 break-all font-medium text-foreground">
                  {trimmedTargetValue || "Waiting for input"}
                </p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Scan state
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {submitStatus === "idle"
                    ? "Ready"
                    : submitStatus === "submitting"
                      ? "Submitting to backend"
                      : "Completed"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

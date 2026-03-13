import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderGit2,
  LoaderCircle,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionLinks } from "@/lib/scan-session-links";
import type { ScanRunStatus, ScanSessionPreset } from "@/lib/types";

type ScanSessionPreviewProps = {
  preset: ScanSessionPreset;
};

const statusLabelMap: Record<ScanRunStatus, string> = {
  draft: "Draft",
  queued: "Queued",
  running: "Running",
  completed: "Completed",
};

const flowSteps: ScanRunStatus[] = ["draft", "queued", "running", "completed"];

const statusBadgeVariantMap: Record<
  ScanRunStatus,
  "secondary" | "outline" | "default"
> = {
  draft: "outline",
  queued: "secondary",
  running: "default",
  completed: "secondary",
};

function getStatusIcon(status: ScanRunStatus) {
  switch (status) {
    case "draft":
      return <TimerReset className="size-4" />;
    case "queued":
      return <Clock3 className="size-4" />;
    case "running":
      return <LoaderCircle className="size-4 animate-spin" />;
    case "completed":
      return <ShieldCheck className="size-4" />;
  }
}

function getStepState(current: ScanRunStatus, step: ScanRunStatus) {
  const currentIndex = flowSteps.indexOf(current);
  const stepIndex = flowSteps.indexOf(step);

  if (stepIndex < currentIndex) {
    return "done";
  }

  if (stepIndex === currentIndex) {
    return "current";
  }

  return "upcoming";
}

export function ScanSessionPreview({ preset }: ScanSessionPreviewProps) {
  const links = getSessionLinks(preset);

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold">
            Session preview
          </CardTitle>

          <Badge
            variant={statusBadgeVariantMap[preset.status]}
            className="gap-1.5"
          >
            {getStatusIcon(preset.status)}
            {statusLabelMap[preset.status]}
          </Badge>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          {preset.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Scan flow
          </p>

          <div className="mt-3 space-y-3">
            {flowSteps.map((step) => {
              const state = getStepState(preset.status, step);

              return (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={[
                      "flex size-8 items-center justify-center rounded-full border",
                      state === "done"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : state === "current"
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border/60 bg-background/50 text-muted-foreground",
                    ].join(" ")}
                  >
                    {state === "done" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      getStatusIcon(step)
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium capitalize text-foreground">
                      {statusLabelMap[step]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step === "draft" && "Configuration prepared"}
                      {step === "queued" && "Waiting for worker allocation"}
                      {step === "running" && "Analysis currently in progress"}
                      {step === "completed" && "Results ready to review"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Project
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {preset.projectName}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Estimated time
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {preset.estimatedDuration}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Target
          </p>

          <div className="mt-2 flex items-start gap-2">
            <FolderGit2 className="mt-0.5 size-4 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-medium capitalize text-foreground">
                {preset.targetType}
              </p>
              <p className="wrap-break-word text-sm text-muted-foreground">
                {preset.targetValue}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Scan scope
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {preset.includeSecrets ? (
              <Badge variant="outline">Secrets</Badge>
            ) : null}
            {preset.includeDependencies ? (
              <Badge variant="outline">Dependencies</Badge>
            ) : null}
            {preset.includeConfiguration ? (
              <Badge variant="outline">Configuration</Badge>
            ) : null}
          </div>
        </div>

        {preset.status === "completed" ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-primary/20 bg-primary/8 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <CheckCircle2 className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Scan completed successfully
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Demo session linked to{" "}
                    <span className="font-medium text-foreground">
                      {links.scanId}
                    </span>
                    . You can now continue into the detailed scan or stakeholder
                    report flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button asChild className="w-full gap-2">
                <Link href={links.scanHref}>
                  View scan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full gap-2">
                <Link href={links.reportHref}>
                  Open report
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <Button asChild variant="ghost" className="w-full gap-2">
              <Link href="/dashboard">
                Back to dashboard
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/30 p-4 text-sm text-muted-foreground">
            Advance the session state from the form to simulate a full scan
            lifecycle for the demo.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

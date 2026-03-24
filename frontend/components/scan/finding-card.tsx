import { FileCode2, ShieldAlert } from "lucide-react";

import { FindingStatusBadge } from "@/components/scan/finding-status-badge";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScanFinding } from "@/lib/types";

export function FindingCard({ finding }: { finding: ScanFinding }) {
  return (
    <Card className="panel min-w-0 rounded-3xl border-border/70">
      <CardHeader className="space-y-4 p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={finding.severity} />
              <FindingStatusBadge status={finding.status} />

              {finding.cwe ? (
                <span className="rounded-full border border-border/60 bg-card/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {finding.cwe}
                </span>
              ) : null}
            </div>

            <CardTitle className="wrap-break-word text-lg leading-7 tracking-tight md:text-xl">
              {finding.title}
            </CardTitle>
          </div>

          {finding.confidence ? (
            <div className="w-fit rounded-2xl border border-border/60 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
              Confidence:{" "}
              <span className="font-medium capitalize text-foreground">
                {finding.confidence}
              </span>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5 pt-0 md:p-6 md:pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <FileCode2 className="size-4 shrink-0 text-primary" />
              Description
            </div>
            <p className="wrap-break-word text-sm leading-6 text-muted-foreground">
              {finding.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldAlert className="size-4 shrink-0 text-accent" />
              Impact
            </div>
            <p className="wrap-break-word text-sm leading-6 text-muted-foreground">
              {finding.impact ?? "Impact analysis not yet provided."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              File
            </p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {finding.filePath}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Line
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {finding.line || "N/A"}
            </p>
          </div>

          {finding.ruleId ? (
            <div className="min-w-0 sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Rule
              </p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
                {finding.ruleId}
              </p>
            </div>
          ) : null}
        </div>

        {finding.codeSnippet ? (
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80">
            <div className="border-b border-border/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Evidence
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-words p-4 text-sm leading-6 text-foreground">
              <code className="wrap-break-words">{finding.codeSnippet}</code>
            </pre>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

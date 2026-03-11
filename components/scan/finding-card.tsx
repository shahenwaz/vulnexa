import { FileCode2, ShieldAlert } from "lucide-react";

import { FindingStatusBadge } from "@/components/scan/finding-status-badge";
import { SeverityBadge } from "@/components/scan/severity-badge";
import type { ScanFinding } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FindingCard({ finding }: { finding: ScanFinding }) {
  return (
    <Card className="panel rounded-3xl border-border/70">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={finding.severity} />
              <FindingStatusBadge status={finding.status} />
              {finding.cwe ? (
                <span className="rounded-full border border-border/60 bg-card/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {finding.cwe}
                </span>
              ) : null}
            </div>

            <CardTitle className="text-xl tracking-tight">
              {finding.title}
            </CardTitle>
          </div>

          {finding.confidence ? (
            <div className="rounded-2xl border border-border/60 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
              Confidence:{" "}
              <span className="font-medium capitalize text-foreground">
                {finding.confidence}
              </span>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldAlert className="size-4 text-primary" />
              Description
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {finding.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <FileCode2 className="size-4 text-accent" />
              Impact
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {finding.impact ?? "Impact analysis not yet provided."}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">File:</span>{" "}
              {finding.filePath}
            </span>
            <span>
              <span className="font-medium text-foreground">Line:</span>{" "}
              {finding.line || "N/A"}
            </span>
            {finding.ruleId ? (
              <span>
                <span className="font-medium text-foreground">Rule:</span>{" "}
                {finding.ruleId}
              </span>
            ) : null}
          </div>
        </div>

        {finding.codeSnippet ? (
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black/20">
            <div className="border-b border-border/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Evidence
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-6 text-foreground">
              <code>{finding.codeSnippet}</code>
            </pre>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

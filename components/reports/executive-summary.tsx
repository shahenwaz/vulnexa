import { AlertTriangle, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getHighestSeverity,
  getOpenFindingsCount,
  getResolvedFindingsCount,
  getReviewingFindingsCount,
} from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type ExecutiveSummaryProps = {
  result: ScanResult;
};

export function ExecutiveSummary({ result }: ExecutiveSummaryProps) {
  const highestSeverity = getHighestSeverity(result);
  const openCount = getOpenFindingsCount(result.findings);
  const reviewingCount = getReviewingFindingsCount(result.findings);
  const resolvedCount = getResolvedFindingsCount(result.findings);

  return (
    <Card className="panel-glow print:break-inside-avoid">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl">Executive summary</CardTitle>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          The current prototype scan found{" "}
          <span className="font-medium text-foreground">
            {result.totalFindings} total findings
          </span>{" "}
          across{" "}
          <span className="font-medium text-foreground">
            {result.totalFiles}
          </span>{" "}
          files. The highest detected severity is{" "}
          <span className="align-middle">
            <SeverityBadge severity={highestSeverity} />
          </span>
          . Immediate attention should focus on open critical and high-risk
          findings before wider remediation and validation work.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="size-4" />
            Highest severity
          </div>
          <div className="mt-3">
            <SeverityBadge severity={highestSeverity} />
          </div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="size-4" />
            Open findings
          </div>
          <p className="mt-3 text-2xl font-semibold">{openCount}</p>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="size-4" />
            Under review
          </div>
          <p className="mt-3 text-2xl font-semibold">{reviewingCount}</p>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4" />
            Resolved
          </div>
          <p className="mt-3 text-2xl font-semibold">{resolvedCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}

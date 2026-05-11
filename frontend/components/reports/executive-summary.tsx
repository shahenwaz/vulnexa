import { FileCode2, ShieldAlert, TriangleAlert } from "lucide-react";

import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHighestSeverity } from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type ExecutiveSummaryProps = {
  result: ScanResult;
};

export function ExecutiveSummary({ result }: ExecutiveSummaryProps) {
  const highestSeverity = getHighestSeverity(result);

  return (
    <Card className="panel-glow print:break-inside-avoid">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl">Executive summary</CardTitle>
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
          Vulnexa analysed{" "}
          <span className="font-medium text-foreground">
            {result.totalFiles}
          </span>{" "}
          file{result.totalFiles === 1 ? "" : "s"} and identified{" "}
          <span className="font-medium text-foreground">
            {result.totalFindings}
          </span>{" "}
          potential security finding{result.totalFindings === 1 ? "" : "s"}.
          The highest detected severity is{" "}
          <span className="align-middle">
            <SeverityBadge severity={highestSeverity} />
          </span>
          . The report below translates the technical results into business impact
          and lists the findings that need remediation.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TriangleAlert className="size-4" />
            Findings
          </div>
          <p className="mt-3 text-2xl font-semibold">
            {result.totalFindings}
          </p>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileCode2 className="size-4" />
            Files analysed
          </div>
          <p className="mt-3 text-2xl font-semibold">{result.totalFiles}</p>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="size-4" />
            Highest severity
          </div>
          <div className="mt-3">
            <SeverityBadge severity={highestSeverity} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { BriefcaseBusiness, ClipboardCheck, UsersRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScanResult } from "@/lib/types";

type ManagementReportProps = {
  result: ScanResult;
};

function ReportList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ManagementReport({ result }: ManagementReportProps) {
  const report = result.businessReport;

  if (!report) {
    return null;
  }

  return (
    <Card className="panel-glow-cyan print:break-inside-avoid">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Management report
          </span>
          <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
            {report.profileLabel}
          </span>
          <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Business risk: {report.riskLevel}
          </span>
        </div>

        <CardTitle className="text-xl">Business-level risk translation</CardTitle>

        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
          {report.executiveSummary}
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <BriefcaseBusiness className="size-4 text-primary" />
            Business impact
          </div>
          <ReportList items={report.businessImpact} />
        </div>

        <div className="rounded-2xl border p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <UsersRound className="size-4 text-primary" />
            Customer impact
          </div>
          <ReportList items={report.customerImpact} />
        </div>

        <div className="rounded-2xl border p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <ClipboardCheck className="size-4 text-primary" />
            Priority recommendation
          </div>
          <ReportList items={report.priorityRecommendation} />
        </div>
      </CardContent>
    </Card>
  );
}

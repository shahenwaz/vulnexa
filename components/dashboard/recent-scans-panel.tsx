import Link from "next/link";
import { ArrowUpRight, Clock3, FolderGit2 } from "lucide-react";

import { ScanStatusBadge } from "@/components/scan/scan-status-badge";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScanDate } from "@/lib/format";
import { mockScanHistory } from "@/lib/mock-data";

export function RecentScansPanel() {
  return (
    <Card className="panel rounded-3xl border-border/70">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl tracking-tight">Recent scans</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Recent prototype scan sessions and their latest state
          </p>
        </div>

        <Link
          href="/scans/new"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          New scan
          <ArrowUpRight className="size-4" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        {mockScanHistory.map((scan) => (
          <Link
            key={scan.scanId}
            href={`/scans/${scan.scanId}`}
            className="block cursor-pointer rounded-2xl border border-border/60 bg-secondary/25 p-4 transition hover:border-primary/20 hover:bg-secondary/40"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {scan.projectName}
                  </h3>
                  <ScanStatusBadge status={scan.status} />
                  <SeverityBadge severity={scan.highestSeverity} />
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <FolderGit2 className="size-4" />
                    {scan.totalFiles} files
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" />
                    {formatScanDate(scan.scannedAt)}
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground lg:text-right">
                <p className="font-medium text-foreground">
                  {scan.totalFindings} findings
                </p>
                <p className="mt-1">Scan ID: {scan.scanId}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { ArrowUpRight, Clock3, FileText, FolderGit2 } from "lucide-react";

import { ScanStatusBadge } from "@/components/scan/scan-status-badge";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScanDate } from "@/lib/format";
import { getRecentScans } from "@/lib/mock-data";

export function RecentScansPanel() {
  const scans = getRecentScans();

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">Recent scans</CardTitle>
          <p className="text-sm text-muted-foreground">
            Recent prototype scan sessions and their latest state.
          </p>
        </div>

        <Link
          href="/scans/scan_001"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
        >
          New scan
          <ArrowUpRight className="size-4" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        {scans.map((scan) => (
          <div
            key={scan.scanId}
            className="rounded-2xl border border-border/60 bg-background/40 p-4"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <ScanStatusBadge status={scan.status} />
                  <SeverityBadge severity={scan.highestSeverity} />
                </div>

                <div className="space-y-1">
                  <h3 className="truncate text-base font-semibold text-foreground">
                    {scan.projectName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scan ID: {scan.scanId}
                  </p>
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

                  <span>{scan.totalFindings} findings</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href={`/scans/${scan.scanId}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  View scan
                  <ArrowUpRight className="size-4" />
                </Link>

                <Link
                  href={`/reports/${scan.scanId}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  <FileText className="size-4" />
                  Report
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

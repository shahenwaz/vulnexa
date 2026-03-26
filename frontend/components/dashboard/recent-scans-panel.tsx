import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  FileText,
  Folder,
  FolderGit2,
  Link2,
  Package,
} from "lucide-react";

import { ScanStatusBadge } from "@/components/scan/scan-status-badge";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BackendScanListItem } from "@/lib/api/backend-types";
import {
  getBackendScanDisplayName,
  getBackendSourceLabel,
  getHighestSeverityFromSummary,
  mapBackendStatusToUiStatus,
} from "@/lib/api/backend-mappers";
import { formatScanDate } from "@/lib/format";

type RecentScansPanelProps = {
  scans: BackendScanListItem[];
};

function getSourceIcon(scan: BackendScanListItem) {
  if (scan.repo_url || scan.source_type === "repo_url") {
    return Link2;
  }

  if (scan.uploaded_file_name || scan.source_type === "zip_upload") {
    return Package;
  }

  return Folder;
}

export function RecentScansPanel({ scans }: RecentScansPanelProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">Recent scans</CardTitle>
          <p className="text-sm text-muted-foreground">
            Saved scans and their latest backend scan summaries.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {scans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/30 p-5 text-sm text-muted-foreground">
            No saved scans yet. Start a new scan to see history here.
          </div>
        ) : null}

        {scans.map((scan) => {
          const SourceIcon = getSourceIcon(scan);

          return (
            <div
              key={scan.scan_id}
              className="rounded-2xl border border-border/60 bg-background/40 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ScanStatusBadge
                      status={mapBackendStatusToUiStatus(scan.status)}
                    />
                    <SeverityBadge
                      severity={getHighestSeverityFromSummary(scan.summary)}
                    />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <SourceIcon className="size-3.5" />
                      {getBackendSourceLabel(scan)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="truncate text-base font-semibold text-foreground">
                      {getBackendScanDisplayName(scan)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {scan.scan_id}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <FolderGit2 className="size-4" />
                      {scan.scanned_files ?? 0} files
                    </span>

                    <span>{scan.summary.total_findings} findings</span>

                    {scan.scanned_at ? (
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="size-4" />
                        {formatScanDate(scan.scanned_at)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/scans/${scan.scan_id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    View scan
                    <ArrowUpRight className="size-4" />
                  </Link>

                  <Link
                    href={`/reports/${scan.scan_id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileText className="size-4" />
                    Report
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

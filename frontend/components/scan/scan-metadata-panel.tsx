import {
  Clock3,
  FileCode2,
  FolderGit2,
  HardDrive,
  Link2,
  ShieldCheck,
} from "lucide-react";

import {
  ScanStatusBadge,
  type ScanStatus,
} from "@/components/scan/scan-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBackendSourceLabel } from "@/lib/api/backend-mappers";
import { formatScanDate } from "@/lib/format";
import type { ScanResult } from "@/lib/types";

type ScanMetadataPanelProps = {
  result: ScanResult;
};

function getMetadataBadgeStatus(status?: ScanResult["status"]): ScanStatus {
  switch (status) {
    case "queued":
      return "queued";
    case "running":
      return "running";
    case "completed":
      return "completed";
    case "draft":
    default:
      return "queued";
  }
}

export function ScanMetadataPanel({ result }: ScanMetadataPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scan metadata</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <div className="rounded-2xl border bg-background/70 p-2">
            <FolderGit2 className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Project
            </p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {result.projectName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <div className="rounded-2xl border bg-background/70 p-2">
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Status
            </p>
            <div className="mt-2">
              <ScanStatusBadge status={getMetadataBadgeStatus(result.status)} />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <div className="rounded-2xl border bg-background/70 p-2">
            <Clock3 className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Scanned at
            </p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {formatScanDate(result.scannedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <div className="rounded-2xl border bg-background/70 p-2">
            <FileCode2 className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Files scanned
            </p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {result.totalFiles}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <div className="rounded-2xl border bg-background/70 p-2">
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Scan ID
            </p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {result.scanId}
            </p>
          </div>
        </div>

        {result.sourceType ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <FolderGit2 className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Source
              </p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
                {getBackendSourceLabel({
                  source_type: result.sourceType,
                  repo_url: result.repoUrl,
                  uploaded_file_name: result.uploadedFileName,
                })}
              </p>
            </div>
          </div>
        ) : null}

        {result.target ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <HardDrive className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Target path
              </p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
                {result.target}
              </p>
            </div>
          </div>
        ) : null}

        {result.repoUrl ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <Link2 className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Repository URL
              </p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {result.repoUrl}
              </p>
            </div>
          </div>
        ) : null}

        {result.savedTo ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <HardDrive className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Saved result file
              </p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {result.savedTo}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

import {
  Clock3,
  FileArchive,
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

function getPrimaryTargetDetails(result: ScanResult): {
  label: string;
  value: string;
  icon: typeof HardDrive;
} | null {
  if (result.sourceType === "zip_upload" && result.uploadedFileName) {
    return {
      label: "Uploaded file",
      value: result.uploadedFileName,
      icon: FileArchive,
    };
  }

  if (result.sourceType === "local_directory" && result.target) {
    return {
      label: "Target path",
      value: result.target,
      icon: HardDrive,
    };
  }

  return null;
}

function getSecondaryTargetDetails(result: ScanResult): {
  label: string;
  value: string;
  icon: typeof HardDrive;
} | null {
  if (result.sourceType === "zip_upload" && result.target) {
    return {
      label: "Extracted folder",
      value: result.target,
      icon: HardDrive,
    };
  }

  return null;
}

export function ScanMetadataPanel({ result }: ScanMetadataPanelProps) {
  const primaryTargetDetails = getPrimaryTargetDetails(result);
  const secondaryTargetDetails = getSecondaryTargetDetails(result);

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
            <p className="mt-1 text-sm font-medium text-foreground">
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
            <p className="mt-1 text-sm font-medium text-foreground">
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

        {primaryTargetDetails ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <primaryTargetDetails.icon className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {primaryTargetDetails.label}
              </p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
                {primaryTargetDetails.value}
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
                Repository
              </p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {result.repoUrl}
              </p>
            </div>
          </div>
        ) : null}

        {secondaryTargetDetails ? (
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <div className="rounded-2xl border bg-background/70 p-2">
              <secondaryTargetDetails.icon className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {secondaryTargetDetails.label}
              </p>
              <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                {secondaryTargetDetails.value}
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

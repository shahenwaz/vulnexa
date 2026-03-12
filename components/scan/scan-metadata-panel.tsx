import { Clock3, FileCode2, FolderGit2, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScanDate } from "@/lib/format";
import type { ScanResult } from "@/lib/types";

type ScanMetadataPanelProps = {
  result: ScanResult;
};

const metadataItems = [
  {
    key: "project",
    label: "Project",
    icon: FolderGit2,
    getValue: (result: ScanResult) => result.projectName,
  },
  {
    key: "files",
    label: "Files scanned",
    icon: FileCode2,
    getValue: (result: ScanResult) => String(result.totalFiles),
  },
  {
    key: "scannedAt",
    label: "Scanned at",
    icon: Clock3,
    getValue: (result: ScanResult) => formatScanDate(result.scannedAt),
  },
  {
    key: "scanId",
    label: "Scan ID",
    icon: ShieldCheck,
    getValue: (result: ScanResult) => result.scanId,
  },
];

export function ScanMetadataPanel({ result }: ScanMetadataPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scan metadata</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {metadataItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-start gap-3 rounded-2xl border p-4"
            >
              <div className="rounded-2xl border bg-background/70 p-2">
                <Icon className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
                  {item.getValue(result)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

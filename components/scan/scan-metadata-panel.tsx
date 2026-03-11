import { Clock3, FileCode2, FolderGit2, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScanDate } from "@/lib/format";
import { mockScanResult } from "@/lib/mock-data";

export function ScanMetadataPanel() {
  return (
    <Card className="panel rounded-3xl border-border/70">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent/10">
          <ShieldCheck className="size-6 text-accent" />
        </div>
        <CardTitle className="text-xl tracking-tight">Scan metadata</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <FolderGit2 className="size-4 text-primary" />
            <span className="font-medium text-foreground">Project</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {mockScanResult.projectName}
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <FileCode2 className="size-4 text-primary" />
            <span className="font-medium text-foreground">Files scanned</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {mockScanResult.totalFiles}
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock3 className="size-4 text-primary" />
            <span className="font-medium text-foreground">Scanned at</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {formatScanDate(mockScanResult.scannedAt)}
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-secondary/25 p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            <span className="font-medium text-foreground">Scan ID</span>
          </div>
          <p className="mt-2 break-all text-sm leading-6 text-muted-foreground">
            {mockScanResult.scanId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

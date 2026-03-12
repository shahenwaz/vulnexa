"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatScanDate } from "@/lib/format";
import type { ScanResult } from "@/lib/types";

type ReportHeaderProps = {
  result: ScanResult;
};

export function ReportHeader({ result }: ReportHeaderProps) {
  return (
    <div className="panel-glow space-y-6 p-6 md:p-8 print:shadow-none">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground print:hidden"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Security report
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {result.projectName}
            </h1>

            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Executive scan report prepared for frontend prototype review. This
              page is structured to support future export and printable report
              generation.
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center gap-3 print:hidden"
          data-print-hidden="true"
        >
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print report
          </Button>

          <Button disabled>
            <Download className="size-4" />
            Export PDF later
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Scan ID
          </p>
          <p className="mt-2 font-medium">{result.scanId}</p>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Scanned at
          </p>
          <p className="mt-2 font-medium">{formatScanDate(result.scannedAt)}</p>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Files analyzed
          </p>
          <p className="mt-2 font-medium">{result.totalFiles}</p>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Findings
          </p>
          <p className="mt-2 font-medium">{result.totalFindings}</p>
        </div>
      </div>
    </div>
  );
}

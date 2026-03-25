import { cn } from "@/lib/utils";
import type { ScanRunStatus } from "@/lib/types";

export type ScanStatus = Exclude<ScanRunStatus, "draft">;

const statusStyles: Record<ScanStatus, string> = {
  queued: "border-border/60 bg-muted/40 text-muted-foreground",
  running: "border-primary/20 bg-primary/10 text-primary",
  completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

const statusLabels: Record<ScanStatus, string> = {
  queued: "Queued",
  running: "Running",
  completed: "Completed",
};

export function ScanStatusBadge({ status }: { status: ScanStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

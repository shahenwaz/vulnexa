import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ScanStatus = "completed" | "queued" | "draft";

const statusClassMap: Record<ScanStatus, string> = {
  completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  queued: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  draft: "border-slate-500/20 bg-slate-500/10 text-slate-300",
};

export function ScanStatusBadge({ status }: { status: ScanStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize border px-2.5 py-1 text-xs font-medium",
        statusClassMap[status],
      )}
    >
      {status}
    </Badge>
  );
}

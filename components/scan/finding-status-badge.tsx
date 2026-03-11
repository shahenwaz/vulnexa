import type { FindingStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusClassMap: Record<FindingStatus, string> = {
  open: "border-red-500/20 bg-red-500/10 text-red-300",
  reviewing: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  resolved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

export function FindingStatusBadge({ status }: { status: FindingStatus }) {
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

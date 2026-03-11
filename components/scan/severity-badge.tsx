import type { Severity } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityClassMap: Record<Severity, string> = {
  critical: "badge-critical",
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
  info: "badge-info",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <Badge
      className={cn(
        "capitalize border-transparent px-2.5 py-1 text-xs font-medium",
        severityClassMap[severity],
      )}
    >
      {severity}
    </Badge>
  );
}

import type { Severity } from "@/lib/types";
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
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        severityClassMap[severity],
      )}
    >
      {severity}
    </span>
  );
}

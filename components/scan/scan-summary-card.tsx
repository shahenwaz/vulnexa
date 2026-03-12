import { cn } from "@/lib/utils";

type ScanSummaryCardProps = {
  label: string;
  value: string;
  tone?: "default" | "critical" | "high" | "medium" | "muted";
};

const toneClassMap: Record<
  NonNullable<ScanSummaryCardProps["tone"]>,
  string
> = {
  default: "border-border/70 bg-card/70",
  critical: "border-red-500/20 bg-red-500/10",
  high: "border-orange-500/20 bg-orange-500/10",
  medium: "border-amber-500/20 bg-amber-500/10",
  muted: "border-border/70 bg-card/70",
};

export function ScanSummaryCard({
  label,
  value,
  tone = "default",
}: ScanSummaryCardProps) {
  return (
    <div
      className={cn("rounded-3xl border p-5 transition", toneClassMap[tone])}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

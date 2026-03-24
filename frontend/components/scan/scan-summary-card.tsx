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
      className={cn(
        "min-w-0 rounded-2xl border px-3 py-3 sm:px-4 sm:py-3.5 lg:min-h-27",
        toneClassMap[tone],
      )}
    >
      <p className="text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-muted-foreground sm:text-[11px]">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

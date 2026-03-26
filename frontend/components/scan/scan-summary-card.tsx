import { cn } from "@/lib/utils";

type ScanSummaryTone = "default" | "critical" | "high" | "medium" | "muted";

type ScanSummaryCardProps = {
  label: string;
  value: string;
  tone?: ScanSummaryTone;
};

const toneClasses: Record<ScanSummaryTone, string> = {
  default: "border-border/60 bg-background/40",
  critical: "border-red-500/30 bg-red-500/10",
  high: "border-orange-500/30 bg-orange-500/10",
  medium: "border-amber-500/30 bg-amber-500/10",
  muted: "border-border/50 bg-background/25",
};

export function ScanSummaryCard({
  label,
  value,
  tone = "default",
}: ScanSummaryCardProps) {
  return (
    <div
      className={cn("min-w-0 rounded-2xl border p-3 sm:p-4", toneClasses[tone])}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
        <span className="line-clamp-2 block min-h-[2.1rem] leading-4">
          {label}
        </span>
      </p>
      <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

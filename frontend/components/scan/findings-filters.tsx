"use client";

import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

type FindingsFiltersProps = {
  value: Severity | "all";
  onChange: (value: Severity | "all") => void;
};

const filterOptions: Array<{
  label: string;
  value: Severity | "all";
}> = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export function FindingsFilters({ value, onChange }: FindingsFiltersProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-1.5 rounded-2xl border border-border/60 bg-card/40 p-1.5 sm:gap-2 sm:p-2">
        {filterOptions.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex h-8 items-center rounded-lg border px-2.5 text-xs font-medium whitespace-nowrap transition sm:h-9 sm:px-3 sm:text-sm cursor-pointer",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

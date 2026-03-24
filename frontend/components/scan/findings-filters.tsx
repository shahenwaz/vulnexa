"use client";

import type { Severity } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FindingsFiltersProps = {
  value: Severity | "all";
  onChange: (value: Severity | "all") => void;
};

const filterItems: Array<{ value: Severity | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "info", label: "Info" },
];

export function FindingsFilters({ value, onChange }: FindingsFiltersProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Severity | "all")}>
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-border/60 bg-background/40 p-2">
        {filterItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="h-9 rounded-xl border border-border/60 bg-card/70 px-3 text-xs font-medium whitespace-nowrap data-[state=active]:border-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

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
      <TabsList className="mb-0 flex h-auto w-full flex-wrap justify-start gap-2 rounded-none border-0 bg-transparent p-0">
        {filterItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="cursor-pointer rounded-xl border border-border/60 bg-card/70 px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

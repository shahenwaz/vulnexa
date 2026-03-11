import {
  AlertCircle,
  AlertTriangle,
  FileWarning,
  Info,
  ShieldAlert,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockScanResult } from "@/lib/mock-data";

const severityCards = [
  {
    label: "Critical",
    value: mockScanResult.severityCounts.critical,
    icon: ShieldAlert,
    className: "badge-critical",
  },
  {
    label: "High",
    value: mockScanResult.severityCounts.high,
    icon: AlertTriangle,
    className: "badge-high",
  },
  {
    label: "Medium",
    value: mockScanResult.severityCounts.medium,
    icon: AlertCircle,
    className: "badge-medium",
  },
  {
    label: "Low",
    value: mockScanResult.severityCounts.low,
    icon: FileWarning,
    className: "badge-low",
  },
  {
    label: "Info",
    value: mockScanResult.severityCounts.info,
    icon: Info,
    className: "badge-info",
  },
];

export function SeverityOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {severityCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label} className="panel rounded-3xl border-border/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <div className={`rounded-xl px-2 py-2 ${item.className}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold tracking-tight">
                {item.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Findings in current demo scan
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

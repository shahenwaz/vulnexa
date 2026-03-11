import Link from "next/link";
import { FileText, Plus, ShieldCheck, WandSparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Start a new scan",
    description: "Prepare a fresh upload and scan workflow for a project.",
    href: "/scans/new",
    icon: Plus,
  },
  {
    title: "Review demo results",
    description: "Open the mock scan result page and inspect findings.",
    href: "/scans/scan_001",
    icon: ShieldCheck,
  },
  {
    title: "Open security report",
    description:
      "Review the executive summary, grouped findings, and remediation plan.",
    href: "/reports/scan_001",
    icon: FileText,
  },
];

export function QuickActionsPanel() {
  return (
    <Card className="panel-glow rounded-3xl border-border/70">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <WandSparkles className="size-6 text-primary" />
        </div>
        <CardTitle className="text-xl tracking-tight">Quick actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 transition hover:border-primary/20 hover:bg-card"
            >
              <div className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>

              <div>
                <p className="font-medium text-foreground">{action.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

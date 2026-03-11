import { Wrench } from "lucide-react";

import { mockScanResult } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RemediationPanel() {
  return (
    <Card className="panel-glow rounded-3xl border-border/70">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Wrench className="size-6 text-primary" />
        </div>
        <CardTitle className="text-xl tracking-tight">
          Remediation guidance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {mockScanResult.findings.slice(0, 3).map((finding) => (
          <div
            key={finding.id}
            className="rounded-2xl border border-border/60 bg-card/60 p-4"
          >
            <p className="text-sm font-medium text-foreground">
              {finding.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {finding.remediation}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

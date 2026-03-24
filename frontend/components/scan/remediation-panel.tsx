import { CheckCircle2, ShieldCheck, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopRemediationActions } from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type RemediationPanelProps = {
  result: ScanResult;
};

export function RemediationPanel({ result }: RemediationPanelProps) {
  const actions = getTopRemediationActions(result.findings).slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Remediation guidance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="size-4 shrink-0 text-primary" />
            Immediate focus
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Prioritize critical and high-severity issues first, then validate
            fixes with another scan run.
          </p>
        </div>

        <div className="space-y-3">
          {actions.map((action, index) => (
            <div
              key={`${action.remediation}-${index}`}
              className="rounded-2xl border p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border bg-background/70 p-2">
                  <Wrench className="size-4 shrink-0 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium">Action {index + 1}</p>
                    <span className="text-xs text-muted-foreground">
                      {action.count} finding{action.count > 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="mt-2 wrap-break-word text-sm leading-6 text-muted-foreground">
                    {action.remediation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
            <CheckCircle2 className="size-4 shrink-0" />
            Goal
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Reduce high-risk exposure and prepare a cleaner report outcome for
            the final project review.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

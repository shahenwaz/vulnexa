import { CheckCircle2, ListChecks, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopRemediationActions } from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type RemediationSummaryProps = {
  result: ScanResult;
};

export function RemediationSummary({ result }: RemediationSummaryProps) {
  const actions = getTopRemediationActions(result.findings);

  return (
    <Card className="print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="text-xl">Remediation summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4" />
              Priority focus
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Address critical and high severity findings first, then validate
              fixes with a follow-up scan.
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ListChecks className="size-4" />
              Validation
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Re-test query handling, output encoding, configuration safety, and
              secret management after remediation.
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4" />
              Expected result
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Reduced exposure, cleaner production configuration, and a more
              trustworthy report for the final project demo.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Suggested action list</h3>

          <div className="space-y-3">
            {actions.map((action, index) => (
              <div
                key={`${action.remediation}-${index}`}
                className="rounded-2xl border p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">Action {index + 1}</p>
                  <span className="text-xs text-muted-foreground">
                    Referenced by {action.count} finding
                    {action.count > 1 ? "s" : ""}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {action.remediation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

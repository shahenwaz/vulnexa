import { CheckCircle2, FileCode2, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const supportedItems = [
  "JavaScript / TypeScript",
  "Python source files",
  "Config and environment files",
  "Common web application patterns",
];

const workflowItems = [
  "Upload your source files",
  "Add project context and notes",
  "Run analysis when backend is ready",
  "Review findings and remediation",
];

export function ScanReadinessPanel() {
  return (
    <div className="space-y-4">
      <Card className="panel-glow rounded-3xl">
        <CardHeader className="pb-4">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck className="size-6 text-primary" />
          </div>
          <CardTitle className="text-xl tracking-tight">
            Scan readiness
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Frontend prototype ready
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  This page is prepared for backend scanner integration later,
                  with the upload and scan configuration flow already designed.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              Planned workflow
            </p>

            <div className="space-y-2">
              {workflowItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-3"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="panel rounded-3xl">
        <CardHeader className="pb-4">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent/10">
            <FileCode2 className="size-6 text-accent" />
          </div>
          <CardTitle className="text-xl tracking-tight">
            Planned support
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {supportedItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/60 bg-secondary/30 px-3 py-3 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

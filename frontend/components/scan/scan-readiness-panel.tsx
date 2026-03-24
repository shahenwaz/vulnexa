import { FileCode2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const supportedItems = [
  "JavaScript / TypeScript",
  "Python source files",
  "Config and environment files",
  "Common web application patterns",
];

export function ScanReadinessPanel() {
  return (
    <Card className="panel rounded-3xl">
      <CardHeader className="pb-4">
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent/10">
          <FileCode2 className="size-6 text-accent" />
        </div>
        <CardTitle className="text-xl tracking-tight">
          Planned support
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">
          Designed for common web application scan inputs and ready for backend
          integration in a later phase.
        </p>

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
  );
}

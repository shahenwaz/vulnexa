import { mockScanResult } from "@/lib/mock-data";
import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FindingsPreview() {
  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle className="text-xl tracking-tight">Findings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Mock data preview for frontend development
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {mockScanResult.findings.map((finding) => (
          <div
            key={finding.id}
            className="rounded-2xl border border-border/70 bg-secondary/35 p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">{finding.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {finding.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {finding.filePath}{" "}
                  {finding.line ? `• Line ${finding.line}` : ""}
                </p>
              </div>

              <SeverityBadge severity={finding.severity} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

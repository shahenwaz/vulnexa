import { mockScanResult } from "@/lib/mock-data";
import { SeverityBadge } from "@/components/scan/severity-badge";

export function FindingsPreview() {
  return (
    <div className="panel space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Findings</h2>
          <p className="text-sm text-muted-foreground">
            Mock data preview for frontend development
          </p>
        </div>
      </div>

      <div className="space-y-3">
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
      </div>
    </div>
  );
}

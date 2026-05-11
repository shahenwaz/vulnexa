import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { groupFindingsBySeverity } from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type GroupedFindingsProps = {
  result: ScanResult;
};

export function GroupedFindings({ result }: GroupedFindingsProps) {
  const groups = groupFindingsBySeverity(result.findings).filter(
    (group) => group.findings.length > 0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Grouped findings</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          Technical evidence for the report, grouped by severity. Each finding
          includes its location, CWE reference, matched code, and remediation
          guidance.
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {groups.length === 0 ? (
          <div className="rounded-2xl border p-5 text-sm leading-6 text-muted-foreground">
            No findings were detected by the selected scan rules.
          </div>
        ) : null}

        {groups.map((group) => (
          <section key={group.severity} className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <SeverityBadge severity={group.severity} />
              <p className="text-sm text-muted-foreground">
                {group.findings.length} finding
                {group.findings.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="space-y-4">
              {group.findings.map((finding) => (
                <article
                  key={finding.id}
                  className="rounded-2xl border bg-card/70 p-5 print:break-inside-avoid"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <SeverityBadge severity={finding.severity} />

                        {finding.cwe ? (
                          <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                            {finding.cwe}
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          {finding.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {finding.filePath}
                          {finding.line > 0 ? `:${finding.line}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <p className="text-sm font-medium">Why this matters</p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {finding.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2">
                    <p className="text-sm font-medium">Remediation guidance</p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {finding.remediation}
                    </p>
                  </div>

                  {finding.codeSnippet ? (
                    <div className="mt-5 space-y-2">
                      <p className="text-sm font-medium">
                        Relevant code snippet
                      </p>
                      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-words rounded-2xl border bg-background/80 p-4 text-xs leading-6 text-muted-foreground">
                        <code className="wrap-break-word">
                          {finding.codeSnippet}
                        </code>
                      </pre>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

import { SeverityBadge } from "@/components/scan/severity-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSeverityOrder } from "@/lib/report";
import type { ScanResult } from "@/lib/types";

type SeveritySummaryTableProps = {
  result: ScanResult;
};

export function SeveritySummaryTable({ result }: SeveritySummaryTableProps) {
  const rows = getSeverityOrder().map((severity) => ({
    severity,
    count: result.severityCounts[severity],
    percentage:
      result.totalFindings === 0
        ? 0
        : Math.round(
            (result.severityCounts[severity] / result.totalFindings) * 100,
          ),
  }));

  return (
    <Card className="print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="text-xl">Severity table</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Count</th>
                <th className="px-4 py-3 font-medium">Share</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.severity} className="border-t">
                  <td className="px-4 py-3">
                    <SeverityBadge severity={row.severity} />
                  </td>
                  <td className="px-4 py-3 font-medium">{row.count}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

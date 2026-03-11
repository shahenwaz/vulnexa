type ScanSummaryCardProps = {
  label: string;
  value: string;
};

export function ScanSummaryCard({ label, value }: ScanSummaryCardProps) {
  return (
    <div className="panel p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

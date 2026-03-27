import { BackendUnavailableState } from "@/components/shared/backend-unavailable-state";
import { EmptyStatePanel } from "@/components/dashboard/empty-state-panel";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { RecentScansPanel } from "@/components/dashboard/recent-scans-panel";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";
import { getSavedScans } from "@/lib/api/scan-service";
import type { BackendScanListResponse } from "@/lib/api/backend-types";

export default async function DashboardPage() {
  let data: BackendScanListResponse | null = null;

  try {
    data = await getSavedScans();
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <BackendUnavailableState
        title="Dashboard is temporarily unavailable"
        description="Vulnexa could not load saved scans from the backend. Make sure the backend server is running, then refresh and try again."
      />
    );
  }

  const { scans } = data;

  return (
    <Section className="pt-10 md:pt-14">
      <Container className="space-y-10">
        <PageIntro
          eyebrow="Dashboard"
          title="Monitor vulnerability assessment activity"
          description="Review recent vulnerability scans, open saved reports, and prepare the next project review through a cleaner product-style dashboard."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px] xl:items-start">
          <div className="space-y-6">
            <RecentScansPanel scans={scans} />
            {scans.length === 0 ? <EmptyStatePanel /> : null}
          </div>

          <div className="xl:sticky xl:top-24">
            <QuickActionsPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}

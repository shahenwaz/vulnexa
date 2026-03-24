import { EmptyStatePanel } from "@/components/dashboard/empty-state-panel";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { RecentScansPanel } from "@/components/dashboard/recent-scans-panel";
import { SeverityOverview } from "@/components/dashboard/severity-overview";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";

export default function DashboardPage() {
  return (
    <Section className="pt-10 md:pt-14">
      <Container className="space-y-10">
        <PageIntro
          eyebrow="Dashboard"
          title="Monitor vulnerability assessment activity"
          description="Review scan severity at a glance, jump into recent scan sessions, and prepare the next project review through a cleaner product-style dashboard."
        />

        <SeverityOverview />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px] xl:items-start">
          <div className="space-y-6">
            <RecentScansPanel />
            <EmptyStatePanel />
          </div>

          <div className="xl:sticky xl:top-24">
            <QuickActionsPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}

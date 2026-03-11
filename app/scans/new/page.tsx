import { ScanReadinessPanel } from "@/components/scan/scan-readiness-panel";
import { UploadPanel } from "@/components/scan/upload-panel";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";

export default function NewScanPage() {
  return (
    <Section className="pt-10 md:pt-14">
      <Container className="space-y-10">
        <PageIntro
          eyebrow="New scan"
          title="Prepare a source code scan"
          description="Set up your upload and scan context in a clean workflow designed for vulnerability assessment, remediation review, and later backend integration."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px] xl:items-start">
          <div>
            <UploadPanel />
          </div>

          <div className="xl:sticky xl:top-24">
            <ScanReadinessPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}

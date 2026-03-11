import { UploadPanel } from "@/components/scan/upload-panel";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export default function NewScanPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="New scan"
          title="Prepare a source code scan"
          description="This page is ready for the backend integration phase. For now, it presents the full upload workflow and scan intent clearly."
        />
        <UploadPanel />
      </Container>
    </Section>
  );
}

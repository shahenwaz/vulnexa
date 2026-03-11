import { UploadPanel } from "@/components/scan/upload-panel";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";

export default function NewScanPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <PageIntro
          eyebrow="New scan"
          title="Prepare a source code scan"
          description="This page is ready for backend integration later. For now, it presents the upload workflow and scan details in a clean frontend form."
        />
        <UploadPanel />
      </Container>
    </Section>
  );
}

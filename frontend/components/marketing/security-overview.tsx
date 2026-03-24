import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function SecurityOverview() {
  return (
    <Section>
      <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Planned analysis scope"
          title="Frontend now, scanner engine next"
          description="This week focuses on a polished, responsive frontend workflow. The backend scanner and rule engine will connect into the same UI later."
        />

        <div className="panel-glow p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="panel-muted p-4">
              <p className="text-sm font-medium text-foreground">
                Upcoming checks
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Hardcoded secrets, injection patterns, XSS risk, insecure
                config, weak auth logic, and reporting support.
              </p>
            </div>

            <div className="panel-muted p-4">
              <p className="text-sm font-medium text-foreground">
                Future enrichments
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                CWE references, CVSS-style scoring, downloadable reports, and
                optional local LLM explanations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

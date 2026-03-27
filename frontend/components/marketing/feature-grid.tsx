import { FileSearch, FileWarning, ShieldAlert, Wrench } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    title: "Source code review workflow",
    description:
      "Upload project files and review findings through a focused dashboard experience.",
    icon: FileSearch,
  },
  {
    title: "Severity-based triage",
    description: "Separate critical, high, medium and low findings clearly.",
    icon: ShieldAlert,
  },
  {
    title: "Developer-friendly remediation",
    description:
      "Every finding includes plain-English context and a suggested fix direction.",
    icon: Wrench,
  },
  {
    title: "Report-oriented presentation",
    description:
      "Results are structured so the final reporting feature fits naturally later.",
    icon: FileWarning,
  },
];

export function FeatureGrid() {
  return (
    <Section>
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Core features"
          title="Built to feel practical, not just academic"
          description="The frontend is designed to support scanning, triage, explanation, and reporting in a clean workflow."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="panel p-5">
                <div className="panel-glow-cyan mb-4 flex size-11 items-center justify-center rounded-2xl">
                  <Icon className="size-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

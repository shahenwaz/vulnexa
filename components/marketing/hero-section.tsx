import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";

const stats = [
  {
    label: "Mock scan coverage",
    value: "42 files",
    hint: "Prototype demo data",
  },
  {
    label: "Detected findings",
    value: "5",
    hint: "Across multiple severities",
  },
  {
    label: "Critical issues",
    value: "1",
    hint: "Immediate attention required",
  },
  {
    label: "Report ready",
    value: "Yes",
    hint: "Structured result UI prepared",
  },
];

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <PageIntro
              eyebrow="Smart web app vulnerability assessment"
              title="Detect, review, and explain code security findings in one place."
              description="Vulnexa helps developers review source code findings with clear severity levels, developer-friendly remediation, and report-ready summaries."
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-2xl">
                <Link href="/scans/new">
                  Start new scan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl border-primary/20 bg-card"
                asChild
              >
                <Link href="/scans/scan_001">
                  <ShieldCheck className="size-4 text-accent" />
                  View demo results
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-primary">
              <Sparkles className="size-4" />
              Frontend prototype phase
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card key={stat.label} className="panel">
                <CardHeader className="pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-3xl tracking-tight">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.hint}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

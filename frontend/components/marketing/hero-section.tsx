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
    <Section className="relative overflow-hidden pt-10 md:pt-14 xl:pt-16">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] xl:items-center">
          <div className="max-w-3xl space-y-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Smart web app vulnerability assessment
            </div>

            <PageIntro
              title="Detect, review, and explain code security findings in one place."
              description="Vulnexa helps developers review source code findings with clear severity levels, developer-friendly remediation, and report-ready summaries."
              className="space-y-4"
            />

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-2xl px-6"
              >
                <Link href="/scans/new">
                  Start new scan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer rounded-2xl border-primary/20 bg-card/70 px-6"
                asChild
              >
                <Link href="/dashboard">
                  <ShieldCheck className="size-4 text-accent" />
                  View dashboard
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Frontend prototype phase
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                Backend scanner integration planned next
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="panel rounded-3xl border-border/70 bg-card/78 shadow-[0_10px_35px_rgba(0,0,0,0.14)]"
              >
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm text-muted-foreground">
                    {stat.label}
                  </CardDescription>
                  <CardTitle className="text-3xl tracking-tight">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {stat.hint}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

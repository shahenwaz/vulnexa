import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { StatCard } from "@/components/shared/stat-card";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="size-4" />
              Smart web app vulnerability assessment
            </div>

            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                Detect, review, and explain code security findings in one place.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Vulnexa helps developers review source code findings with clear
                severity levels, developer-friendly remediation, and
                report-ready summaries.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/scans/new"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Start new scan
                <ArrowRight className="size-4" />
              </Link>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-accent" />
                Frontend prototype phase
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              label="Mock scan coverage"
              value="42 files"
              hint="Prototype demo data"
            />
            <StatCard
              label="Detected findings"
              value="5"
              hint="Across multiple severities"
            />
            <StatCard
              label="Critical issues"
              value="1"
              hint="Immediate attention required"
            />
            <StatCard
              label="Report ready"
              value="Yes"
              hint="Structured result UI prepared"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

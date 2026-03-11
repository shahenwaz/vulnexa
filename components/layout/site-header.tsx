import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="panel-glow flex size-10 items-center justify-center rounded-2xl">
            <Shield className="size-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-wide text-foreground">
              Vulnexa
            </span>
            <span className="text-xs text-muted-foreground">
              Web App Security Assessment
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/scans/new"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            New Scan
          </Link>
        </nav>

        <Link
          href="/scans/new"
          className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
        >
          <Sparkles className="size-4" />
          Start Scan
        </Link>
      </Container>
    </header>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  Home,
  LayoutDashboard,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid-sm absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-10 bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="panel-glow relative overflow-hidden rounded-4xl border border-border/60 bg-card/70 p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-primary/10 text-primary"
                >
                  Route not found
                </Badge>

                <div className="space-y-4">
                  <div className="inline-flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_24px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]">
                    <ShieldAlert className="size-7" />
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                      The page you’re looking for could not be found.
                    </h1>

                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                      The link may be broken, the scan ID may not exist, or the
                      page may have been moved during development. Use one of
                      the quick actions below to get back into the main Vulnexa
                      flow.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/dashboard">
                      Go to dashboard
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href="/scans/new">
                      <RefreshCcw className="size-4" />
                      Start a new scan
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  <Link
                    href="/"
                    className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-primary transition group-hover:border-primary/30 group-hover:bg-primary/10">
                        <Home className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Home
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Back to landing page
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-primary transition group-hover:border-primary/30 group-hover:bg-primary/10">
                        <LayoutDashboard className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Dashboard
                        </p>
                        <p className="text-xs text-muted-foreground">
                          View recent scans
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/reports/scan_001"
                    className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-primary transition group-hover:border-primary/30 group-hover:bg-primary/10">
                        <ShieldAlert className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Sample report
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Open a valid demo report
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="panel-glow-cyan rounded-4xl border border-border/60 bg-card/70 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
                  Error 404
                </p>

                <div className="mt-4 rounded-2xl border border-border/60 bg-background/50 p-5">
                  <div className="text-5xl font-semibold tracking-tight text-foreground">
                    404
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Vulnexa could not match this route to a valid page or scan
                    resource.
                  </p>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                    Check that the scan ID or report URL is correct.
                  </li>
                  <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                    Use the dashboard to reopen valid scan sessions.
                  </li>
                  <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                    Start a new scan if you were testing the flow manually.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

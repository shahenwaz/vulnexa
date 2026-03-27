import Link from "next/link";
import { AlertCircle, LayoutDashboard, RefreshCcw } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

type BackendUnavailableStateProps = {
  title?: string;
  description?: string;
};

export function BackendUnavailableState({
  title = "Backend is unavailable",
  description = "Vulnexa could not reach the backend service. Make sure the Python backend is running, then refresh and try again.",
}: BackendUnavailableStateProps) {
  return (
    <section className="py-10 md:pt-14">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="panel-glow rounded-4xl border border-border/60 bg-card/70 p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
                <AlertCircle className="size-7" />
              </div>

              <div className="space-y-3">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="gap-2">
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-4" />
                    Go to dashboard
                  </Link>
                </Button>

                <Button asChild variant="outline" className="gap-2">
                  <Link href="/scans/new">
                    <RefreshCcw className="size-4" />
                    Start a new scan
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-4xl border border-border/60 bg-card/70 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
                Quick checks
              </p>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                  Confirm the backend server is running on the expected port.
                </li>
                <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                  Check that{" "}
                  <span className="font-medium text-foreground">
                    NEXT_PUBLIC_BACKEND_URL
                  </span>{" "}
                  is correct.
                </li>
                <li className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                  Refresh the page after the backend is available again.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scans/new", label: "New Scan" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);

  const isOpen = openPathname === pathname;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/82 backdrop-blur-xl">
        <Container className="flex h-18 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/brand/vulnexa-logo.png"
              alt="Vulnexa logo"
              width={42}
              height={42}
              className="h-10 w-10 shrink-0 object-contain"
              priority
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[0.08em] text-foreground">
                Vulnexa
              </p>
              <p className="hidden truncate text-xs text-muted-foreground sm:block">
                Web App Security Assessment
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex cursor-pointer items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/8 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
                      : "text-muted-foreground hover:bg-secondary/55 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex md:items-center">
            <Link
              href="/scans/new"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-primary/22 bg-primary/9 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/14"
            >
              <Sparkles className="size-4" />
              Start Scan
            </Link>
          </div>

          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            onClick={() =>
              setOpenPathname((prev) => (prev === pathname ? null : pathname))
            }
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-2xl border p-2.5 transition-all md:hidden",
              isOpen
                ? "border-primary/20 bg-primary/9 text-primary shadow-[0_0_16px_color-mix(in_oklab,var(--color-primary)_10%,transparent)]"
                : "border-border/60 bg-card/85 text-muted-foreground hover:text-foreground",
            )}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-90 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/20 backdrop-blur-sm transition-all duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpenPathname(null)}
        />

        <div
          className={cn(
            "absolute inset-x-4 top-3 transition-all duration-300",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="overflow-hidden rounded-[28px] border border-border/70 bg-background/95 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src="/brand/vulnexa-logo.png"
                  alt="Vulnexa logo"
                  width={38}
                  height={38}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[0.08em] text-foreground">
                    Vulnexa
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Navigation
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpenPathname(null)}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-border/60 bg-card/80 p-2.5 text-muted-foreground transition hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="px-3 py-3">
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex cursor-pointer items-center rounded-2xl px-4 py-4 text-sm font-medium transition-all",
                        active
                          ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
                          : "text-foreground/85 hover:bg-secondary/55 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-border/60 pt-4">
                <Link
                  href="/scans/new"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-primary/22 bg-primary/9 px-4 py-3.5 text-sm font-medium text-primary transition hover:bg-primary/14"
                >
                  <Sparkles className="size-4" />
                  Start Scan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

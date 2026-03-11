"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/scans/new",
    label: "New Scan",
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/brand/vulnexa-logo.png"
            alt="Vulnexa logo"
            width={42}
            height={42}
            className="h-10 w-10 shrink-0 object-contain"
            priority
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide text-foreground">
              Vulnexa
            </p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Web App Security Assessment
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/scans/new"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
          >
            <Sparkles className="size-4" />
            Start Scan
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border/60 bg-card p-2 text-muted-foreground transition hover:text-foreground md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 transition-all duration-200 md:hidden",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-xl px-3 py-3 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/scans/new"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/15"
            >
              <Sparkles className="size-4" />
              Start Scan
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}

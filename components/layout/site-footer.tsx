import { Container } from "@/components/shared/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2026 Vulnexa. Built for Year 3 Major Project.</p>
        <p>Next.js frontend • Responsive security dashboard</p>
      </Container>
    </footer>
  );
}

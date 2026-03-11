import Link from "next/link";
import { FolderSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyStatePanel() {
  return (
    <Card className="panel rounded-3xl border-border/70">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10">
          <FolderSearch className="size-7 text-primary" />
        </div>

        <h3 className="mt-5 text-xl font-semibold">
          No saved scan reports yet
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Once backend integration is added, completed scans and generated
          reports will appear here for quick review and follow-up.
        </p>

        <Button asChild className="mt-6 cursor-pointer rounded-2xl">
          <Link href="/scans/new">Prepare first scan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  className,
}: PageIntroProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      {eyebrow ? (
        <Badge
          variant="outline"
          className="border-primary/25 bg-primary/10 text-primary"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <div className="space-y-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

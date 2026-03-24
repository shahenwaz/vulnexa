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
    <div className={cn("max-w-3xl space-y-5", className)}>
      {eyebrow ? (
        <Badge
          variant="outline"
          className="w-fit border-primary/25 bg-primary/10 px-3 py-1 text-primary"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <div className="space-y-3">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

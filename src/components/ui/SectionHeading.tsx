import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Nivel del encabezado; por defecto h2 (la página tiene un único h1). */
  as?: "h2" | "h3";
}

/** Encabezado de sección reutilizable con antetítulo y acento rojo. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span aria-hidden="true" className="h-px w-6 bg-primary" />
          {eyebrow}
        </span>
      )}
      <Heading className="mt-3 text-3xl font-bold uppercase text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

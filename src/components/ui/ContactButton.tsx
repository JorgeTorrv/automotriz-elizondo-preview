import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ContactButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Icono opcional a la izquierda del texto. */
  icon?: ReactNode;
  /** Abre en pestaña nueva con atributos de seguridad. */
  external?: boolean;
  className?: string;
  /** Nombre accesible cuando el texto visible no basta. */
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "border border-border bg-surface text-fg hover:border-primary hover:text-primary",
  ghost: "text-fg hover:text-primary",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

/** Enlace de acción (llamar, WhatsApp, cómo llegar, correo, cotización). */
export function ContactButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  external = false,
  className,
  ariaLabel,
}: ContactButtonProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], sizes[size], className)}
      {...externalProps}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/basePath";

interface ImagePlaceholderProps {
  /** Texto descriptivo de la fotografía que irá en este espacio. */
  label: string;
  /** Ícono ya renderizado, ej. `<Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />`. */
  icon?: ReactNode;
  className?: string;
  priority?: boolean;
}

/**
 * Respaldo visual branded para los espacios de fotografía todavía sin foto real.
 *
 * IMPORTANTE: cuando tengas las fotos reales del taller, colócalas en
 * `public/images/workshop/` y sustituye este componente por <Image .../> con
 * el `src`, `alt`, `sizes` y `fill` correspondientes. Ver README.md.
 *
 * No muestra cuadros vacíos ni imágenes rotas: usa el logotipo como marca de agua
 * sobre un fondo abstracto discreto acorde a la identidad.
 */
export function ImagePlaceholder({
  label,
  icon,
  className,
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface-light to-surface",
        className,
      )}
      role="img"
      aria-label={label}
    >
      {/* Líneas diagonales sutiles: guiño automotriz */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diag"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-20)"
          >
            <line x1="0" y1="0" x2="0" y2="28" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* Marca de agua del logotipo oficial */}
      <Image
        src={withBasePath("/resources/logo-automotriz-elizondo.png")}
        alt=""
        aria-hidden="true"
        width={220}
        height={220}
        priority={priority}
        className="pointer-events-none w-1/2 max-w-[220px] opacity-20"
      />

      {icon && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-background/60 px-2 py-1 text-xs text-muted backdrop-blur-sm">
          {icon}
          {label}
        </span>
      )}
    </div>
  );
}

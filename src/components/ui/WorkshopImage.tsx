"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/basePath";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface WorkshopImageProps {
  /** Ruta bajo public/, ej. "/images/workshop/fachada-taller.jpg" */
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /**
   * Qué mostrar mientras el archivo no exista:
   * - "placeholder": recuadro de marca con ícono y etiqueta (galería, about).
   * - "none": no renderiza nada (para fondos donde ya hay una composición
   *   gráfica propia detrás, como el hero).
   */
  fallback: "placeholder" | "none";
  placeholderLabel?: string;
  /** Ícono ya renderizado, ej. `<Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />`. */
  placeholderIcon?: ReactNode;
}

/**
 * Intenta cargar una fotografía real del taller. Si el archivo no existe
 * (404), se recupera sola mostrando el respaldo indicado — nunca un ícono
 * de imagen rota. En cuanto el archivo se coloca en `public/` con el nombre
 * exacto, aparece solo sin tocar código.
 */
export function WorkshopImage({
  src,
  alt,
  className,
  priority = false,
  fallback,
  placeholderLabel,
  placeholderIcon,
}: WorkshopImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallback === "none") return null;
    return (
      <ImagePlaceholder
        label={placeholderLabel ?? alt}
        icon={placeholderIcon}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <Image
        src={withBasePath(src)}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

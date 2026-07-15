import { cn } from "@/lib/utils";

/**
 * Silueta de automóvil dibujada a una sola línea (arte vectorial propio).
 * Es un motivo de marca que evoca la línea del auto del logotipo, sin usar ni
 * alterar el logotipo. Se emplea como elemento gráfico principal del hero.
 */
export function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 260"
      fill="none"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
    >
      {/* Carrocería: capó, parabrisas, techo, cajuela — trazo continuo */}
      <path
        d="M28 196 L104 196 C120 150 152 128 210 126 L268 78 C282 68 300 62 322 62 L430 62 C452 62 470 70 484 88 L540 150 L612 168"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Línea inferior / bajos */}
      <path
        d="M212 196 L452 196"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Rueda delantera */}
      <circle cx="176" cy="196" r="34" stroke="currentColor" strokeWidth="6" />
      <circle cx="176" cy="196" r="12" stroke="currentColor" strokeWidth="6" opacity="0.6" />
      {/* Rueda trasera */}
      <circle cx="488" cy="196" r="34" stroke="currentColor" strokeWidth="6" />
      <circle cx="488" cy="196" r="12" stroke="currentColor" strokeWidth="6" opacity="0.6" />
    </svg>
  );
}

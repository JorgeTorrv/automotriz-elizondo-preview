import { Clock, MapPin, ScanLine, Wrench, type LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  text: string;
}

const items: TrustItem[] = [
  { icon: Wrench, text: "Mantenimiento preventivo y correctivo" },
  { icon: ScanLine, text: "Diagnóstico electrónico" },
  { icon: Clock, text: "Atención de lunes a sábado" },
  { icon: MapPin, text: "Ubicación en Tampico" },
];

/** Franja de información rápida bajo el hero. */
export function TrustBar() {
  return (
    <section aria-label="Información rápida" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:divide-x">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 py-4 lg:justify-center lg:px-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-light text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-fg">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

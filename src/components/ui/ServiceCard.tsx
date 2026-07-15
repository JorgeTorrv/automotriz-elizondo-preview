import {
  BatteryCharging,
  CarFront,
  CircleDot,
  Disc3,
  Droplet,
  ScanLine,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Service, ServiceIcon } from "@/data/business";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  oil: Droplet,
  settings: Settings,
  car: CarFront,
  disc: Disc3,
  circle: CircleDot,
  battery: BatteryCharging,
  zap: Zap,
  scan: ScanLine,
};

/** Tarjeta de servicio con icono, acento rojo y hover discreto. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary/60 hover:bg-surface-light">
      {/* Acento rojo superior que crece al pasar el cursor */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 w-10 bg-primary transition-all duration-300 group-hover:w-full"
      />
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-light text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-fg">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
    </article>
  );
}

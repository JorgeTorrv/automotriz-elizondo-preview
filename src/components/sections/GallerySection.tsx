import { CarFront, Gauge, ScanLine, Wrench, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/*
  GALERÍA — cómo agregar fotografías reales:
  1. Descarga las fotos del perfil oficial de Facebook (no enlaces directos).
  2. Optimízalas a WebP y colócalas en public/images/workshop/.
  3. Sustituye cada <ImagePlaceholder /> por:
       <Image src="/images/workshop/nombre.webp" alt="descripción" fill
              className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
     dentro de un contenedor relativo con la misma proporción.
  Las imágenes reales del negocio tienen prioridad sobre cualquier otra.
*/

interface Slot {
  label: string;
  icon: LucideIcon;
  className: string;
}

// Cuadrícula editorial: algunas piezas ocupan más espacio en escritorio.
const slots: Slot[] = [
  { label: "Fachada del taller", icon: CarFront, className: "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto" },
  { label: "Área de servicio", icon: Wrench, className: "aspect-[4/3]" },
  { label: "Equipo de diagnóstico", icon: ScanLine, className: "aspect-[4/3]" },
  { label: "Vehículo en mantenimiento", icon: CarFront, className: "aspect-[4/3]" },
  { label: "Herramienta y equipo", icon: Gauge, className: "aspect-[4/3]" },
];

export function GallerySection() {
  return (
    <section aria-label="Galería del taller" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="El taller"
            title="Conoce nuestras instalaciones"
            subtitle="Un espacio ordenado y equipado para atender tu vehículo."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:auto-rows-[200px] lg:grid-cols-4">
          {slots.map((slot, i) => (
            <Reveal
              key={slot.label}
              delay={Math.min(i * 0.05, 0.25)}
              className={cn("min-h-0", slot.className)}
            >
              <ImagePlaceholder
                label={slot.label}
                icon={slot.icon}
                className="h-full w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

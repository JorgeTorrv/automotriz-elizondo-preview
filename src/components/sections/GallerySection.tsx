import { CarFront, Gauge, ScanLine, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkshopImage } from "@/components/ui/WorkshopImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/*
  GALERÍA — cómo agregar fotografías reales:
  Coloca el archivo en public/images/workshop/ con el nombre exacto indicado
  en cada `src` de abajo (jpg, webp o png — usa la misma extensión que
  escribas en el nombre). En cuanto exista, aparece sola; mientras no exista,
  se muestra el respaldo de marca automáticamente. No hay que tocar código.
*/

const iconClass = "h-3.5 w-3.5 text-primary";

interface Slot {
  src: string;
  label: string;
  icon: ReactNode;
  className: string;
}

// Cuadrícula editorial: algunas piezas ocupan más espacio en escritorio.
const slots: Slot[] = [
  {
    src: "/images/workshop/galeria-fachada.jpg",
    label: "Fachada del taller",
    icon: <CarFront className={iconClass} aria-hidden="true" />,
    className: "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  },
  {
    src: "/images/workshop/galeria-area-servicio.jpg",
    label: "Área de servicio",
    icon: <Wrench className={iconClass} aria-hidden="true" />,
    className: "aspect-[4/3]",
  },
  {
    src: "/images/workshop/galeria-equipo-diagnostico.jpg",
    label: "Equipo de diagnóstico",
    icon: <ScanLine className={iconClass} aria-hidden="true" />,
    className: "aspect-[4/3]",
  },
  {
    src: "/images/workshop/galeria-vehiculo-mantenimiento.jpg",
    label: "Vehículo en mantenimiento",
    icon: <CarFront className={iconClass} aria-hidden="true" />,
    className: "aspect-[4/3]",
  },
  {
    src: "/images/workshop/galeria-herramienta-equipo.jpg",
    label: "Herramienta y equipo",
    icon: <Gauge className={iconClass} aria-hidden="true" />,
    className: "aspect-[4/3]",
  },
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
              <WorkshopImage
                src={slot.src}
                alt={slot.label}
                fallback="placeholder"
                placeholderLabel={slot.label}
                placeholderIcon={slot.icon}
                className="h-full w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

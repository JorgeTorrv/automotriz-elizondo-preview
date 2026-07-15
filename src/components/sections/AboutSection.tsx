import { Star } from "lucide-react";
import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Imagen */}
        <Reveal className="order-2 lg:order-1">
          {/*
            TODO(foto real): sustituir por una fotografía del área de trabajo o
            del taller. Colocar en public/images/workshop/ y usar <Image .../>.
          */}
          <ImagePlaceholder
            label="Área de trabajo del taller"
            className="aspect-[4/3] w-full"
          />
        </Reveal>

        {/* Texto */}
        <Reveal className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="El taller"
            title="Mantenimiento para conservar tu vehículo en buenas condiciones"
          />
          <p className="mt-5 text-base leading-relaxed text-muted">
            Automotriz Elizondo es una empresa de {business.city} dedicada al
            mantenimiento preventivo y correctivo de automóviles. Sus servicios
            incluyen atención a sistemas mecánicos, eléctricos y electrónicos,
            desde cambios de aceite y afinaciones hasta frenos, suspensión y
            diagnóstico electrónico.
          </p>

          {/* Calificación pública de Google (dato verificado, con atribución) */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-border bg-background p-4">
            <span className="text-3xl font-bold text-fg">
              {business.rating.value.toFixed(1)}
            </span>
            <span className="h-10 w-px bg-border" aria-hidden="true" />
            <span className="text-sm text-muted">
              <span
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`${business.rating.value} de 5 estrellas`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(business.rating.value)
                        ? "h-4 w-4 fill-primary text-primary"
                        : "h-4 w-4 text-border"
                    }
                    aria-hidden="true"
                  />
                ))}
              </span>
              {business.rating.count} opiniones de clientes
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { PhoneCall, Wrench } from "lucide-react";
import { business } from "@/data/business";
import { ContactButton } from "@/components/ui/ContactButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-36 lg:pb-24"
    >
      {/* Acento geométrico sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Texto (primero en móvil) */}
        <Reveal className="order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {business.city}, {business.state}
          </span>

          <h1 className="mt-5 text-4xl font-bold uppercase leading-[1.05] text-fg sm:text-5xl lg:text-6xl">
            Mantenimiento y reparación{" "}
            <span className="text-primary">automotriz</span> en Tampico
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Servicio preventivo y correctivo para mantener tu vehículo en buenas
            condiciones y ayudarte a detectar fallas a tiempo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactButton href="#contacto" variant="primary" size="lg">
              Solicitar cotización
            </ContactButton>
            <ContactButton
              href={`tel:${business.phoneHref}`}
              variant="secondary"
              size="lg"
              icon={<PhoneCall className="h-5 w-5" aria-hidden="true" />}
            >
              Llamar ahora
            </ContactButton>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            Cambio de aceite, afinación, frenos, suspensión y diagnóstico
            electrónico.
          </p>
        </Reveal>

        {/* Imagen (después en móvil) */}
        <Reveal delay={0.1} className="order-2">
          {/*
            TODO(foto real): sustituir por una fotografía de la fachada del taller
            o de un vehículo siendo atendido.
            Colocar en public/images/workshop/ y usar <Image fill alt="..." priority />.
          */}
          <ImagePlaceholder
            label="Fachada del taller Automotriz Elizondo"
            priority
            className="aspect-[4/3] w-full lg:aspect-[5/4]"
          />
        </Reveal>
      </div>
    </section>
  );
}

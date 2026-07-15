import { PhoneCall } from "lucide-react";
import Image from "next/image";
import { business } from "@/data/business";
import { ContactButton } from "@/components/ui/ContactButton";
import { CarSilhouette } from "@/components/ui/CarSilhouette";
import { Reveal } from "@/components/ui/Reveal";

const serviceHighlights = [
  "Cambio de aceite",
  "Afinación",
  "Frenos",
  "Suspensión",
  "Diagnóstico electrónico",
];

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Halo rojo de marca, sin cuadrículas ni texturas de plantilla */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-24">
        {/* Texto (primero en móvil) */}
        <Reveal className="order-1 lg:col-span-7">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="h-6 w-1 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-wide text-muted">
              Taller automotriz en Tampico
            </span>
          </span>

          <h1 className="mt-6 text-[2.75rem] font-bold uppercase leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
            Mantenimiento y
            <br />
            reparación <span className="text-primary">automotriz</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
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

          {/* Servicios destacados en línea, separados con acento rojo */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            {serviceHighlights.map((name, i) => (
              <li key={name} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-primary"
                  />
                )}
                {name}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Visual de marca (después en móvil). Reemplazable por foto real. */}
        <Reveal delay={0.1} className="order-2 lg:col-span-5">
          {/*
            TODO(foto real): cuando exista una fotografía de la fachada o de un
            vehículo atendido, sustituir este panel por <Image fill alt="..." priority />
            (public/images/workshop/). Mientras tanto se usa un panel de marca.
          */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-light via-surface to-background">
            {/* Banda diagonal roja */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-10 top-1/3 h-24 -rotate-[18deg] bg-primary/10"
            />
            {/* Silueta de auto: motivo de marca */}
            <CarSilhouette className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-[60%] text-primary drop-shadow-[0_8px_24px_rgba(215,25,48,0.25)]" />
            {/* Logotipo oficial, discreto */}
            <Image
              src="/resources/logo-automotriz-elizondo-trim.png"
              alt="Automotriz Elizondo"
              width={220}
              height={79}
              priority
              className="absolute bottom-6 left-1/2 w-1/2 max-w-[220px] -translate-x-1/2 opacity-90"
            />
            {/* Acento de esquina */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-16 w-1.5 bg-primary"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

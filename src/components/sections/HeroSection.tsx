import { PhoneCall } from "lucide-react";
import { business } from "@/data/business";
import { ContactButton } from "@/components/ui/ContactButton";
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
    <section
      id="inicio"
      className="relative flex min-h-[90svh] items-center overflow-hidden"
    >
      {/*
        FONDO DEL HERO.
        TODO(foto real): cuando exista una fotografía de la fachada o del taller,
        colócala aquí a pantalla completa y conserva la capa oscura de legibilidad:
          <Image src="/images/workshop/fachada-automotriz-elizondo.webp" alt=""
                 fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background
               via-background/90 to-background/40" />
        Mientras tanto se usa una composición de marca (sin fotografía de stock).
      */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Base oscura */}
        <div className="absolute inset-0 bg-background" />
        {/* Bloque rojo diagonal que sangra por el borde derecho (industrial) */}
        <div
          className="absolute inset-y-0 -right-40 w-[70%] bg-primary/90"
          style={{ clipPath: "polygon(38% 0, 100% 0, 100% 100%, 12% 100%)" }}
        />
        {/* Bloque más oscuro detrás para dar profundidad al corte */}
        <div
          className="absolute inset-y-0 -right-56 w-[70%] bg-primary/20"
          style={{ clipPath: "polygon(38% 0, 100% 0, 100% 100%, 12% 100%)" }}
        />
        {/* Textura diagonal muy sutil sobre el rojo */}
        <div
          className="absolute inset-y-0 right-0 w-[55%] opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #000 0 2px, transparent 2px 22px)",
          }}
        />
        {/* Degradado que funde el rojo hacia el fondo para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        {/* Halo inferior */}
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-28 sm:px-6 lg:py-32">
        <Reveal className="max-w-3xl">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="h-6 w-1.5 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              Taller automotriz · {business.city}
            </span>
          </span>

          <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.92] text-fg sm:text-7xl lg:text-[5.5rem]">
            Mantenimiento
            <br />y reparación
            <br />
            <span className="text-primary">automotriz</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-muted sm:text-xl">
            en Tampico, Tamaulipas.
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Servicio preventivo y correctivo para mantener tu vehículo en buenas
            condiciones y ayudarte a detectar fallas a tiempo.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          {/* Servicios destacados en línea */}
          <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 text-sm text-muted">
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
      </div>
    </section>
  );
}

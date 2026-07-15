import { PhoneCall } from "lucide-react";
import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactButton } from "@/components/ui/ContactButton";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesSection() {
  return (
    <section id="servicios" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Lo que hacemos"
            title="Servicios automotrices"
            subtitle="Soluciones de mantenimiento, diagnóstico y reparación para diferentes sistemas de tu automóvil."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {business.services.map((service, i) => (
            <Reveal key={service.name} delay={Math.min(i * 0.05, 0.3)}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-base text-muted">
              ¿No encuentras el servicio que necesitas? Comunícate directamente
              para consultar la disponibilidad.
            </p>
            <ContactButton
              href={`tel:${business.phoneHref}`}
              variant="primary"
              icon={<PhoneCall className="h-4 w-4" aria-hidden="true" />}
              className="shrink-0"
            >
              Llamar al taller
            </ContactButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

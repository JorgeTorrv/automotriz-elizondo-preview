import {
  PhoneCall,
  ScanLine,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Mantenimiento preventivo",
    text: "Servicios enfocados en revisar y conservar los sistemas esenciales del automóvil.",
  },
  {
    icon: Wrench,
    title: "Fallas mecánicas y eléctricas",
    text: "Opciones de servicio para diferentes componentes del vehículo.",
  },
  {
    icon: ScanLine,
    title: "Diagnóstico electrónico",
    text: "Revisión orientada a identificar códigos y posibles fallas electrónicas.",
  },
  {
    icon: PhoneCall,
    title: "Contacto directo",
    text: "Acceso rápido al teléfono, ubicación y redes sociales del negocio.",
  },
];

export function BenefitsSection() {
  return (
    <section aria-label="Razones para contactarnos" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="Razones para contactar al taller"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={Math.min(i * 0.05, 0.2)}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-light text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

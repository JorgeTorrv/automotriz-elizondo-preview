import { ClipboardCheck, MapPin, PhoneCall, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    icon: PhoneCall,
    title: "Comunícate con el taller",
    text: "Llama o envía un mensaje para explicar el servicio o la falla que presenta el vehículo.",
  },
  {
    icon: MapPin,
    title: "Acude para una revisión",
    text: "Lleva el automóvil al establecimiento para que pueda evaluarse.",
  },
  {
    icon: ClipboardCheck,
    title: "Recibe información sobre el servicio",
    text: "Consulta directamente el trabajo recomendado, disponibilidad y condiciones.",
  },
];

export function ProcessSection() {
  return (
    <section aria-label="Proceso de atención" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Proceso de atención"
            subtitle="Tres pasos sencillos para atender tu vehículo."
          />
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={Math.min(i * 0.08, 0.24)}>
              <div className="relative flex h-full flex-col rounded-xl border border-border bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-light text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className="font-heading text-5xl font-bold text-border"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

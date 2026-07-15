import { Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactButton } from "@/components/ui/ContactButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { Reveal } from "@/components/ui/Reveal";
import { directionsUrl, hasWhatsApp, whatsappUrl } from "@/lib/utils";

export function ContactSection() {
  const whatsapp = hasWhatsApp()
    ? whatsappUrl(
        "Hola, me gustaría solicitar información sobre un servicio automotriz.",
      )
    : "";

  return (
    <section id="contacto" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            title="Visítanos o comunícate con nosotros"
            subtitle="Estamos en Tampico para atender el mantenimiento y la reparación de tu vehículo."
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          {/* Información de contacto */}
          <Reveal className="flex flex-col gap-6">
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Dirección</p>
                  <p className="text-sm text-muted">{business.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Teléfono</p>
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
              </li>
              {business.email && (
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg">Correo</p>
                    <a
                      href={`mailto:${business.email}`}
                      className="break-all text-sm text-muted transition-colors hover:text-primary"
                    >
                      {business.email}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Horario</p>
                  <ul className="mt-1 space-y-1">
                    {business.schedule.map((entry) => (
                      <li
                        key={entry.days}
                        className="flex justify-between gap-4 text-sm text-muted"
                      >
                        <span>{entry.days}</span>
                        <span className="text-fg">{entry.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* Botones de acción principales */}
            <div className="flex flex-wrap gap-3">
              <ContactButton
                href={`tel:${business.phoneHref}`}
                variant="primary"
                icon={<PhoneCall className="h-4 w-4" aria-hidden="true" />}
              >
                Llamar al taller
              </ContactButton>
              <ContactButton
                href={directionsUrl()}
                variant="secondary"
                external
                icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              >
                Cómo llegar
              </ContactButton>
              {business.email && (
                <ContactButton
                  href={`mailto:${business.email}`}
                  variant="secondary"
                  icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                >
                  Enviar correo
                </ContactButton>
              )}
              {whatsapp && (
                <ContactButton
                  href={whatsapp}
                  variant="secondary"
                  external
                  icon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
                >
                  Enviar WhatsApp
                </ContactButton>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">Síguenos:</span>
              <SocialLinks />
            </div>
          </Reveal>

          {/* Formulario de cotización */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-surface p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-fg">
                Solicita información o cotización
              </h3>
              <p className="mt-1 text-sm text-muted">
                Completa el formulario y continúa la conversación por WhatsApp.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mapa (carga diferida, sin API key) */}
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              src={business.googleMapsEmbedUrl}
              title={`Ubicación de ${business.name} en Google Maps`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px]"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { business } from "@/data/business";
import { directionsUrl, hasWhatsApp, whatsappUrl } from "@/lib/utils";

/**
 * Barra fija inferior solo para móvil.
 * Acciones: Llamar + WhatsApp (si hay número confirmado) y Cómo llegar.
 * Respeta el área segura de iPhone y se oculta en escritorio (lg:hidden).
 */
export function MobileContactBar() {
  const whatsapp = hasWhatsApp()
    ? whatsappUrl(
        "Hola, me gustaría solicitar información sobre un servicio automotriz.",
      )
    : "";

  const actions = [
    {
      label: "Llamar",
      href: `tel:${business.phoneHref}`,
      Icon: PhoneCall,
      primary: true,
      external: false,
    },
    whatsapp && {
      label: "WhatsApp",
      href: whatsapp,
      Icon: MessageCircle,
      primary: false,
      external: true,
    },
    {
      label: "Cómo llegar",
      href: directionsUrl(),
      Icon: MapPin,
      primary: false,
      external: true,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    Icon: typeof PhoneCall;
    primary: boolean;
    external: boolean;
  }[];

  return (
    <nav
      aria-label="Contacto rápido"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-flow-col border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      style={{ gridAutoColumns: "1fr" }}
    >
      {actions.map(({ label, href, Icon, primary, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors ${
            primary
              ? "bg-primary text-white active:bg-primary-hover"
              : "text-fg active:text-primary"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  );
}

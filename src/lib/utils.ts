import { business } from "@/data/business";

/** Une clases condicionales de forma segura (evita "undefined" en el DOM). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Año actual, calculado dinámicamente (para el pie de página). */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** ¿Hay un número de WhatsApp confirmado? */
export function hasWhatsApp(): boolean {
  return business.whatsappNumber.trim().length > 0;
}

/**
 * Enlace de indicaciones ("Cómo llegar") de Google Maps.
 * Usa la API de URLs de Maps, sin llave ni dependencias.
 */
export function directionsUrl(): string {
  // Usa las coordenadas exactas si existen; si no, la dirección.
  const destination = business.geo
    ? `${business.geo.lat},${business.geo.lng}`
    : `${business.name}, ${business.address}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination,
  )}`;
}

/**
 * Construye un enlace de WhatsApp con un mensaje ya codificado.
 * Devuelve cadena vacía si no hay número confirmado.
 */
export function whatsappUrl(message: string): string {
  if (!hasWhatsApp()) return "";
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface QuoteFields {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  message: string;
}

/**
 * Arma el mensaje estructurado de cotización.
 * El contenido se codifica al construir la URL de WhatsApp (whatsappUrl),
 * por lo que aquí se trabaja con texto plano ya limpio.
 */
export function buildQuoteMessage(fields: QuoteFields): string {
  const clean = (value: string) => value.trim().replace(/\s+/g, " ");
  const lines = [
    "Hola, me gustaría solicitar información sobre un servicio.",
    "",
    `Nombre: ${clean(fields.name)}`,
    `Teléfono: ${clean(fields.phone)}`,
    `Vehículo: ${clean(fields.vehicle)}`,
    `Servicio: ${clean(fields.service)}`,
  ];
  const extra = clean(fields.message);
  if (extra) lines.push(`Mensaje: ${extra}`);
  return lines.join("\n");
}

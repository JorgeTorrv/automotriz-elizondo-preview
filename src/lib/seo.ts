import type { Metadata } from "next";
import { business, SITE_URL } from "@/data/business";

const title = `${business.name} | Taller y mantenimiento automotriz en Tampico`;
const description =
  "Mantenimiento preventivo y correctivo de automóviles en Tampico. Cambio de aceite, afinación, frenos, suspensión, sistema eléctrico y diagnóstico electrónico.";

/** Metadatos base del sitio (Metadata API de Next.js). */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  keywords: [
    "taller automotriz en Tampico",
    "mantenimiento automotriz en Tampico",
    "reparación de automóviles en Tampico",
    "cambio de aceite Tampico",
    "afinación",
    "frenos",
    "suspensión",
    "diagnóstico electrónico",
    "Automotriz Elizondo",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  alternates: {
    canonical: "/",
  },
  category: "Taller automotriz",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: business.name,
    title,
    description,
    images: [
      {
        // URL absoluta: evita que la resolución relativa a metadataBase
        // pierda un basePath cuando el sitio vive en una subruta (GitHub Pages).
        url: `${SITE_URL}/resources/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${business.name} — taller automotriz en Tampico`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/resources/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Datos estructurados JSON-LD (Schema.org AutoRepair).
 * Solo incluye información confirmada: sin coordenadas aproximadas,
 * sin precios ni calificaciones inventadas.
 */
export function buildJsonLd() {
  const dayMap: Record<string, string[]> = {
    "Lunes a viernes": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    Sábado: ["Saturday"],
  };

  const openingHours = business.schedule
    .filter((entry) => entry.hours.toLowerCase() !== "cerrado")
    .map((entry) => {
      // "8:30 a.m. – 7:00 p.m." -> apertura/cierre en formato 24h
      const [open, close] = entry.hours.split("–").map((s) => to24h(s.trim()));
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[entry.days] ?? [],
        opens: open,
        closes: close,
      };
    });

  const sameAs = [business.facebookUrl, business.instagramUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    logo: `${SITE_URL}/resources/logo-automotriz-elizondo.png`,
    image: `${SITE_URL}/resources/og-image.jpg`,
    telephone: business.phoneHref,
    email: business.email,
    foundingDate: String(business.foundingYear),
    priceRange: undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. López 303-A, Col. Campbell",
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.postalCode,
      addressCountry: "MX",
    },
    geo: business.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: business.geo.lat,
          longitude: business.geo.lng,
        }
      : undefined,
    hasMap: business.googleMapsUrl,
    areaServed: ["Tampico", "Ciudad Madero", "Altamira"].map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: openingHours,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs,
  };
}

/** Convierte "8:30 a.m." / "7:00 p.m." a formato 24h "HH:MM". */
function to24h(value: string): string {
  const match = value.match(/(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.)/i);
  if (!match) return value;
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const isPm = /p\.m\./i.test(match[3]);
  if (isPm && hour !== 12) hour += 12;
  if (!isPm && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

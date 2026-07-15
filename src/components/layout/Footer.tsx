import Image from "next/image";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { business } from "@/data/business";
import { getCurrentYear } from "@/lib/utils";
import { withBasePath } from "@/lib/basePath";
import { SocialLinks } from "@/components/ui/SocialLinks";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Image
              src={withBasePath("/resources/logo-automotriz-elizondo-trim.png")}
              alt="Automotriz Elizondo"
              width={160}
              height={57}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {business.description} En {business.city}, {business.state}, desde{" "}
              {business.foundingYear}.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{business.addressShort}</span>
              </li>
              <li>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <PhoneCall className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {business.phoneDisplay}
                </a>
              </li>
              {business.email && (
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center gap-2.5 break-all transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {business.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              Horario
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {business.schedule.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-3">
                  <span>{entry.days}</span>
                  <span className="text-right text-fg">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted">
          © {getCurrentYear()} {business.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

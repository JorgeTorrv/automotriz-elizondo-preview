import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/* lucide 1.x no incluye iconos de marca; se definen como SVG propios. */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.017 1.792-4.684 4.533-4.684 1.312 0 2.686.235 2.686.235v2.965h-1.513c-1.49 0-1.955.93-1.955 1.886v2.242h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Enlaces a redes sociales. Solo renderiza las que tienen URL confirmada.
 * Se abren en pestaña nueva con atributos de seguridad.
 */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  const links = [
    business.facebookUrl && {
      label: "Facebook",
      href: business.facebookUrl,
      Icon: FacebookIcon,
    },
    business.instagramUrl && {
      label: "Instagram",
      href: business.instagramUrl,
      Icon: InstagramIcon,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[];

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} de Automotriz Elizondo (se abre en una pestaña nueva)`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <Icon className={cn("h-5 w-5", iconClassName)} />
          </a>
        </li>
      ))}
    </ul>
  );
}

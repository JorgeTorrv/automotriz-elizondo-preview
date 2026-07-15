/**
 * Fuente única de información del negocio.
 *
 * Todos los datos visibles del sitio se toman de aquí. No repitas teléfonos,
 * direcciones, horarios ni enlaces en los componentes: impórtalos desde este
 * archivo. Cuando un dato opcional queda vacío (""), su elemento no se renderiza.
 *
 * Cómo editar cada dato está documentado en el README.md.
 */

/** Clave de icono. Se traduce a un icono de lucide-react en ServiceCard. */
export type ServiceIcon =
  | "oil"
  | "settings"
  | "car"
  | "disc"
  | "circle"
  | "battery"
  | "zap"
  | "scan";

export interface Service {
  name: string;
  description: string;
  icon: ServiceIcon;
}

export interface ScheduleEntry {
  days: string;
  hours: string;
}

export interface Review {
  name: string;
  rating: number; // 1 a 5
  text: string;
  /** Antigüedad tal como aparece en Google (opcional). */
  date?: string;
}

export interface Business {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  foundingYear: number;

  phoneDisplay: string;
  phoneHref: string;
  /** Número de WhatsApp en formato internacional sin signos (vacío = sin WhatsApp). */
  whatsappNumber: string;
  email: string;

  address: string;
  addressShort: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  /** Coordenadas exactas del lugar en Google (opcional). */
  geo?: {
    lat: number;
    lng: number;
  };

  facebookUrl: string;
  instagramUrl: string;

  /** Calificación pública de Google. Dato verificado; se muestra con atribución. */
  rating: {
    value: number;
    count: number;
  };

  schedule: ScheduleEntry[];
  services: Service[];
  reviews: Review[];
}

export const business: Business = {
  name: "Automotriz Elizondo",
  legalName: "Automotriz Elizondo",
  tagline: "Mantenimiento y reparación automotriz en Tampico",
  description:
    "Empresa dedicada al mantenimiento preventivo y correctivo de automóviles.",
  foundingYear: 1990,

  phoneDisplay: "833 214 0314",
  phoneHref: "+528332140314",
  whatsappNumber: "528331059917",
  email: "automotrizelizondo@hotmail.com",

  address: "C. López 303-A, Col. Campbell, 89260 Tampico, Tamps.",
  addressShort: "C. López 303-A, Col. Campbell, Tampico",
  city: "Tampico",
  state: "Tamaulipas",
  country: "México",
  postalCode: "89260",

  googleMapsUrl: "https://maps.app.goo.gl/vDsqXSL3q3uSCBsDA",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=22.2238127,-97.8655732&hl=es&z=16&output=embed",
  geo: {
    lat: 22.2238127,
    lng: -97.8655732,
  },

  facebookUrl: "https://www.facebook.com/automotrizelizondo",
  instagramUrl: "",

  rating: {
    value: 4.5,
    count: 109,
  },

  schedule: [
    { days: "Lunes a viernes", hours: "8:30 a.m. – 7:00 p.m." },
    { days: "Sábado", hours: "8:30 a.m. – 2:00 p.m." },
    { days: "Domingo", hours: "Cerrado" },
  ],

  services: [
    {
      name: "Cambio de aceite",
      description:
        "Servicio de cambio de aceite para contribuir al correcto funcionamiento y protección del motor.",
      icon: "oil",
    },
    {
      name: "Afinación",
      description:
        "Mantenimiento preventivo para conservar el desempeño y funcionamiento general del automóvil.",
      icon: "settings",
    },
    {
      name: "Suspensión",
      description:
        "Revisión y servicio de los componentes relacionados con la estabilidad y comodidad del vehículo.",
      icon: "car",
    },
    {
      name: "Frenos",
      description:
        "Inspección y mantenimiento del sistema de frenado para mantener una conducción segura.",
      icon: "disc",
    },
    {
      name: "Rectificado de discos",
      description:
        "Servicio para corregir irregularidades y recuperar el funcionamiento adecuado de los discos de freno.",
      icon: "circle",
    },
    {
      name: "Carga de baterías",
      description:
        "Revisión y carga de baterías para recuperar o comprobar su funcionamiento.",
      icon: "battery",
    },
    {
      name: "Sistema eléctrico",
      description:
        "Revisión de componentes y fallas relacionadas con el sistema eléctrico del automóvil.",
      icon: "zap",
    },
    {
      name: "Diagnóstico electrónico",
      description:
        "Detección de fallas mediante herramientas de diagnóstico electrónico automotriz.",
      icon: "scan",
    },
  ],

  // Reseñas reales tomadas del perfil público de Google (texto fiel).
  // No se corrige la redacción ni el sentido de las opiniones.
  reviews: [
    {
      name: "Florian Bernard",
      rating: 5,
      date: "Hace 2 años",
      text: "Llevar mi Ford Mustang 2011 al Garaje Automotriz Elizondo fue la mejor decisión que pude haber tomado. Desde el primer momento, su equipo demostró un profesionalismo excepcional, atendiendo cada detalle con la máxima dedicación.",
    },
    {
      name: "Essbeidy Cruz",
      rating: 5,
      date: "Hace un año",
      text: "Servicio profesional desde que llamas para agendar una cita, el taller esta limpio con su sala de espera, puedes ver que esta en perfectas condiciones, orden, limpieza, te explican las cosas con sencillez y rapidez.",
    },
    {
      name: "Misael Montalvo Lambarria",
      rating: 5,
      date: "Hace 4 años",
      text: "Hoy por la mañana fui con mi carro por un detalle electrónico, al instante me llegó la cotización bastante razonable y en menos de dos horas ya estaba listo. Excelente servicio.",
    },
    {
      name: "Roberto Martinez",
      rating: 5,
      date: "Hace 9 meses",
      text: "Buen servicio, la camioneta quedó al 100 con todos los ajustes que le hicieron, de momento recomendados. Los precios un poco más altos que el promedio pero por la calidad lo vale.",
    },
    {
      name: "Jose Reyes Hernandez C",
      rating: 4,
      date: "Hace 3 años",
      text: "Muy buena atención de parte del personal, cuentan con lo indispensable y la ejecución de los trabajos es lo más rápido posible, buen servicio.",
    },
    {
      name: "TETRICOS DEl FACE",
      rating: 5,
      date: "Hace 9 meses",
      text: "Excelente, se le quedó el carro a mi novia y de volada contestaron y nos ayudaron, y así pudimos llegar a nuestro rancho, lo recomiendo al millón.",
    },
  ],
};

/** URL absoluta pública del sitio. Cámbiala por el dominio real al desplegar. */
export const SITE_URL = "https://automotrizelizondo.vercel.app";

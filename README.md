# Automotriz Elizondo — Sitio web corporativo

Página web corporativa para **Automotriz Elizondo**, taller de mantenimiento
preventivo y correctivo de automóviles en Tampico, Tamaulipas, México.

El sitio está pensado para convertir visitantes en contactos: llamadas,
WhatsApp, solicitudes de cotización, visitas al taller y acceso a Google Maps y
Facebook. No incluye comercio electrónico, inicio de sesión, base de datos ni
panel administrativo.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** en modo estricto
- **Tailwind CSS v4** (configuración basada en CSS, sin `tailwind.config.js`)
- **lucide-react** (iconos)
- **framer-motion** (animaciones discretas)
- `next/image` para imágenes y `next/font` para tipografías
  (Barlow Condensed para títulos, Inter para texto)
- ESLint configurado
- Objetivo de despliegue: **Vercel**

---

## Requisitos

- Node.js 20 o superior
- npm (el proyecto usa `package-lock.json`)

---

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev     # Servidor de desarrollo (http://localhost:3000)
npm run build   # Compilación de producción
npm run start   # Sirve la compilación de producción
npm run lint    # Revisión con ESLint
```

---

## Despliegue en Vercel

1. Sube el proyecto a un repositorio (GitHub, GitLab o Bitbucket).
2. En [vercel.com](https://vercel.com) elige **Add New → Project** e importa el
   repositorio. Vercel detecta Next.js automáticamente; no requiere configuración
   adicional.
3. Tras el primer despliegue, agrega el dominio del cliente en
   **Project → Settings → Domains**.
4. Actualiza `SITE_URL` (ver más abajo) con el dominio definitivo y vuelve a
   desplegar para que el SEO, el `sitemap.xml`, `robots.txt` y las imágenes
   sociales usen la URL correcta.

---

## Dónde se edita la información del negocio

**Toda** la información editable está centralizada en un único archivo:

```
src/data/business.ts
```

No hay teléfonos, direcciones ni enlaces repetidos en los componentes: todos se
leen desde ahí. A continuación, cómo modificar cada dato.

### Cambiar el teléfono

En `src/data/business.ts`:

- `phoneDisplay`: teléfono como se muestra en pantalla (ej. `"833 214 0314"`).
- `phoneHref`: mismo número en formato internacional para el enlace `tel:`
  (ej. `"+528332140314"`).

### Configurar WhatsApp

- `whatsappNumber`: número en formato internacional **sin signos ni espacios**
  (ej. `"528331059917"`).
- Si se deja **vacío** (`""`), automáticamente:
  - desaparecen todos los botones de WhatsApp,
  - la barra móvil deja de mostrar WhatsApp,
  - el formulario de cotización se convierte en accesos directos para llamar o
    enviar correo (no se simula ningún envío).

### Modificar los servicios

Edita el arreglo `services` en `business.ts`. Cada servicio tiene:

```ts
{ name: "Nombre", description: "Descripción breve", icon: "oil" }
```

El campo `icon` acepta una de estas claves:
`oil`, `settings`, `car`, `disc`, `circle`, `battery`, `zap`, `scan`.
La traducción de clave → icono está en
`src/components/ui/ServiceCard.tsx` (mapa `iconMap`), donde puedes agregar más
claves si añades servicios nuevos.

### Agregar o editar reseñas

Edita el arreglo `reviews` en `business.ts`. Cada reseña:

```ts
{ name: "Nombre público", rating: 5, date: "Hace 2 años", text: "Texto fiel de Google" }
```

- Usa entre 3 y 6 reseñas reales tomadas del perfil público de Google.
- Copia el texto de forma fiel; no inventes ni corrijas el sentido.
- La calificación agregada (`rating.value` y `rating.count`) también está en
  `business.ts`; actualízala solo con datos verificados.

### Cambiar Facebook e Instagram

En `business.ts`:

- `facebookUrl`: URL del perfil de Facebook.
- `instagramUrl`: URL de Instagram. Si se deja **vacío**, no se muestra ningún
  botón ni enlace de Instagram (no aparecen enlaces vacíos).

### Sustituir el mapa

En `business.ts`:

- `googleMapsUrl`: enlace normal de Google Maps (botón "Ver en Google" y
  "Ver ubicación y reseñas en Google").
- `googleMapsEmbedUrl`: URL de inserción usada por el `<iframe>` del mapa.
  El sitio usa una URL de inserción sin llave (`...&output=embed`). Para mayor
  precisión puedes pegar la URL oficial de **Google Maps → Compartir → Insertar
  un mapa** (copia el valor del atributo `src` del iframe que ofrece Google).

Las indicaciones "Cómo llegar" se generan automáticamente desde la dirección en
`src/lib/utils.ts` (`directionsUrl`).

### Reemplazar el dominio

En `src/data/business.ts`, al final del archivo:

```ts
export const SITE_URL = "https://tu-dominio.com";
```

Este valor alimenta el SEO (canonical, Open Graph), el `sitemap.xml`, el
`robots.txt` y el JSON-LD. Cámbialo por el dominio definitivo y vuelve a
desplegar.

---

## Cómo agregar las fotografías del taller

Actualmente el sitio usa respaldos visuales branded (marca de agua del logotipo
sobre un fondo abstracto) en los espacios de fotografía. Para colocar las fotos
reales:

1. Descarga las fotos del **perfil oficial de Facebook** del negocio
   (no enlaces directos ni hotlinking).
2. Optimízalas y conviértelas a **WebP** con nombres descriptivos, por ejemplo:
   ```
   public/images/workshop/fachada-automotriz-elizondo.webp
   public/images/workshop/area-de-servicio.webp
   public/images/workshop/mantenimiento-vehiculo.webp
   public/images/workshop/equipo-de-diagnostico.webp
   ```
3. Sustituye el componente `<ImagePlaceholder />` por `<Image />` de
   `next/image` en:
   - `src/components/sections/HeroSection.tsx`
   - `src/components/sections/AboutSection.tsx`
   - `src/components/sections/GallerySection.tsx`

   Ejemplo dentro de un contenedor con proporción definida:
   ```tsx
   <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
     <Image
       src="/images/workshop/fachada-automotriz-elizondo.webp"
       alt="Fachada del taller Automotriz Elizondo en Tampico"
       fill
       className="object-cover"
       sizes="(max-width: 1024px) 100vw, 50vw"
     />
   </div>
   ```

Cada sección incluye un comentario `TODO(foto real)` señalando exactamente dónde
hacer el cambio. Usa siempre un `alt` descriptivo y evita mostrar matrículas.

---

## El logotipo

- Original intacto: `Resources/LogoAE.png`.
- Copias para el sitio (en `public/resources/`):
  - `logo-automotriz-elizondo.png` — logotipo completo (marca de agua, JSON-LD).
  - `logo-automotriz-elizondo-trim.png` — versión recortada para el encabezado y
    el pie de página (mejor proporción, sin alterar el diseño).
  - `og-image.jpg` — imagen social 1200×630 generada a partir del logotipo.

Los iconos del sitio (`favicon.ico`, `icon.png`, `apple-icon.png`) están en
`src/app/` y se derivan del logotipo.

El rojo de la identidad (`--primary: #DF1930`) fue muestreado directamente de los
píxeles del logotipo. Los tokens de color y tipografía están en
`src/app/globals.css`.

---

## Verificar que no queden marcadores pendientes

Todos los datos confirmados ya están cargados. Para asegurarte de que no quede
ningún marcador de plantilla antes de publicar, ejecuta:

```bash
grep -RnE "\[[A-ZÁÉÍÓÚÑ ]+\]|PEGAR|TODO" src/
```

- Los únicos resultados esperados son comentarios `TODO(foto real)` que indican
  dónde colocar las fotografías del taller.
- No debe aparecer ningún texto entre corchetes tipo `[TELÉFONO]`, `[PEGAR ...]`
  ni palabras de plantilla en la interfaz.

---

## Estructura del proyecto

```
src/
  app/
    layout.tsx        # Metadata, fuentes, JSON-LD
    page.tsx          # Ensamble de secciones
    globals.css       # Tokens de diseño (colores, tipografías)
    sitemap.ts
    robots.ts
    icon.png / apple-icon.png / favicon.ico
  components/
    layout/           # Header, Footer
    sections/         # Hero, TrustBar, Services, About, Benefits,
                      # Process, Gallery, Reviews, Contact
    ui/               # SectionHeading, ServiceCard, ReviewCard,
                      # ContactButton, SocialLinks, MobileContactBar,
                      # QuoteForm, ImagePlaceholder, Reveal
  data/
    business.ts       # Fuente única de información
  lib/
    seo.ts            # Metadata API + JSON-LD (AutoRepair)
    utils.ts          # Utilidades (WhatsApp, indicaciones, año, etc.)
public/
  resources/          # Logotipo e imagen social
  images/workshop/    # Fotografías reales del taller (por agregar)
```

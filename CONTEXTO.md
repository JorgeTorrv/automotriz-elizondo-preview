# Contexto — Automotriz Elizondo

Este documento explica el **por qué** y el **qué** de este sitio, no el
cómo. No contiene código ni instrucciones técnicas de implementación — eso
vive en el `README.md` del repo. Aquí solo van propósito, decisiones y
razonamiento.

---

## Propósito

Sitio corporativo para un taller de mantenimiento preventivo y correctivo de
automóviles en Tampico. No hay "pedido" ni carrito — el objetivo es
puramente **generar contacto**: llamadas, WhatsApp, cotizaciones, visitas al
taller físico y tráfico hacia Google Maps y Facebook. Explícitamente no
incluye e-commerce, login, base de datos ni panel de administración — el
negocio no lo necesita y agregarlo sería complejidad sin beneficio real.

## Decisiones de diseño

- **Toda la información editable centralizada en un único archivo de datos**
  (teléfono, dirección, horario, servicios, reseñas, redes sociales). La
  razón es operativa: quien mantenga el sitio después no debería tener que
  buscar el mismo dato repetido en varios componentes — un solo lugar, una
  sola fuente de verdad.
- **WhatsApp opcional por diseño:** si el negocio no tiene WhatsApp
  configurado (campo vacío), el sitio no muestra ningún botón roto ni
  simulado — se cae automáticamente a llamada o correo. Se prefirió que el
  sitio "se adapte" a qué canales tiene realmente el negocio en vez de
  mostrar botones que no llevan a nada.
- **Reseñas y calificación como datos verificados, no inventados:** el
  código deja explícito que las reseñas deben copiarse fielmente de Google y
  que la calificación agregada solo debe actualizarse con datos reales — para
  evitar el riesgo de mostrar información falsa o desactualizada en un rubro
  (talleres mecánicos) donde la confianza es crítica.
- **SEO/datos estructurados (Schema.org "AutoRepair") desde el inicio:** al
  ser un negocio local que depende de búsquedas tipo "taller en Tampico", se
  invirtió en metadatos, JSON-LD y sitemap desde el arranque, no como
  añadido posterior.
- **Fotos con respaldo de marca mientras no hay fotografía real:** se
  dejaron espacios claramente marcados para sustituir por fotos reales del
  taller (fachada, área de servicio, equipo de diagnóstico) sin necesidad de
  tocar la estructura del sitio.
- **Hero rediseñado a pantalla completa:** se iteró el diseño del hero hacia
  una versión más editorial (bloque diagonal, altura completa de viewport)
  para dar una primera impresión más robusta/profesional, alineada a un
  negocio técnico donde el tono debe transmitir seriedad.
- **Nunca simular datos falsos:** ni reseñas inventadas ni calificaciones
  aproximadas — se dejaron espacios claramente vacíos/placeholder antes que
  rellenar con información no verificada.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript estricto** — se eligió
  Next.js (en vez de un sitio estático simple) porque desde el inicio el
  objetivo de despliegue era Vercel, con mejor soporte de SEO/metadata API,
  sitemap y rendimiento out-of-the-box.
- **Tailwind CSS v4** — estilos utilitarios, config basada en CSS.
- **framer-motion** — animaciones discretas de entrada/scroll.
- **next/image + next/font** — optimización de imágenes y tipografías
  (Barlow Condensed para títulos, Inter para texto) nativas de Next.js.

## Despliegue

- El objetivo de producción original era **Vercel** (documentado desde el
  README del proyecto), por ser la plataforma nativa de Next.js.
- Para dar una **vista previa gratuita al cliente sin depender de una cuenta
  de Vercel**, se configuró una exportación estática (`output: "export"`)
  desplegada en **dos hosts en paralelo**, ambos disparados automáticamente
  por GitHub Actions en cada push a `main`:
  - **GitHub Pages** — sirve el sitio bajo un subpath (`/automotriz-elizondo-preview/`),
    por eso el build necesita un `basePath` condicional activado solo en ese
    flujo.
  - **Cloudflare Pages** — sirve en la raíz de su propio subdominio
    `*.pages.dev`, ya en la red edge de Cloudflare por defecto (no requiere
    configuración de DNS/proxy adicional). Ahí el build no usa `basePath`.
- Se resolvió un problema real de GitHub Pages: cachea `index.html` 10
  minutos y no permite configurar ese comportamiento desde el repo. Si
  alguien cargaba una copia vieja justo después de un despliegue nuevo, podía
  terminar pidiendo archivos JS/CSS que ya no existían (nombres cambian por
  build) y ver una página en blanco hasta refrescar a mano. Se agregó una
  recuperación automática: si eso pasa, el sitio se recarga solo una vez, sin
  que el visitante tenga que notar nada.
- Es decir: GitHub Pages y Cloudflare Pages aquí son **canales de
  previsualización gratuitos**, no necesariamente el destino final si el
  cliente decide continuar en Vercel con dominio propio. Cuando el cliente
  compre un dominio, la ruta más simple es agregarlo directo en el proyecto
  de Cloudflare Pages — el flujo de despliegue automático no cambia.

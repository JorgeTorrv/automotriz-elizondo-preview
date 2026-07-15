/**
 * basePath de despliegue (vacío en producción/Vercel).
 * Solo tiene valor en la rama de vista previa de GitHub Pages, donde
 * next.config.ts lo expone como NEXT_PUBLIC_BASE_PATH porque next/image con
 * `unoptimized:true` no antepone basePath a rutas estáticas automáticamente.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Antepone el basePath a una ruta absoluta (ej. "/resources/logo.png"). */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

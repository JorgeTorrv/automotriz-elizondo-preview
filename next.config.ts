import type { NextConfig } from "next";

// Exportación estática usada por las dos vistas previa gratuitas (GitHub
// Pages y Cloudflare Pages). La rama principal (para el despliegue
// definitivo en Vercel con dominio propio) no usa basePath ni output:"export".
//
// GitHub Pages sirve el sitio bajo /<repo>/, así que necesita basePath.
// Cloudflare Pages sirve cada proyecto en la raíz de su propio subdominio
// (*.pages.dev), así que ahí basePath debe quedar vacío. El workflow de
// GitHub Actions de la vista previa en GitHub Pages es el único que define
// GITHUB_PAGES="true" al hacer el build.
const repoName = "automotriz-elizondo-preview";
const isGithubPagesPreview = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPagesPreview ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  // Con unoptimized:true, next/image no antepone basePath a rutas estáticas
  // (bug conocido de exportación estática). Se expone como env pública para
  // que los componentes lo agreguen manualmente vía src/lib/basePath.ts.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// Configuración exclusiva de esta rama: exportación estática para la vista
// previa temporal en GitHub Pages. La rama principal (para el despliegue
// definitivo en Vercel) no usa basePath ni output:"export".
const repoName = "automotriz-elizondo-preview";

const basePath = `/${repoName}`;

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

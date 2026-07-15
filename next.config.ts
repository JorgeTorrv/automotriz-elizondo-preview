import type { NextConfig } from "next";

// Configuración exclusiva de esta rama: exportación estática para la vista
// previa temporal en GitHub Pages. La rama principal (para el despliegue
// definitivo en Vercel) no usa basePath ni output:"export".
const repoName = "automotriz-elizondo-preview";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/business";

// Requerido por output:"export" (exportación estática de esta rama de preview).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

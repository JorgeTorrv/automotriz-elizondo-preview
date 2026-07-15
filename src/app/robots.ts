import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/business";

// Requerido por output:"export" (exportación estática de esta rama de preview).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

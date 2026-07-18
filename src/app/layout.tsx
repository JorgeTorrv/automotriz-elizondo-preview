import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteMetadata, buildJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="es-MX" className={`${inter.variable} ${barlow.variable}`}>
      <head>
        {/*
          GitHub Pages caches index.html for 10 min with no way to override
          the header from the repo. A visitor loading a stale copy right
          after a new deploy can reference JS/CSS files removed by that
          deploy, leaving a blank page until they manually refresh. Detect
          the failed script/link load and force one silent reload instead.
        */}
        <Script id="stale-cache-recovery" strategy="beforeInteractive">
          {`
            (function () {
              var KEY = 'ae-stale-reload';
              window.addEventListener(
                'error',
                function (e) {
                  var t = e.target;
                  if (t && (t.tagName === 'SCRIPT' || t.tagName === 'LINK') && !sessionStorage.getItem(KEY)) {
                    sessionStorage.setItem(KEY, '1');
                    location.reload();
                  }
                },
                true
              );
              window.addEventListener('load', function () {
                setTimeout(function () {
                  sessionStorage.removeItem(KEY);
                }, 15000);
              });
            })();
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-fg antialiased">
        {/* Datos estructurados JSON-LD (Schema.org AutoRepair) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

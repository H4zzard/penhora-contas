import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { Tracking } from "@/components/tracking";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: { default: "Dr. Samuel Santos | Advocacia", template: "%s | Dr. Samuel Santos" },
  description: "Informação jurídica em Direito Civil, execuções e penhoras.",
  robots: siteConfig.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0b0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <CookieConsent />
        <Tracking gtmId={siteConfig.gtmId} />
      </body>
    </html>
  );
}

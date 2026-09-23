import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { siteConfig, themeProfiles } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,

  icons: {
    icon: siteConfig.brand.favicon,
  },

  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    locale: siteConfig.seo.locale,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: siteConfig.content.hero.image,
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
};

const initialTheme = siteConfig.theme.mode;
const initialThemeColors =
  themeProfiles[initialTheme];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: initialThemeColors.bg,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={
        siteConfig.seo.locale.startsWith("es")
          ? "es"
          : "en"
      }
      className={`theme-${initialTheme} ${geist.variable}`}
      data-theme={initialTheme}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
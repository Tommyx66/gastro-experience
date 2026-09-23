import type { Metadata, Viewport } from "next";

import { siteConfig, themeProfiles } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

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

const preHydrationThemeScript =
  `(()=>{` +
  `const map={restaurant:"dark",cafe:"light",brewery:"dark",bakery:"light",icecream:"light",bodegon:"hybrid",catering:"dark"};` +
  `const params=new URLSearchParams(window.location.search);` +
  `const type=params.get("type")||"restaurant";` +
  `const theme=map[type]||"dark";` +
  `const root=document.documentElement;` +
  `root.dataset.theme=theme;` +
  `root.classList.remove("theme-dark","theme-light","theme-hybrid","dark");` +
  `root.classList.add("theme-"+theme);` +
  `if(theme==="dark"){root.classList.add("dark");}` +
  `})();`;

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
      className={`theme-${initialTheme}`}
      data-theme={initialTheme}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              preHydrationThemeScript,
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
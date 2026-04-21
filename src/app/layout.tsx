import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PaletteToggle } from "@/components/layout/PaletteToggle";

const themeInitScript = `(function(){try{var p=localStorage.getItem('edinburgh_palette')||'swieca';document.documentElement.setAttribute('data-palette',p);var t=localStorage.getItem('edinburgh_theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edynburg — jeden dzień",
  description:
    "Prywatny towarzysz na jednodniową wycieczkę do Edynburga. Plan, historia, mapy, tramwaj.",
  manifest: "/manifest.json",
  applicationName: "Edynburg",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Edynburg",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${cormorant.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <PaletteToggle />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}

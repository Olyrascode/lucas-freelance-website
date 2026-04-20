import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SkipLink } from "@/components/SkipLink/SkipLink";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider/SmoothScrollProvider";
import {
  defaultDescription,
  defaultTitle,
  siteName,
  siteUrl,
} from "@/lib/metadata";
import { personSchema, stringifyJsonLd } from "@/lib/structured-data";
import "./globals.scss";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-body",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-mono",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const bodyClass = [
    manrope.variable,
    inter.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang="fr">
      <body className={bodyClass}>
        <SkipLink />
        <SmoothScrollProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(personSchema()) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucas-aufrere.com";

export const siteName = "Lucas Aufrère";
export const defaultTitle =
  "Lucas Aufrère — Développeur front-end créatif freelance";
export const defaultDescription =
  "Sites web sur-mesure, animations fluides, interfaces soignées. " +
  "Freelance basé à Clermont-Ferrand.";

export interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const ogTitle = `${title} · ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: "website",
      locale: "fr_FR",
      siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

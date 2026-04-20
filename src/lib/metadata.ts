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
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${siteName}`,
      description,
      url: canonical,
      type: "website",
      locale: "fr_FR",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteName}`,
      description,
    },
  };
}

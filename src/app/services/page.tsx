import type { Metadata } from "next";
import { buildPageMetadata, siteUrl } from "@/lib/metadata";
import {
  servicesBreadcrumbSchema,
  servicesFaqSchema,
  servicesItemListSchema,
  stringifyJsonLd,
} from "@/lib/structured-data";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Prestations — Sites web, animations & SEO",
    description:
      "Prestations front-end freelance : sites sur-mesure, animations GSAP, développement white-label pour agences, SEO technique. Devis sur mesure.",
    path: "/services",
  }),
  alternates: { canonical: `${siteUrl}/services` },
};

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      <ServicesContent />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(servicesItemListSchema()),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(servicesBreadcrumbSchema()),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(servicesFaqSchema()),
        }}
      />
    </>
  );
}

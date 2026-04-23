import type { Metadata } from "next";
import { buildPageMetadata, siteUrl } from "@/lib/metadata";
import {
  contactBreadcrumbSchema,
  contactPageSchema,
  stringifyJsonLd,
} from "@/lib/structured-data";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Contact — Demande de devis",
    description:
      "Contactez Lucas Aufrère pour un projet web sur-mesure : sites éditoriaux Next.js, animations GSAP, développement white-label pour agences, audit SEO technique. Réponse sous 48h ouvrées depuis Clermont-Ferrand.",
    path: "/contact",
  }),
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <ContactContent />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(contactPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(contactBreadcrumbSchema()),
        }}
      />
    </>
  );
}

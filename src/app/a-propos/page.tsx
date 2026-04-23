import type { Metadata } from "next";
import { buildPageMetadata, siteUrl } from "@/lib/metadata";
import {
  aboutBreadcrumbSchema,
  aboutPageSchema,
  stringifyJsonLd,
} from "@/lib/structured-data";
import { AProposContent } from "./AProposContent";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "À propos — Développeur front-end freelance",
    description:
      "Lucas Aufrère, développeur front-end créatif freelance basé à Clermont-Ferrand. Parcours en agence, approche éditoriale sur-mesure, stack Next.js / React / GSAP, collaborations régulières avec studios et agences.",
    path: "/a-propos",
  }),
  alternates: { canonical: `${siteUrl}/a-propos` },
};

export default function AProposPage(): React.ReactElement {
  return (
    <>
      <AProposContent />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(aboutPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(aboutBreadcrumbSchema()),
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder/PagePlaceholder";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Parlons de votre projet. Formulaire court pour un RDV découverte, réponse sous 48h ouvrées.",
  path: "/contact",
});

export default function ContactPage(): React.ReactElement {
  return (
    <PagePlaceholder
      index="04 / CONTACT"
      title="Contact"
      description="Formulaire de prise de contact — RDV découverte, réponse sous 48h ouvrées."
    />
  );
}

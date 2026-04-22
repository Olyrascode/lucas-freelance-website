import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Parlons de votre projet. Formulaire court pour un RDV découverte, réponse sous 48h ouvrées.",
  path: "/contact",
});

export default function ContactPage(): React.ReactElement {
  return <ContactContent />;
}

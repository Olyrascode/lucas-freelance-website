import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AProposContent } from "./AProposContent";

export const metadata: Metadata = buildPageMetadata({
  title: "À propos",
  description:
    "Développeur front-end freelance basé à Clermont-Ferrand. Parcours, approche, collaborations régulières.",
  path: "/a-propos",
});

export default function AProposPage(): React.ReactElement {
  return <AProposContent />;
}

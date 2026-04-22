import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Prestations front-end : sites sur-mesure, animations, développement white-label, SEO technique. Tarifs clairs, livrables nets.",
  path: "/services",
});

export default function ServicesPage(): React.ReactElement {
  return <ServicesContent />;
}

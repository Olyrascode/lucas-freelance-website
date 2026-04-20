import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder/PagePlaceholder";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Prestations front-end : sites sur-mesure, animations, développement white-label, SEO technique. Tarifs clairs, livrables nets.",
  path: "/services",
});

export default function ServicesPage(): React.ReactElement {
  return (
    <PagePlaceholder
      index="02 / SERVICES"
      title="Services"
      description="Sites sur-mesure, animations, white-label, SEO technique — quatre prestations avec tarifs de départ clairs."
    />
  );
}

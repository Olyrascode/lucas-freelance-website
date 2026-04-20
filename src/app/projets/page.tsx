import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder/PagePlaceholder";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projets",
  description:
    "Projets sélectionnés en développement front-end créatif : Dexnill Productions, Kengo Kuma, Jacquemus, Fyconic.",
  path: "/projets",
});

export default function ProjetsPage(): React.ReactElement {
  return (
    <PagePlaceholder
      index="01 / PROJETS"
      title="Projets"
      description="Sélection de projets récents — sites éditoriaux, études personnelles, laboratoires créatifs."
    />
  );
}

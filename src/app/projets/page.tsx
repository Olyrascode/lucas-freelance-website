import type { Metadata } from "next";
import { RotondeCanvas } from "@/components/projets/RotondeCanvas/RotondeCanvas";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projets",
  description:
    "Projets sélectionnés en développement front-end créatif : Dexnill Productions, Kengo Kuma, Jacquemus, Fyconic.",
  path: "/projets",
});

export default function ProjetsPage(): React.ReactElement {
  return <RotondeCanvas />;
}

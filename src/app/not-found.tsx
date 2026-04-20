import type { Metadata } from "next";
import { ErrorView } from "@/components/ErrorView/ErrorView";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound(): React.ReactElement {
  return (
    <ErrorView
      label="404"
      title="Page introuvable."
      description="Cette page n'existe pas ou a été déplacée."
      actions={[{ label: "Retour à l'accueil", href: "/" }]}
    />
  );
}

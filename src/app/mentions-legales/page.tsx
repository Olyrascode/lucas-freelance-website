import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder/PagePlaceholder";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales, identité de l'éditeur, hébergement, sous-traitants et politique de confidentialité.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage(): React.ReactElement {
  return (
    <PagePlaceholder
      index="— MENTIONS LÉGALES"
      title="Mentions légales"
      description="Éditeur, hébergement, sous-traitants (Vercel Analytics), politique de confidentialité."
    />
  );
}

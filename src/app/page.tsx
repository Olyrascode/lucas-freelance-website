import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero/Hero";
import { Philosophy } from "@/components/home/Philosophy/Philosophy";
import { Approche } from "@/components/home/Approche/Approche";
import { SelectedProjects } from "@/components/home/SelectedProjects/SelectedProjects";
import { Services } from "@/components/home/Services/Services";
import { Collaborations } from "@/components/home/Collaborations/Collaborations";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Lucas Aufrère — Développeur front-end créatif freelance",
  description:
    "Sites sur-mesure, animations fluides, interfaces soignées. Basé à Clermont-Ferrand, missions partout en France et à l'international.",
  path: "/",
});

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Philosophy />
      <Approche />
      <SelectedProjects />
      <Services />
      <Collaborations />
    </>
  );
}

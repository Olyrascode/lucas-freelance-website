export interface Project {
  readonly slug: string;
  readonly index: string;
  readonly name: string;
  readonly year: string;
  readonly tags: readonly string[];
  readonly kind: string;
  readonly stack: string;
  readonly role: string;
  readonly href: string;
  // Optional external URL — populated when the project is publicly live.
  readonly liveUrl?: string;
  readonly image: string;
  readonly alt: string;
  readonly summary: string;
  readonly description: string;
  // Comma-separated keywords used in the CreativeWork schema.
  readonly schemaKeywords: string;
  // Optional in-detail gallery. First item's `src` should equal `image`
  // (matches the rotonde plane). Each item carries its own caption,
  // surfaced in the left text column as the user scrolls past the image.
  // For non-first slides, `title` (and optionally `subtitle`) replace
  // the project name + role in the left column header — keeps the same
  // visual structure but turns each frame into its own little story.
  readonly gallery?: readonly {
    readonly src: string;
    readonly title?: string;
    readonly subtitle?: string;
    readonly caption: string;
  }[];
}

// The four canonical projects — used by the SEO fallback section, the
// CollectionPage / CreativeWork JSON-LD schemas, and as the seed for the
// 8-slot rotonde ring (each project is duplicated below to densify the
// 3D carousel without inventing extra entries).
export const baseProjects: readonly Project[] = [
  {
    slug: "dexnill",
    index: "01",
    name: "Dexnill Productions",
    year: "2025",
    tags: ["Client", "Studio créatif"],
    kind: "Site sur-mesure",
    stack: "Next.js · GSAP · Lenis",
    role: "Direction front-end & intégration",
    href: "/projets/dexnill",
    liveUrl: "https://dexnill.com",
    image: "/projetSlider/dexnill-productions-lucas-aufrere.webp",
    alt: "Aperçu du projet Dexnill Productions",
    summary:
      "Site vitrine d'un studio de production vidéo, pensé comme un objet éditorial sombre.",
    description:
      "Un site sur-mesure pour Dexnill Productions, studio vidéo. Typographie massive, transitions de pages, intégration soignée des showreels. Next.js, GSAP, Lenis — build performance Lighthouse 95+.",
    schemaKeywords: "Next.js, GSAP, Lenis, site éditorial, animations",
  },
  {
    slug: "kengo-kuma",
    index: "02",
    name: "Kengo Kuma",
    year: "2025",
    tags: ["Étude", "Architecture"],
    kind: "Concept éditorial",
    stack: "Next.js · GSAP",
    role: "Étude personnelle — design & front-end",
    href: "/projets/kengo-kuma",
    image: "/projetSlider/kengo-kuma-projet-lucas-aufrere.webp",
    alt: "Aperçu du projet Kengo Kuma",
    summary:
      "Exploration d'un site d'agence d'architecture autour des matières, du vide et du rythme de lecture.",
    description:
      "Étude de cas personnelle autour de l'univers Kengo Kuma. Composition en colonnes généreuses, typographie serif expressive, rythme de scroll contrôlé par ScrollTrigger. Exploration du vide et du poids des photos.",
    schemaKeywords: "Next.js, GSAP, canvas, direction artistique",
    gallery: [
      {
        src: "/projetSlider/kengo-kuma-projet-lucas-aufrere.webp",
        caption:
          "Concept éditorial autour de l'univers Kengo Kuma. Composition en colonnes généreuses, typographie serif expressive, rythme de scroll contrôlé par ScrollTrigger.",
      },
      {
        src: "/projetSlider/kengokuma/kengo-kuma-home.webp",
        title: "Page d'accueil",
        subtitle: "Hero photo plein cadre",
        caption:
          "Photo plein cadre, micro-interactions au scroll, vide assumé qui laisse respirer l'image. Premier contact pensé comme une couverture de magazine.",
      },
      {
        src: "/projetSlider/kengokuma/kengo-kuma-card.webp",
        title: "Carte de projet",
        subtitle: "Index d'architecture",
        caption:
          "Hover lift discret, transitions de page entre les fiches. Index dense, lecture rapide, hiérarchie typographique stricte.",
      },
      {
        src: "/projetSlider/kengokuma/kengo-kuma-plan.webp",
        title: "Vue plan technique",
        subtitle: "Zoom narratif",
        caption:
          "Zoom progressif déclenché par ScrollTrigger, lecture lente de la matière. Le scroll devient l'outil de découverte, pas un simple déplacement.",
      },
      {
        src: "/projetSlider/kengokuma/kengo-kuma-projet.webp",
        title: "Page projet",
        subtitle: "Galerie éditoriale",
        caption:
          "Galerie photo plein cadre, captions éditoriales, rythme contrôlé. Chaque image respire, chaque légende a sa place dans le flux.",
      },
    ],
  },
  {
    slug: "jacquemus",
    index: "03",
    name: "Jacquemus",
    year: "2025",
    tags: ["Étude", "Mode"],
    kind: "Direction front-end",
    stack: "Next.js · GSAP",
    role: "Étude personnelle — direction & front-end",
    href: "/projets/jacquemus",
    image: "/projetSlider/jacquemus-projet-lucas-aufrere.webp",
    alt: "Aperçu du projet Jacquemus",
    summary:
      "Concept e-commerce mode, direction éditoriale forte, image plein cadre et navigation tactile.",
    description:
      "Étude d'une boutique Jacquemus repensée comme un magazine mode. Hero plein cadre, galerie produits façon portfolio, transitions atmosphériques entre sections. Focus sur le rythme et la lenteur assumée.",
    schemaKeywords: "Next.js, GSAP, typographie éditoriale",
    gallery: [
      {
        src: "/projetSlider/jacquemus-projet-lucas-aufrere.webp",
        caption:
          "Concept e-commerce mode — direction éditoriale forte, image plein cadre, navigation tactile et lenteur assumée.",
      },
      {
        src: "/projetSlider/jacquemus/jacquemus-paysan.webp",
        title: "Hero produit",
        subtitle: "Photographie pleine page",
        caption:
          "Photographie plein cadre, transitions atmosphériques entre sections. Le produit est mis en scène comme un sujet, pas comme un article de catalogue.",
      },
      {
        src: "/projetSlider/jacquemus/jacquemus-paysan-edito.webp",
        title: "Layout éditorial",
        subtitle: "Composition magazine",
        caption:
          "Typographie serif expressive, composition magazine, alignements asymétriques. Le rythme typographique guide la lecture, pas la grille.",
      },
      {
        src: "/projetSlider/jacquemus/jacquemus-edito-2.webp",
        title: "Page galerie",
        subtitle: "Portfolio produit",
        caption:
          "Galerie produits façon portfolio, focus sur le rythme et l'espace blanc. Chaque image a sa propre temporalité de lecture.",
      },
      {
        src: "/projetSlider/jacquemus/jacquemus-boutique-layer.webp",
        title: "Layer boutique",
        subtitle: "Overlay produit",
        caption:
          "Overlay produit avec animation de transition douce, sortie par effacement vertical. La boutique reste un détail, jamais le sujet principal.",
      },
      {
        src: "/projetSlider/jacquemus/jacquemus-produit-layer.webp",
        title: "Détail produit",
        subtitle: "Vue immersive",
        caption:
          "Vue immersive, micro-interactions au hover, hiérarchie typographique soignée. Chaque détail invite à rester un peu plus longtemps.",
      },
    ],
  },
  {
    slug: "fyconic",
    index: "04",
    name: "Fyconic",
    year: "2025",
    tags: ["Laboratoire", "R&D"],
    kind: "Exploration animation",
    stack: "React · GSAP · WebGL-lite",
    role: "Laboratoire créatif personnel",
    href: "/projets/fyconic",
    image: "/projetSlider/fyconic-projet-lucas-aufrere.webp",
    alt: "Aperçu du projet Fyconic",
    summary:
      "Laboratoire créatif personnel dédié aux explorations d'animation et de micro-interactions.",
    description:
      "Fyconic est mon laboratoire créatif. Des prototypes courts explorant la typographie en mouvement, le scroll narratif, les transitions atmosphériques. Chaque itération sert de terrain d'expérimentation pour les projets clients.",
    liveUrl: "https://fyconic.fr",
    schemaKeywords: "React, GSAP, WebGL, R&D",
  },
];

// 8 slots — base projects doubled (with -bis slugs) to densify the ring
// and cut the angular gap between adjacent columns in half.
export const projects: readonly Project[] = [
  ...baseProjects,
  ...baseProjects.map((p, i) => ({
    ...p,
    slug: `${p.slug}-bis`,
    index: (baseProjects.length + i + 1).toString().padStart(2, "0"),
    href: `${p.href}-bis`,
  })),
];

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

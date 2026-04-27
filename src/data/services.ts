export type ServiceIconKind = "build" | "motion" | "handshake" | "audit";

export interface ServicePricing {
  // Numeric minimum used by the JSON-LD Offer schema.
  readonly minPriceEur: number;
  // Human-readable label rendered in the markup.
  readonly label: string;
}

export interface ServiceData {
  readonly slug: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly scope: readonly string[];
  readonly deliverables: readonly string[];
  readonly pricing: ServicePricing;
  // Optional — leave undefined for services that don't have a typical
  // delivery window (e.g. TJM-based missions).
  readonly timeline?: string;
  readonly iconKind: ServiceIconKind;
  readonly schemaServiceType: string;
}

export const services: readonly ServiceData[] = [
  {
    slug: "sites-sur-mesure",
    index: "S.01",
    title: "Sites web sur-mesure",
    description:
      "Conception et développement complet d’un site web pensé comme un objet éditorial. De l’architecture front-end à la mise en ligne, en collaboration avec votre équipe ou la mienne.",
    scope: [
      "Architecture Next.js + React 19, TypeScript strict",
      "Intégration design system + SCSS Modules",
      "Animations GSAP, scroll narratif, transitions soignées",
      "SEO technique, métadonnées, structured data",
      "Performance Lighthouse, Core Web Vitals",
    ],
    deliverables: [
      "Code source versionné Git",
      "Déploiement Vercel ou hébergeur de votre choix",
      "Documentation projet & passation",
    ],
    pricing: { minPriceEur: 3500, label: "À partir de 3 500 €" },
    timeline: "1 à 8 semaines selon le périmètre",
    iconKind: "build",
    schemaServiceType: "Web design",
  },
  {
    slug: "animations-interactions",
    index: "S.02",
    title: "Animations & interactions web",
    description:
      "Mission focalisée sur la couche animation d’un site existant ou en cours. Reveal typographique, scroll-tied, micro-interactions, transitions de page.",
    scope: [
      "Audit des animations existantes",
      "GSAP 3 + ScrollTrigger + Lenis",
      "Split-line mask reveal, scroll sequences canvas",
      "Respect prefers-reduced-motion",
      "Optimisation per-frame, will-change ciblé",
    ],
    deliverables: [
      "Composants animés intégrés au repo",
      "Documentation des patterns utilisés",
      "Guide d’extension pour votre équipe",
    ],
    pricing: { minPriceEur: 450, label: "TJM 450 €" },
    iconKind: "motion",
    schemaServiceType: "Motion design",
  },
  {
    slug: "white-label",
    index: "S.03",
    title: "Front-end white-label",
    description:
      "J’interviens en renfort pour agences et studios, sous votre nom, sur vos deadlines. Brief direct avec vos chefs de projet, livraison alignée sur vos process.",
    scope: [
      "Intégration React / Next.js sur design existant",
      "Travail sur design system en place",
      "Pull requests sur votre repo",
      "Revue de code + commentaires",
      "Disponibilité daily standup si besoin",
    ],
    deliverables: [
      "PRs prêtes à merger sur votre branche",
      "Code conforme à vos conventions",
      "Reporting régulier sur l’avancée",
    ],
    pricing: { minPriceEur: 450, label: "TJM 450 € (sous-traitance)" },
    timeline: "À la mission, daily ou hebdomadaire",
    iconKind: "handshake",
    schemaServiceType: "Subcontracting",
  },
  {
    slug: "seo-performance",
    index: "S.04",
    title: "SEO technique & performance",
    description:
      "Audit complet et plan d’action priorisé pour un site existant. Métriques claires, livrables actionables. Implémentation des correctifs en option.",
    scope: [
      "Audit Lighthouse, PageSpeed, WebPageTest",
      "Analyse Core Web Vitals (LCP, INP, CLS)",
      "Audit structured data + sitemap + robots",
      "Vérification accessibilité (WCAG 2.1 AA)",
      "Recommandations rédigées et hiérarchisées",
    ],
    deliverables: [
      "Rapport d’audit PDF + slides",
      "Plan d’action priorisé par impact",
      "Implémentation au forfait sur demande",
    ],
    pricing: { minPriceEur: 600, label: "Audit à partir de 600 €" },
    timeline: "1 à 2 semaines pour l’audit, forfait correctifs sur demande",
    iconKind: "audit",
    schemaServiceType: "SEO consulting",
  },
];

export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const faqEntries: readonly FaqEntry[] = [
  {
    id: "tarifs-site-sur-mesure",
    question: "Quels sont vos tarifs pour un site sur-mesure ?",
    answer:
      "Un site sur-mesure démarre autour de 3 500 € et peut monter selon le périmètre — nombre de pages, complexité des animations, intégration CMS, multilingue. Chaque devis est rédigé après un premier échange de cadrage gratuit, avec un budget détaillé poste par poste.",
  },
  {
    id: "distance-presentiel",
    question: "Travaillez-vous à distance ou en présentiel ?",
    answer:
      "Je travaille principalement en distanciel depuis Clermont-Ferrand, avec des outils de collaboration éprouvés (Slack, Linear, Figma, daily visio). Je me déplace ponctuellement pour les kick-off ou les ateliers en région Auvergne-Rhône-Alpes, et plus largement en France pour des missions longues.",
  },
  {
    id: "white-label",
    question: "Qu’est-ce que le développement white-label ?",
    answer:
      "Je rejoins votre studio ou agence en renfort technique, sous votre marque. Vous gardez la relation client et la direction de projet ; je livre le code dans votre repo, à votre stack et à vos conventions, en participant aux daily si besoin. Aucune mention de mon nom dans la livraison finale.",
  },
  {
    id: "delais-creation",
    question: "Combien de temps prend la création d’un site ?",
    answer:
      "Comptez 1 à 8 semaines pour un site sur-mesure, selon le nombre de pages et la richesse des animations. Une landing focalisée peut sortir en 1 à 2 semaines ; un site éditorial complet avec CMS et multilingue plutôt 8 à 10 semaines. Je donne un rétro-planning ferme dès la signature du devis.",
  },
  {
    id: "maintenance-livraison",
    question: "Proposez-vous de la maintenance après livraison ?",
    answer:
      "Oui, soit en forfait mensuel (mises à jour techniques, corrections, petites évolutions), soit à la demande au TJM. Je documente tout le code à la livraison pour que votre équipe puisse aussi reprendre la main sans dépendance.",
  },
];

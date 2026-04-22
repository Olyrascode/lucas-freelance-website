"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.scss";

interface Service {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly scope: readonly string[];
  readonly deliverables: readonly string[];
}

const services: readonly Service[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

function HeroBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });
  return (
    <header className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.heroEyebrow} data-lines>
          02 / Services
        </p>
        <h1 className={styles.heroTitle} data-lines>
          Services
        </h1>
        <p className={styles.heroLead} data-lines>
          Quatre formats clairs, calés sur le périmètre du projet. Chaque
          devis est établi sur mesure après un premier échange — pas de
          tarif au catalogue, pas de paquet imposé.
        </p>
      </div>
    </header>
  );
}

interface ServiceBlockProps {
  readonly service: Service;
}

function ServiceBlock({ service }: ServiceBlockProps): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  return (
    <section
      className={styles.section}
      aria-labelledby={`service-${service.index}`}
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.serviceGrid}>
          <p className={styles.sectionIndex} data-lines>
            {service.index}
          </p>
          <h2
            id={`service-${service.index}`}
            className={styles.sectionTitle}
            data-lines
          >
            {service.title}
          </h2>
          <div className={styles.serviceBody}>
            <p className={styles.serviceDesc} data-lines>
              {service.description}
            </p>
            <div className={styles.lists}>
              <div className={styles.listBlock}>
                <p className={styles.listLabel} data-lines>
                  Périmètre
                </p>
                <ul className={styles.bullets}>
                  {service.scope.map((item) => (
                    <li key={item} data-lines>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.listBlock}>
                <p className={styles.listLabel} data-lines>
                  Livrables
                </p>
                <ul className={styles.bullets}>
                  {service.deliverables.map((item) => (
                    <li key={item} data-lines>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesContent(): React.ReactElement {
  return (
    <article className={styles.root}>
      <HeroBlock />
      {services.map((service) => (
        <ServiceBlock key={service.index} service={service} />
      ))}
    </article>
  );
}

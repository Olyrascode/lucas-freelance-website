"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Services.module.scss";

interface Service {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
}

const services: readonly Service[] = [
  {
    index: "S.01",
    title: "Sites web sur-mesure",
    description:
      "Un site unique, pensé pour votre marque. De la direction front-end à la mise en ligne.",
    bullets: ["Next.js + SCSS Modules", "Animations GSAP sobres", "SEO & Core Web Vitals"],
  },
  {
    index: "S.02",
    title: "Animations & interactions web",
    description:
      "Scroll narratif, reveals typographiques, transitions soignées. Pour sites existants ou nouveaux.",
    bullets: ["GSAP ScrollTrigger", "Lenis smooth scroll", "Respect reduced-motion"],
  },
  {
    index: "S.03",
    title: "Front-end white-label",
    description:
      "J\u2019interviens en renfort pour agences et studios, sous votre nom, sur vos deadlines.",
    bullets: ["Intégration React / Next", "Design system en place", "Revue de code"],
  },
  {
    index: "S.04",
    title: "SEO technique & performance",
    description:
      "Audit et optimisation d\u2019un site existant. Métriques claires, actions priorisées.",
    bullets: ["Lighthouse & PageSpeed", "Structured data", "Recommandations rédigées"],
  },
];

export function Services(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.06 });

  return (
    <section
      className={styles.root}
      ref={ref}
      aria-labelledby="services-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.index} data-lines>
            04 / 06
          </p>
          <h2 id="services-title" className={styles.title} data-lines>
            Prestations
          </h2>
          <p className={styles.note} data-lines>
            Quatre formats clairs, calés sur le périmètre du projet.
            Chaque devis est établi sur mesure après un premier échange.
          </p>
        </header>

        <ol className={styles.list}>
          {services.map((service) => (
            <li key={service.index} className={styles.item}>
              <div className={styles.itemInner}>
                <header className={styles.itemHeader}>
                  <span className={styles.itemIndex} data-lines>
                    {service.index}
                  </span>
                  <h3 className={styles.itemTitle} data-lines>
                    {service.title}
                  </h3>
                </header>

                <p className={styles.itemDesc} data-lines>
                  {service.description}
                </p>

                <ul className={styles.bullets}>
                  {service.bullets.map((b) => (
                    <li key={b} data-lines>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <footer className={styles.footer}>
          <p className={styles.maintenance} data-lines>
            Maintenance &amp; évolutions continues disponibles au mois.
          </p>
          <Link href="/services" className={styles.detailsLink}>
            <span>Voir le détail des prestations</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </footer>
      </div>
    </section>
  );
}

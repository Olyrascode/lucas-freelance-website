"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.scss";

interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frameworks & langages",
    items: ["Next.js 16", "React 19", "TypeScript strict", "SCSS Modules"],
  },
  {
    title: "Animations & motion",
    items: ["GSAP 3", "ScrollTrigger", "Lenis smooth scroll", "Motion (Framer)"],
  },
  {
    title: "3D & WebGL",
    items: ["Three.js", "React Three Fiber", "drei", "shader programs"],
  },
  {
    title: "SEO & performance",
    items: [
      "Core Web Vitals (LCP, INP, CLS)",
      "Structured data JSON-LD",
      "Lighthouse / PageSpeed",
      "Accessibilité WCAG 2.1",
    ],
  },
];

function HeroBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });
  return (
    <header className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.heroEyebrow} data-lines>
          03 / À propos
        </p>
        <h1 className={styles.heroTitle} data-lines>
          À propos
        </h1>
        <p className={styles.heroLead} data-lines>
          Je suis Lucas Aufrère, développeur front-end freelance basé à
          Clermont-Ferrand. Je conçois des sites web sur-mesure depuis
          plusieurs années, avec une exigence constante sur la qualité
          technique, la performance et la finition visuelle.
        </p>
      </div>
    </header>
  );
}

function ApprocheBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section className={styles.section} aria-labelledby="approche" ref={ref}>
      <div className={styles.inner}>
        <p className={styles.sectionIndex} data-lines>
          A.01
        </p>
        <h2 id="approche" className={styles.sectionTitle} data-lines>
          Mon approche
        </h2>
        <div className={styles.sectionBody}>
          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Méthode de travail
            </h3>
            <p data-lines>
              Je privilégie le sur-mesure. Chaque projet est unique, pensé
              selon le contexte du client, son audience et ses contraintes.
              Je ne livre pas de templates recyclés : je construis des sites
              adaptés à leur usage réel, en collaboration étroite avec les
              équipes design et SEO côté client.
            </p>
          </div>

          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Stack technique
            </h3>
            <p data-lines>
              Mon cœur de métier, c&apos;est le front-end. Next.js, React,
              TypeScript, GSAP, Lenis. J&apos;accorde une attention
              particulière aux animations web, au SEO technique et à la
              performance Core Web Vitals. Pour les parties back-end plus
              complexes, je collabore avec des développeurs spécialisés ou
              j&apos;utilise des solutions adaptées (Supabase, CMS headless)
              selon les besoins du projet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParcoursBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section className={styles.section} aria-labelledby="parcours" ref={ref}>
      <div className={styles.inner}>
        <p className={styles.sectionIndex} data-lines>
          A.02
        </p>
        <h2 id="parcours" className={styles.sectionTitle} data-lines>
          Parcours
        </h2>
        <div className={styles.sectionBody}>
          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Expérience en agence
            </h3>
            <p data-lines>
              Avant de me lancer en freelance fin 2023, j&apos;ai travaillé
              plusieurs années comme développeur en agence web. J&apos;ai
              été impliqué sur des dizaines de projets clients variés —
              e-commerce, vitrines, refontes — en collaboration avec des
              équipes design et SEO. Cette expérience m&apos;a permis de
              construire une vraie rigueur technique : performance,
              accessibilité, SEO technique, gestion de projet en équipe.
            </p>
          </div>

          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Aujourd&apos;hui
            </h3>
            <p data-lines>
              Depuis 2023, je travaille sous mon propre nom avec des clients
              en direct, et à travers Fyconic, mon laboratoire créatif
              personnel dédié à l&apos;exploration de projets plus
              conceptuels. Mes missions vont du site sur-mesure pour studio
              à la sous-traitance white-label pour agences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollabBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      className={styles.section}
      aria-labelledby="collaborations"
      ref={ref}
    >
      <div className={styles.inner}>
        <p className={styles.sectionIndex} data-lines>
          A.03
        </p>
        <h2 id="collaborations" className={styles.sectionTitle} data-lines>
          Collaborations
        </h2>
        <div className={styles.sectionBody}>
          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Partenaires créatifs
            </h3>
            <p data-lines>
              Je travaille principalement en solo, mais pour les projets qui
              le nécessitent, je collabore avec Axelle (designer UI/UX) et
              Samuel (photographe, vidéaste). Deux créatifs de confiance
              avec qui je partage une vision commune de la qualité.
            </p>
          </div>

          <div className={styles.subBlock}>
            <h3 className={styles.subHeading} data-lines>
              Mode de travail
            </h3>
            <p data-lines>
              Mes clients sont basés partout en France et à
              l&apos;international. Le distanciel fait partie de mon
              quotidien depuis toujours, sans jamais compromettre la qualité
              d&apos;un projet. Outils collaboratifs, points hebdomadaires,
              livraisons rythmées et documentées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompetencesBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      className={styles.section}
      aria-labelledby="competences"
      ref={ref}
    >
      <div className={styles.inner}>
        <p className={styles.sectionIndex} data-lines>
          A.04
        </p>
        <h2 id="competences" className={styles.sectionTitle} data-lines>
          Compétences clés
        </h2>
        <div className={styles.sectionBody}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.subBlock}>
              <h3 className={styles.subHeading} data-lines>
                {group.title}
              </h3>
              <ul className={styles.skillChips} aria-label={group.title}>
                {group.items.map((item) => (
                  <li key={item} className={styles.skillChip} data-lines>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AProposContent(): React.ReactElement {
  return (
    <article className={styles.root}>
      <HeroBlock />
      <ApprocheBlock />
      <ParcoursBlock />
      <CollabBlock />
      <CompetencesBlock />
    </article>
  );
}

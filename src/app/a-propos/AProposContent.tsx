"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.scss";

function HeroBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });
  return (
    <header className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.heroEyebrow} data-lines>
          À propos · Profil
        </p>
        <h1 className={styles.heroTitle} data-lines>
          À propos
        </h1>
        <p className={styles.heroLead} data-lines>
          Je suis Lucas Aufrère, développeur front-end freelance basé à
          Clermont-Ferrand. Je conçois des sites web depuis plusieurs
          années, avec une exigence constante sur la qualité technique et
          la finition visuelle.
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
          <p data-lines>
            Je privilégie le sur-mesure. Chaque projet est unique, pensé
            selon le contexte du client, son audience et ses contraintes.
            Je ne livre pas de templates recyclés : je construis des sites
            adaptés à leur usage réel.
          </p>
          <p data-lines>
            Mon cœur de métier, c&apos;est le front-end. Next.js, React,
            TypeScript, GSAP, Lenis. J&apos;accorde une attention
            particulière aux animations web, au SEO technique et à la
            performance. Pour les parties back-end plus complexes, je
            collabore avec des développeurs spécialisés ou j&apos;utilise
            des solutions adaptées (Supabase, CMS headless) selon les
            besoins du projet.
          </p>
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
          <p data-lines>
            Avant de me lancer en freelance fin 2024, j&apos;ai travaillé
            plusieurs années comme développeur en agence web. J&apos;ai été
            impliqué sur des dizaines de projets clients variés :
            e-commerce, vitrines, refontes — en collaboration avec des
            équipes design et SEO. Cette expérience m&apos;a permis de
            construire une vraie rigueur technique : performance,
            accessibilité, SEO technique, gestion de projet en équipe.
          </p>
          <p data-lines>
            Depuis 2023, je travaille sous mon propre nom avec des clients
            en direct, et à travers Fyconic, mon laboratoire créatif
            personnel dédié à l&apos;exploration de projets plus
            conceptuels.
          </p>
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
          <p data-lines>
            Je travaille principalement en solo, mais pour les projets qui
            le nécessitent, je collabore avec Axelle (designer UI/UX) et
            Samuel (photographe, vidéaste). Deux créatifs de confiance
            avec qui je partage une vision commune de la qualité.
          </p>
          <p data-lines>
            Mes clients sont basés partout en France et à
            l&apos;international. Le distanciel fait partie de mon
            quotidien depuis toujours, sans jamais compromettre la qualité
            d&apos;un projet.
          </p>
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
    </article>
  );
}

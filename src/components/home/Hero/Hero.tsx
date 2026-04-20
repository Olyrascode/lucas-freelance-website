"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Hero.module.scss";

export function Hero(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12, duration: 0.9 });

  return (
    <section className={styles.root} ref={ref} aria-labelledby="hero-title">
      <div className={styles.portrait} aria-hidden="true">
        <Image
          src="/lucas-hero_comp.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 0px, (max-width: 1023px) 40vw, 38vw"
          className={styles.portraitImg}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.topRight}>
          <div className={styles.ctas} data-reveal>
            <Link href="/projets" className={styles.ctaPrimary}>
              <span>Voir les projets</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Me contacter
            </Link>
          </div>
          <p className={styles.lead} data-lines>
            Développeur front-end créatif freelance. Sites sur-mesure,
            animations fluides et interfaces soignées pensées comme un
            objet éditorial.
          </p>
        </div>

        <p className={styles.titleEyebrow} data-lines>
          Développeur front-end créatif freelance
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleWord} data-lines>
            LUCAS
          </span>
          <span className={styles.titleWord} data-lines>
            AUFRERE
          </span>
        </h1>

        <div className={styles.divider} data-reveal aria-hidden="true" />
      </div>
    </section>
  );
}

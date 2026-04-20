"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Approche.module.scss";

interface Skill {
  readonly index: string;
  readonly label: string;
  readonly detail: string;
}

const skills: readonly Skill[] = [
  {
    index: "A.01",
    label: "Front-end moderne",
    detail: "Next.js, React, TypeScript strict, architecture soignée.",
  },
  {
    index: "A.02",
    label: "Animation & scroll",
    detail: "GSAP, ScrollTrigger, Lenis. Rythme sobre, jamais décoratif.",
  },
  {
    index: "A.03",
    label: "Design éditorial",
    detail: "Typographie, composition, hiérarchie. Le texte fait le travail.",
  },
  {
    index: "A.04",
    label: "SEO & performance",
    detail: "Core Web Vitals, structured data, Lighthouse 95+ cible.",
  },
];

export function Approche(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.06 });

  return (
    <section className={styles.root} ref={ref} aria-label="Approche">
      <div className={styles.inner}>
        <p className={styles.lead} data-lines>
          Je travaille seul, de bout en bout, pour un petit nombre de
          projets par an. Chaque site est pensé comme un objet précis :
          performance, lisibilité, détails typographiques, animation au
          service du propos. Pas de système importé, pas de UI kit —
          chaque ligne est écrite pour le projet qui m&apos;occupe.
        </p>

        <div className={styles.right}>
          <p className={styles.index} data-lines>
            02 / 06
          </p>
          <ul className={styles.skills}>
            {skills.map((skill) => (
              <li key={skill.index} className={styles.skill} data-reveal>
                <span className={styles.skillIndex}>{skill.index}</span>
                <span className={styles.skillLabel}>{skill.label}</span>
                <span className={styles.skillDetail}>{skill.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

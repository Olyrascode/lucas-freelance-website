"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Philosophy.module.scss";

export function Philosophy(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      className={styles.root}
      ref={ref}
      aria-labelledby="philosophy-title"
    >
      <div className={styles.inner}>
        <h2 className={styles.label} data-lines id="philosophy-title">
          Philosophie
        </h2>
        <p className={styles.body} data-lines>
          Je crois que la retenue est le signe d&apos;un site bien pensé.
          Moins d&apos;effets, plus d&apos;intention : chaque ligne de code
          sert la lecture, chaque animation sert le rythme. L&apos;élégance
          naît de la précision des détails, pas de leur accumulation.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Collaborations.module.scss";

interface Collaborator {
  readonly index: string;
  readonly name: string;
  readonly role: string;
  readonly kind: string;
}

const collaborators: readonly Collaborator[] = [
  {
    index: "C.01",
    name: "Axelle",
    role: "Direction artistique & design",
    kind: "Projets hybrides — design sur-mesure + intégration soignée",
  },
  {
    index: "C.02",
    name: "Samuel",
    role: "Direction créative & 3D",
    kind: "Missions où le motion et la 3D deviennent narratifs",
  },
];

export function Collaborations(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      className={styles.root}
      ref={ref}
      aria-labelledby="collab-title"
    >
      <div className={styles.inner}>
        <p className={styles.index} data-lines>
          05 / 06
        </p>
        <h2 id="collab-title" className={styles.title} data-lines>
          Collaborations
        </h2>

        <p className={styles.lead} data-lines>
          Je travaille seul sur la majorité des projets. Pour les missions
          qui demandent une direction artistique ou une dimension 3D plus
          marquée, je m&apos;associe ponctuellement avec deux personnes
          dont la pratique complète la mienne.
        </p>

        <ul className={styles.list}>
          {collaborators.map((c) => (
            <li key={c.index} className={styles.item}>
              <span className={styles.itemIndex} data-lines>
                {c.index}
              </span>
              <div className={styles.itemBody}>
                <h3 className={styles.itemName} data-lines>
                  {c.name}
                </h3>
                <p className={styles.itemRole} data-lines>
                  {c.role}
                </p>
                <p className={styles.itemKind} data-lines>
                  {c.kind}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

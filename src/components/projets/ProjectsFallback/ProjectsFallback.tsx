import Image from "next/image";
import { baseProjects } from "@/data/projects";
import styles from "./ProjectsFallback.module.scss";

// SEO-oriented fallback that mirrors the rotonde's content as crawlable
// HTML — the 3D carousel above is rendered entirely inside a WebGL
// canvas, so without this section Google sees the page as nearly empty.
// Visible to users when they scroll past the rotonde, structured for
// machines: each project is an <article> with a Next/Image, h3, meta
// row, descriptive paragraph and stack list.
export function ProjectsFallback(): React.ReactElement {
  return (
    <section
      className={styles.root}
      aria-labelledby="projets-fallback-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Vue détaillée</p>
          <h2
            id="projets-fallback-title"
            className={styles.title}
          >
            Tous les projets
          </h2>
          <p className={styles.lead}>
            Une lecture linéaire des projets présentés dans la rotonde —
            sites éditoriaux, animations GSAP et expériences 3D portées
            de bout en bout par Lucas Aufrère.
          </p>
        </header>

        <ol className={styles.grid} aria-label="Liste des projets">
          {baseProjects.map((project, index) => {
            const isExternal = Boolean(project.liveUrl);
            const linkHref = project.liveUrl ?? project.href;
            return (
              <li key={project.slug} className={styles.cell}>
                <article className={styles.card} aria-labelledby={`project-${project.slug}-title`}>
                  <div className={styles.media}>
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.summary}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={index === 0}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.body}>
                    <p className={styles.meta}>
                      <span className={styles.metaIndex}>{project.index}</span>
                      <span className={styles.metaSep}>·</span>
                      <span>{project.kind}</span>
                      <span className={styles.metaSep}>·</span>
                      <span>{project.year}</span>
                    </p>
                    <h3
                      id={`project-${project.slug}-title`}
                      className={styles.name}
                    >
                      {project.name}
                    </h3>
                    <p className={styles.role}>{project.role}</p>
                    <p className={styles.description}>{project.description}</p>
                    <ul className={styles.stack} aria-label="Stack technique">
                      {project.stack.split("·").map((item) => {
                        const label = item.trim();
                        if (!label) return null;
                        return (
                          <li key={label} className={styles.stackItem}>
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                    {linkHref && isExternal ? (
                      <a
                        href={linkHref}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Voir le projet en ligne</span>
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 17L17 7M9 7h8v8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

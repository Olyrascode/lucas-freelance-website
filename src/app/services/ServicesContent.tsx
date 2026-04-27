"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faqEntries, services, type ServiceData } from "@/data/services";
import { FaqItem } from "./FaqItem";
import styles from "./page.module.scss";

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
  readonly service: ServiceData;
}

function ServiceBlock({ service }: ServiceBlockProps): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  const titleId = `service-${service.slug}-title`;
  return (
    <section
      className={styles.section}
      aria-labelledby={titleId}
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.serviceGrid}>
          <p className={styles.sectionIndex} data-lines>
            {service.index}
          </p>
          <h2
            id={titleId}
            className={styles.sectionTitle}
            data-lines
          >
            {service.title}
          </h2>
          <div className={styles.serviceBody}>
            <p className={styles.serviceDesc} data-lines>
              {service.description}
            </p>

            <div className={styles.subBlock}>
              <h3 className={styles.subHeading} data-lines>
                Périmètre
              </h3>
              <ul className={styles.bullets}>
                {service.scope.map((item) => (
                  <li key={item} data-lines>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.subBlock}>
              <h3 className={styles.subHeading} data-lines>
                {service.timeline ? "Tarif & délais" : "Tarif"}
              </h3>
              <dl className={styles.metaList}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaTerm} data-lines>
                    Tarif indicatif
                  </dt>
                  <dd className={styles.metaValue} data-lines>
                    {service.pricing.label}
                  </dd>
                </div>
                {service.timeline ? (
                  <div className={styles.metaRow}>
                    <dt className={styles.metaTerm} data-lines>
                      Délais
                    </dt>
                    <dd className={styles.metaValue} data-lines>
                      {service.timeline}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className={styles.subBlock}>
              <h3 className={styles.subHeading} data-lines>
                Livrables
              </h3>
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
    </section>
  );
}

function FaqBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  return (
    <section
      className={styles.faqSection}
      aria-labelledby="services-faq-title"
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.faqHeader}>
          <p className={styles.sectionIndex} data-lines>
            FAQ
          </p>
          <h2
            id="services-faq-title"
            className={styles.faqTitle}
            data-lines
          >
            Questions fréquentes
          </h2>
        </div>
        <ol className={styles.faqList}>
          {faqEntries.map((entry) => (
            <FaqItem
              key={entry.id}
              id={entry.id}
              question={entry.question}
              answer={entry.answer}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServicesContent(): React.ReactElement {
  return (
    <article className={styles.root}>
      <HeroBlock />
      {services.map((service) => (
        <ServiceBlock key={service.slug} service={service} />
      ))}
      <FaqBlock />
    </article>
  );
}

"use client";

import { TransitionLink as Link } from "@/components/transitions/TransitionLink";
import { contactLinks, footerNav } from "@/lib/nav";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Footer.module.scss";

interface FooterProps {
  // Compact mode strips the editorial top (Parlons-en headline + CTAs)
  // so pages that already have their own contact entry point (e.g.
  // /contact) only render the utility nav band at the bottom.
  readonly compact?: boolean;
}

export function Footer({ compact = false }: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();
  const ref = useScrollReveal<HTMLElement>();
  return (
    <footer
      role="contentinfo"
      className={`${styles.root} ${compact ? styles.rootCompact : ""}`}
      ref={ref}
    >
      <div className={styles.inner}>
        {compact ? null : (
          <>
            <div className={styles.headerRow}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>Disponible</span>
                <span className={styles.eyebrowLabel}>2025 – 2026</span>
              </p>
              <p className={styles.lead}>
                Un projet en cours, une réécriture à prévoir, une mission en
                renfort pour un studio — les bons projets démarrent souvent
                par un message court.
              </p>
            </div>

            <h2 className={styles.title} aria-label="Parlons-en">
              <span className={styles.titleWord} data-lines>
                PARLONS-EN.
              </span>
            </h2>

            <div className={styles.divider} aria-hidden="true" />

            <div className={styles.actions}>
              <div className={styles.mail}>
                <p className={styles.mailLabel}>Écrire directement</p>
                <a
                  className={styles.mailLink}
                  href="mailto:contact@lucas-aufrere.com"
                >
                  contact@lucas-aufrere.com
                </a>
              </div>
              <div className={styles.ctas}>
                <Link href="/contact" className={styles.ctaPrimary}>
                  <span>Démarrer un projet</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
                <Link href="/a-propos" className={styles.ctaSecondary}>
                  À propos
                </Link>
              </div>
            </div>
          </>
        )}

        <div className={styles.utility}>
          <section className={styles.section}>
            <p className={styles.signatureName}>Lucas Aufrère</p>
            <p className={styles.signatureRole}>
              Développeur front-end créatif freelance
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>Navigation</h3>
            <ul className={styles.list}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>Contact</h3>
            <ul className={styles.list}>
              {contactLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.link}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <p className={styles.meta}>© {year} · Clermont-Ferrand</p>
            <p className={styles.meta}>Designed &amp; built in-house</p>
          </section>
        </div>
      </div>
    </footer>
  );
}

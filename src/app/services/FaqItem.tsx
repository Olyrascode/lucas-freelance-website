"use client";

import { useCallback, useState, type MouseEvent } from "react";
import styles from "./page.module.scss";

interface FaqItemProps {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

// Accessible accordion. The whole <li> is clickable to toggle (open or
// close) so a click anywhere on the row — title strip, padding, or the
// open answer panel — flips the state. The inner <button> keeps the
// proper a11y semantics (heading + aria-expanded + aria-controls); we
// remove its own onClick and rely on event bubbling so keyboard
// activation also flows through the same handler. The answer stays in
// the DOM at all times (so search engines and screen readers always see
// it) and is collapsed via CSS grid-template-rows: 0fr → 1fr.
export function FaqItem({
  id,
  question,
  answer,
}: FaqItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const buttonId = `faq-q-${id}`;
  const panelId = `faq-a-${id}`;

  const toggle = useCallback((event: MouseEvent<HTMLLIElement>) => {
    // Don't interfere with link / external interactive elements that
    // might appear inside an answer down the line.
    const target = event.target as HTMLElement | null;
    if (target?.closest("a")) return;
    setOpen((prev) => !prev);
  }, []);

  return (
    <li
      className={styles.faqItem}
      data-open={open ? "true" : "false"}
      onClick={toggle}
    >
      <h3 className={styles.faqHeading}>
        <button
          id={buttonId}
          type="button"
          className={styles.faqButton}
          aria-expanded={open}
          aria-controls={panelId}
          // Click on the button bubbles up to the <li> handler — we
          // intentionally don't attach a separate onClick here so we
          // never toggle twice.
          tabIndex={0}
        >
          <span className={styles.faqQuestion} data-lines>
            {question}
          </span>
          <span className={styles.faqIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                fill="none"
              />
              <path
                className={styles.faqIconCross}
                d="M12 5v14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.faqPanel}
      >
        <div className={styles.faqPanelInner}>
          <p className={styles.faqAnswer} data-lines>
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}

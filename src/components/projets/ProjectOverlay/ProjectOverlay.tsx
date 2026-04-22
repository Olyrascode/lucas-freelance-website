"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { findProjectBySlug } from "@/data/projects";
import {
  closeProject,
  getFocusProgress,
  getOpenSlug,
  subscribe,
} from "@/components/projets/rotondeStore";
import styles from "./ProjectOverlay.module.scss";

const REVEAL_THRESHOLD = 0.95;

function getOpenSlugServerSnapshot(): string | null {
  return null;
}

// WeakMap caches the inner spans per element so GSAP can re-animate the
// same lines after a close/reopen cycle without re-splitting the DOM.
const splitCache = new WeakMap<HTMLElement, HTMLElement[]>();

function splitTextIntoLines(el: HTMLElement): HTMLElement[] {
  const cached = splitCache.get(el);
  if (cached) return cached;

  const original = el.textContent ?? "";
  if (!original.trim()) return [];

  const tokens = original.split(/(\s+)/);
  el.textContent = "";
  const wordSpans: HTMLSpanElement[] = [];
  for (const tok of tokens) {
    if (!tok) continue;
    if (/^\s+$/.test(tok)) {
      el.appendChild(document.createTextNode(tok));
    } else {
      const span = document.createElement("span");
      span.textContent = tok;
      span.style.display = "inline-block";
      el.appendChild(span);
      wordSpans.push(span);
    }
  }

  interface Line {
    readonly top: number;
    readonly words: HTMLSpanElement[];
  }
  const lines: Line[] = [];
  for (const span of wordSpans) {
    const top = span.offsetTop;
    const last = lines.at(-1);
    if (last && Math.abs(last.top - top) < 2) {
      last.words.push(span);
    } else {
      lines.push({ top, words: [span] });
    }
  }

  el.textContent = "";
  const inners: HTMLElement[] = [];
  for (const line of lines) {
    const wrap = document.createElement("span");
    wrap.style.display = "block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
    wrap.style.marginBottom = "-0.08em";

    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.style.willChange = "transform";
    inner.textContent = line.words.map((w) => w.textContent).join(" ");

    wrap.appendChild(inner);
    el.appendChild(wrap);
    inners.push(inner);
  }

  splitCache.set(el, inners);
  return inners;
}

export function ProjectOverlay(): React.ReactElement | null {
  const storeSlug = useSyncExternalStore(
    subscribe,
    getOpenSlug,
    getOpenSlugServerSnapshot,
  );
  const reducedMotion = usePrefersReducedMotion();

  const [renderedSlug, setRenderedSlug] = useState<string | null>(null);
  const [textStage, setTextStage] = useState<"hidden" | "revealed">("hidden");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  // Tracks whether the reveal has fired at least once for the current
  // renderedSlug — lets us distinguish "initial mount" (must stay hidden,
  // no animation, no flash) from "real close" (play the reverse).
  const hasRevealedRef = useRef(false);

  // Derived sync — adopt new slug as soon as the store opens one.
  if (storeSlug !== null && storeSlug !== renderedSlug) {
    setRenderedSlug(storeSlug);
  }
  // Reduced-motion short-circuit: when closed in this mode, drop rendered slug.
  if (reducedMotion && storeSlug === null && renderedSlug !== null) {
    setRenderedSlug(null);
  }

  // Immediately start the text reverse when the store closes — derived
  // state during render (React 19 allows this, useEffect setState would
  // trigger `react-hooks/set-state-in-effect`).
  if (storeSlug === null && textStage === "revealed") {
    setTextStage("hidden");
  }

  // Poll focusProgress (non-reactive) to:
  //   (a) mirror it onto a CSS custom property for the backdrop opacity
  //   (b) flip textStage to "revealed" once the camera has settled
  //   (c) unmount the overlay once the reverse dolly has finished
  useEffect(() => {
    if (!renderedSlug) return;
    let raf = 0;
    const tick = (): void => {
      const p = getFocusProgress();
      const root = rootRef.current;
      if (root) {
        root.style.setProperty("--focus-progress", p.toFixed(3));
      }
      if (
        p >= REVEAL_THRESHOLD &&
        textStage === "hidden" &&
        storeSlug !== null
      ) {
        setTextStage("revealed");
      }
      if (storeSlug === null && p < 0.001) {
        setRenderedSlug(null);
        setTextStage("hidden");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [renderedSlug, textStage, storeSlug]);

  // Text GSAP reveal / reverse — triggered by textStage changes.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !renderedSlug) return;
      const content = root.querySelector<HTMLElement>(`.${styles.content}`);
      const texts = Array.from(
        root.querySelectorAll<HTMLElement>("[data-lines]"),
      );
      if (texts.length === 0) return;

      if (reducedMotion) {
        if (content) content.style.opacity = "1";
        return;
      }

      const inners: HTMLElement[] = [];
      for (const t of texts) {
        const parts = splitTextIntoLines(t);
        inners.push(...parts);
      }
      if (inners.length === 0) return;

      if (textStage === "revealed") {
        // Camera has settled — prep hidden state and play the reveal.
        // The .content wrapper is kept at opacity 0 until this moment, which
        // guarantees no raw text flash before the masks are in place.
        gsap.set(inners, { yPercent: 110 });
        if (content) gsap.set(content, { opacity: 1 });
        hasRevealedRef.current = true;
        gsap.to(inners, {
          yPercent: 0,
          duration: 0.75,
          ease: "expo.out",
          stagger: 0.05,
        });
      } else if (hasRevealedRef.current) {
        // Real close — play the reverse masks then fade the wrapper back out.
        gsap.to(inners, {
          yPercent: 110,
          duration: 0.4,
          ease: "expo.in",
          stagger: 0.02,
          onComplete: () => {
            if (content) gsap.set(content, { opacity: 0 });
            hasRevealedRef.current = false;
          },
        });
      } else {
        // Initial mount: keep everything hidden, no animation — the reveal
        // stage will fire once focusProgress crosses REVEAL_THRESHOLD.
        gsap.set(inners, { yPercent: 110 });
        if (content) gsap.set(content, { opacity: 0 });
      }
    },
    { scope: rootRef, dependencies: [textStage, renderedSlug, reducedMotion] },
  );

  // Focus the close button once the reveal is complete
  useEffect(() => {
    if (renderedSlug && textStage === "revealed") {
      closeBtnRef.current?.focus();
    }
  }, [renderedSlug, textStage]);

  const handleClose = useCallback(() => {
    closeProject();
  }, []);

  // Escape key
  useEffect(() => {
    if (!renderedSlug || storeSlug === null) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [renderedSlug, storeSlug, handleClose]);

  if (!renderedSlug) return null;
  const project = findProjectBySlug(renderedSlug);
  if (!project) return null;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-overlay-title"
    >
      <div className={styles.backdrop} aria-hidden="true" />

      <button
        ref={closeBtnRef}
        type="button"
        className={styles.close}
        aria-label="Fermer la fiche projet"
        onClick={handleClose}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6l-12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="none"
          />
        </svg>
      </button>

      <div className={styles.content}>
        <p className={styles.meta} data-lines>
          {project.index} · {project.year}
        </p>
        <h2
          id="project-overlay-title"
          className={styles.title}
          data-lines
        >
          {project.name}
        </h2>
        <p className={styles.role} data-lines>
          {project.role}
        </p>
        <p className={styles.description} data-lines>
          {project.description}
        </p>
        <dl className={styles.specs}>
          <div className={styles.specRow}>
            <dt data-lines>Type</dt>
            <dd data-lines>{project.kind}</dd>
          </div>
          <div className={styles.specRow}>
            <dt data-lines>Stack</dt>
            <dd data-lines>{project.stack}</dd>
          </div>
          <div className={styles.specRow}>
            <dt data-lines>Tags</dt>
            <dd data-lines>{project.tags.join(" · ")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

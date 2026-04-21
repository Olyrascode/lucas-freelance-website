"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { motionDuration, motionEase } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { findProjectBySlug } from "@/data/projects";
import {
  closeProject,
  getOpenSlug,
  subscribe,
} from "@/components/projets/rotondeStore";
import styles from "./ProjectOverlay.module.scss";

function getOpenSlugServerSnapshot(): string | null {
  return null;
}

export function ProjectOverlay(): React.ReactElement | null {
  const storeSlug = useSyncExternalStore(
    subscribe,
    getOpenSlug,
    getOpenSlugServerSnapshot,
  );
  const reducedMotion = usePrefersReducedMotion();

  // Keep rendering the last opened project while closing, so the exit
  // animation can play before unmount.
  const [renderedSlug, setRenderedSlug] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Derived-state sync during render (avoids setState-in-effect):
  // - when the store opens a new slug, adopt it immediately.
  if (storeSlug !== null && storeSlug !== renderedSlug) {
    setRenderedSlug(storeSlug);
  }
  // - when reduced-motion is active and the store closed, drop it immediately.
  if (reducedMotion && storeSlug === null && renderedSlug !== null) {
    setRenderedSlug(null);
  }

  // Build + play the forward timeline whenever a new slug is rendered.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !renderedSlug) return;

      const backdrop = root.querySelector<HTMLElement>("[data-anim='backdrop']");
      const image = root.querySelector<HTMLElement>("[data-anim='image']");
      const texts = root.querySelectorAll<HTMLElement>("[data-anim='text']");
      const close = root.querySelector<HTMLElement>("[data-anim='close']");

      if (reducedMotion) {
        gsap.set([backdrop, image, close, ...Array.from(texts)], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(root, { pointerEvents: "auto" });

      const tl = gsap.timeline();
      tl.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: motionDuration.base, ease: motionEase.soft },
      );
      tl.fromTo(
        image,
        { opacity: 0, y: 48, scale: 1.04 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: motionDuration.slow,
          ease: motionEase.precise,
        },
        0.2,
      );
      tl.fromTo(
        texts,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: motionDuration.medium,
          ease: motionEase.precise,
          stagger: 0.08,
        },
        0.45,
      );
      tl.fromTo(
        close,
        { opacity: 0 },
        { opacity: 1, duration: motionDuration.base, ease: motionEase.soft },
        0.5,
      );

      tlRef.current = tl;

      return () => {
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [renderedSlug, reducedMotion] },
  );

  // Close: play the timeline in reverse. Setting state happens in the
  // GSAP callback (external system) so we don't trip set-state-in-effect.
  const isClosing = storeSlug === null && renderedSlug !== null;

  useEffect(() => {
    if (!isClosing || reducedMotion) return;
    const tl = tlRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", () => {
      tl.eventCallback("onReverseComplete", null);
      setRenderedSlug(null);
    });
    tl.reverse();
  }, [isClosing, reducedMotion]);

  // Focus the close button when an overlay opens for keyboard users.
  useEffect(() => {
    if (renderedSlug && storeSlug) {
      closeBtnRef.current?.focus();
    }
  }, [renderedSlug, storeSlug]);

  // Escape key → close
  const handleClose = useCallback(() => {
    closeProject();
  }, []);

  useEffect(() => {
    if (!renderedSlug || !storeSlug) return;
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

  const isOpen = storeSlug !== null;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-overlay-title"
      data-state={isOpen ? "open" : "closing"}
    >
      <div className={styles.backdrop} data-anim="backdrop" />

      <button
        ref={closeBtnRef}
        type="button"
        className={styles.close}
        aria-label="Fermer la fiche projet"
        onClick={handleClose}
        data-anim="close"
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

      <div className={styles.grid}>
        <div className={styles.imageWrap} data-anim="image">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className={styles.image}
            priority
          />
          <span className={styles.grain} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <p className={styles.meta} data-anim="text">
            <span>{project.index}</span>
            <span>{project.year}</span>
          </p>

          <h2
            id="project-overlay-title"
            className={styles.title}
            data-anim="text"
          >
            {project.name}
          </h2>

          <p className={styles.role} data-anim="text">
            {project.role}
          </p>

          <p className={styles.description} data-anim="text">
            {project.description}
          </p>

          <dl className={styles.specs}>
            <div className={styles.specRow} data-anim="text">
              <dt>Type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div className={styles.specRow} data-anim="text">
              <dt>Stack</dt>
              <dd>{project.stack}</dd>
            </div>
            <div className={styles.specRow} data-anim="text">
              <dt>Tags</dt>
              <dd>{project.tags.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

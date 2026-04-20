"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { motionDuration, motionEase } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./PageTransition.module.scss";

interface PageTransitionProps {
  readonly children: React.ReactNode;
}

export function PageTransition({
  children,
}: PageTransitionProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      if (!ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 12,
        duration: motionDuration.base,
        ease: motionEase.base,
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <div ref={ref} className={styles.root}>
      {children}
    </div>
  );
}

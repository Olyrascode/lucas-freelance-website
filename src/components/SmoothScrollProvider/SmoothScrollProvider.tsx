"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SmoothScrollProviderProps {
  readonly children: React.ReactNode;
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps): React.ReactElement {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const instance = createLenis({ reducedMotion });

    const tickerCallback = (time: number): void => {
      instance.raf(time * 1000);
    };
    const onScroll = (): void => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    instance.on("scroll", onScroll);

    return () => {
      instance.off("scroll", onScroll);
      gsap.ticker.remove(tickerCallback);
      destroyLenis();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

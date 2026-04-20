"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import type { ScrollDirection, ScrollState } from "@/types";

const DELTA_THRESHOLD = 8;

export function useScrollDirection(): ScrollState {
  const lenis = useLenis();
  const [state, setState] = useState<ScrollState>({
    direction: "idle",
    y: 0,
  });

  useEffect(() => {
    if (!lenis) return;

    let lastY = lenis.scroll;
    let accumulated = 0;
    let lastDirection: ScrollDirection = "idle";

    const handleScroll = (): void => {
      const currentY = lenis.scroll;
      const delta = currentY - lastY;
      lastY = currentY;

      if (delta === 0) return;

      const sign = delta > 0 ? 1 : -1;
      const accumulatedSign = accumulated > 0 ? 1 : accumulated < 0 ? -1 : 0;

      if (accumulatedSign !== 0 && accumulatedSign !== sign) {
        accumulated = 0;
      }
      accumulated += delta;

      if (Math.abs(accumulated) >= DELTA_THRESHOLD) {
        const direction: ScrollDirection = accumulated > 0 ? "down" : "up";
        accumulated = 0;
        if (direction !== lastDirection) {
          lastDirection = direction;
          setState({ direction, y: currentY });
          return;
        }
      }

      setState((prev) =>
        prev.y === currentY ? prev : { direction: lastDirection, y: currentY },
      );
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return state;
}

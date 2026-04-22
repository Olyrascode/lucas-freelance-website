"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenisSnapshot } from "@/lib/lenis";
import styles from "./TransitionProvider.module.scss";

// Page-transition curtain orchestrated with Motion's AnimatePresence.
// Sequence on every SPA navigation:
//   1. cover  — overlay rises from below to fill the viewport
//   2. push   — once cover lands, router.push fires; we also reset Lenis
//               scroll + ScrollTrigger so the new page's animations
//               evaluate against scroll=0
//   3. hold   — 400ms grace so the new route's React tree commits before
//               we start the uncover (otherwise the user sees a flash of
//               the new page mid-render)
//   4. uncover — overlay keeps going up, out of the viewport (handled by
//               AnimatePresence exit prop when isTransitioning flips back)
//
// Browser back/forward fires popstate; we don't animate those — letting
// AnimatePresence skip avoids fighting the browser's own scroll restoration.

const COVER_HOLD_AFTER_PUSH_MS = 400;
const EASE_EXPO_IN_OUT = [0.19, 1, 0.22, 1] as const;
const ANIMATION_DURATION = 0.8;

interface TransitionContextValue {
  readonly navigate: (href: string) => void;
  readonly isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransition must be used inside TransitionProvider");
  }
  return ctx;
}

interface TransitionProviderProps {
  readonly children: ReactNode;
}

export function TransitionProvider({
  children,
}: TransitionProviderProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingHrefRef = useRef<string | null>(null);
  const isPopStateRef = useRef(false);

  const resetScrollAndRefresh = useCallback((): void => {
    const lenis = getLenisSnapshot();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true, lock: false });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  const navigate = useCallback(
    (href: string): void => {
      if (isTransitioning) return;
      if (href === pathname) return;

      // Reduced motion path — skip the animation entirely.
      if (reducedMotion) {
        resetScrollAndRefresh();
        router.push(href);
        return;
      }

      pendingHrefRef.current = href;
      setIsTransitioning(true);
    },
    [isTransitioning, pathname, reducedMotion, resetScrollAndRefresh, router],
  );

  // Handle the "covered" moment — fired by Motion when the cover animation
  // (initial -> animate) completes. At this point the overlay fully hides
  // the page; perform the route change and the post-push grace.
  const handleCoverComplete = useCallback((): void => {
    const href = pendingHrefRef.current;
    if (!href) {
      setIsTransitioning(false);
      return;
    }
    resetScrollAndRefresh();
    router.push(href);
    pendingHrefRef.current = null;
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, COVER_HOLD_AFTER_PUSH_MS);
  }, [resetScrollAndRefresh, router]);

  // Browser back/forward should not be wrapped in the curtain — let the
  // browser drive scroll restoration and skip our overlay sequence.
  useEffect(() => {
    const onPopState = (): void => {
      isPopStateRef.current = true;
      pendingHrefRef.current = null;
      setIsTransitioning(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Whenever the committed pathname changes via popstate (browser
  // navigation), make sure our flag is reset so future link clicks still
  // trigger the curtain.
  useEffect(() => {
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
    }
  }, [pathname]);

  // After every committed pathname change, refresh ScrollTrigger so the
  // new page's freshly-mounted triggers (created by useScrollReveal in
  // child components) re-evaluate their start/end positions against the
  // new document layout + scroll = 0. Without this, triggers above the
  // fold use stale measurements from the previous route and never fire
  // onEnter, leaving split-line text frozen in its hidden state until a
  // hard reload. Two rAFs let React commit the new tree first.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  const ctxValue: TransitionContextValue = {
    navigate,
    isTransitioning,
  };

  return (
    <TransitionContext.Provider value={ctxValue}>
      {children}
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="page-transition-overlay"
            className={styles.overlay}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: ANIMATION_DURATION,
              ease: EASE_EXPO_IN_OUT,
            }}
            onAnimationComplete={(definition) => {
              // Motion fires onAnimationComplete for both `animate` and
              // `exit` phases — only the cover (animate -> y:0) should
              // trigger the route change.
              if (
                typeof definition === "object" &&
                definition !== null &&
                "y" in definition &&
                definition.y === "0%"
              ) {
                handleCoverComplete();
              }
            }}
          />
        ) : null}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

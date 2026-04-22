"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionDuration, motionEase, motionStagger } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTransition } from "@/components/transitions/TransitionProvider";

export interface ScrollRevealOptions {
  readonly selector?: string;
  readonly linesSelector?: string;
  readonly y?: number;
  readonly duration?: number;
  readonly stagger?: number;
  readonly lineStagger?: number;
  readonly start?: string;
  readonly ease?: string;
  readonly delay?: number;
}

// Cache split-line inners per element so a re-run (revertOnUpdate / route
// change) finds the existing spans instead of trying to re-split — DOM
// mutations from the first run are not undone by gsap.context().revert(),
// so a marker-only approach would return [] on subsequent runs and the
// animation would have nothing to drive.
const splitCache = new WeakMap<HTMLElement, HTMLElement[]>();

function splitTextIntoLines(el: HTMLElement): HTMLElement[] {
  const cached = splitCache.get(el);
  if (cached) return cached;

  const original = el.textContent ?? "";
  if (!original.trim()) return [];

  // Tokenize words + whitespace — keep separators to rebuild faithfully.
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

  // Group words into lines by their offsetTop.
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

  // Rebuild the element with a per-line mask structure.
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

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const {
    selector = "[data-reveal]",
    linesSelector = "[data-lines]",
    y = 16,
    duration = motionDuration.base,
    stagger = motionStagger.base,
    lineStagger = 0.06,
    start = "top 70%",
    ease = motionEase.precise,
    delay = 0,
  } = options;

  const containerRef = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  // pathname dep + revertOnUpdate ensures persistent components (e.g. the
  // Footer mounted in the root layout) replay their reveal each time the
  // user navigates to a new route, instead of staying frozen in the
  // "already animated" state from the previous page.
  const pathname = usePathname();
  // When we arrive on a new route via the transition curtain, the page's
  // React tree mounts while the curtain is still on screen. Without this
  // gate, ScrollTriggers above the fold fire onEnter and play behind the
  // curtain — the user sees static, already-revealed content by the time
  // the curtain lifts. We hide the elements (gsap.set) on the first run
  // and only wire the ScrollTrigger once isReady flips back to true.
  const { isReady } = useTransition();

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const fadeTargets = Array.from(
        root.querySelectorAll<HTMLElement>(selector),
      );
      const lineTargets = Array.from(
        root.querySelectorAll<HTMLElement>(linesSelector),
      );

      if (reducedMotion) {
        if (fadeTargets.length > 0) {
          gsap.set(fadeTargets, { opacity: 1, y: 0, clearProps: "transform" });
        }
        return;
      }

      const allLineInners: HTMLElement[] = [];
      for (const el of lineTargets) {
        const inners = splitTextIntoLines(el);
        allLineInners.push(...inners);
      }

      // Force initial state explicitly — revertOnUpdate clears prior
      // GSAP styles between runs, so we restate the hidden values here
      // rather than relying on a residual gsap.from()-style assumption.
      if (fadeTargets.length > 0) {
        gsap.set(fadeTargets, { opacity: 0, y });
      }
      if (allLineInners.length > 0) {
        gsap.set(allLineInners, { yPercent: 110 });
      }

      // Curtain still up → keep the elements hidden but skip creating the
      // timeline + ScrollTrigger. The next re-run (triggered by isReady
      // flipping to true) will re-set the hidden state and wire the
      // trigger cleanly.
      if (!isReady) {
        return;
      }

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none reverse",
        },
      });

      if (allLineInners.length > 0) {
        tl.to(
          allLineInners,
          {
            yPercent: 0,
            duration: motionDuration.medium,
            ease,
            stagger: lineStagger,
          },
          0,
        );
      }

      if (fadeTargets.length > 0) {
        tl.to(
          fadeTargets,
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            stagger,
          },
          allLineInners.length > 0 ? 0.1 : 0,
        );
      }

      // After the timeline + ScrollTrigger are wired, give the new layout
      // a tick to settle then refresh — covers the case where this hook
      // mounts under a curtain (page transition) and the scroll position
      // / element box has just been reset.
      const refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        window.clearTimeout(refreshTimeout);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: containerRef as RefObject<HTMLElement>,
      // pathname triggers a re-run for persistent components on route
      // change. revertOnUpdate clears prior styles so the gsap.set above
      // restores the hidden state cleanly before we replay.
      revertOnUpdate: true,
      dependencies: [
        pathname,
        isReady,
        reducedMotion,
        selector,
        linesSelector,
        y,
        duration,
        stagger,
        lineStagger,
        start,
        ease,
        delay,
      ],
    },
  );

  void ScrollTrigger;
  return containerRef;
}

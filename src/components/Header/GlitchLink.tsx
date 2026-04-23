"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
} from "react";
import { TransitionLink } from "@/components/transitions/TransitionLink";

// Pool of glyphs that swap in for each letter during the scramble.
// Kept narrow and typographic so the effect reads as editorial noise,
// not as ASCII art.
const GLITCH_SYMBOLS = "#$%&@!?*+-=_/\\|<>[]{}§";

// Cadence of the effect. At 65ms per frame, a ~10-letter word cascades
// back to its real text in ~0.75s — slower so each glyph swap is
// readable, not a blur.
const FRAME_INTERVAL_MS = 65;
const SCRAMBLE_FRAMES_BEFORE_REVEAL = 3;

interface GlitchLinkProps {
  readonly href: string;
  readonly label: string;
  readonly className?: string;
  readonly textClassName?: string;
  readonly active?: boolean;
  readonly onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

// Anchor with a hover-triggered letter scramble. Each glyph cycles
// through random symbols for a few frames before revealing the real
// character, cascading left to right. We mutate the DOM text imperatively
// to avoid re-rendering React on every frame; the accessible label is
// preserved via aria-label so screen readers never hear the symbols.
export const GlitchLink = forwardRef<HTMLAnchorElement, GlitchLinkProps>(
  function GlitchLink(
    { href, label, className, textClassName, active, onClick },
    ref,
  ) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<number | null>(null);

    const stopGlitch = useCallback((): void => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const el = spanRef.current;
      if (el) el.textContent = label;
    }, [label]);

    const startGlitch = useCallback((): void => {
      const el = spanRef.current;
      if (!el) return;
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      const chars = Array.from(label);
      const totalFrames = chars.length + SCRAMBLE_FRAMES_BEFORE_REVEAL + 2;
      let frame = 0;

      intervalRef.current = window.setInterval(() => {
        const out = chars
          .map((ch, i) => {
            // Preserve whitespace — scrambling spaces looks off.
            if (!ch.trim()) return ch;
            // Reveal the real character once the wave reaches this index.
            if (frame >= i + SCRAMBLE_FRAMES_BEFORE_REVEAL) return ch;
            const pool = GLITCH_SYMBOLS;
            const pick = Math.floor(Math.random() * pool.length);
            return pool.charAt(pick);
          })
          .join("");
        el.textContent = out;
        frame += 1;
        if (frame > totalFrames) {
          stopGlitch();
        }
      }, FRAME_INTERVAL_MS);
    }, [label, stopGlitch]);

    useEffect(() => {
      return () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
      };
    }, []);

    const handleEnter = (): void => {
      startGlitch();
    };
    const handleFocus = (): void => {
      startGlitch();
    };

    return (
      <TransitionLink
        ref={ref}
        href={href}
        className={className}
        aria-current={active ? "page" : undefined}
        aria-label={label}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onFocus={handleFocus}
      >
        <span
          ref={spanRef}
          className={textClassName}
          aria-hidden="true"
        >
          {label}
        </span>
      </TransitionLink>
    );
  },
);

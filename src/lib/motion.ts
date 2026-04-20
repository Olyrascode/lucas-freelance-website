// Duplicate of the motion tokens in src/styles/_variables.scss.
// GSAP cannot read CSS custom properties — keep both sources aligned.
// Source of truth: .claude/context/design-system.md §Motion defaults.

export const motionDuration = {
  fast: 0.2,
  base: 0.6,
  medium: 0.9,
  slow: 1.2,
} as const;

export const motionStagger = {
  tight: 0.05,
  base: 0.08,
  loose: 0.15,
} as const;

export const motionEase = {
  base: "power3.out",
  soft: "power2.out",
  precise: "expo.out",
  linear: "none",
} as const;

export type MotionDurationKey = keyof typeof motionDuration;
export type MotionStaggerKey = keyof typeof motionStagger;
export type MotionEaseKey = keyof typeof motionEase;

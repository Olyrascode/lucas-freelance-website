# Design system

> Tokens and scales for this project. The source of truth at runtime is
> `src/styles/_variables.scss` — this file mirrors it in a form the Architect
> can reference when writing specs. Keep the two in sync: when you change a
> token in SCSS, update this file.
>
> Motion tokens are duplicated in `src/lib/motion.ts` for GSAP (which cannot
> read CSS custom properties). Keep both sources aligned.

## Color

Dark-mode native. Deep near-black background (not pure `#000`) with a slight
blue undertone; warm cream foreground; metallic copper-gold accent used
sparingly.

- `$color-bg` — `#0A0B0D` — page background
- `$color-fg` — `#EDE6D8` — primary text, warm cream
- `$color-muted` — `#9A968C` — secondary text, metadata (AA ~6.8:1 on bg)
- `$color-accent` — `#B8894A` — metallic copper-gold, used sparingly
- `$color-line` — `rgba(237, 230, 216, 0.08)` — hairlines, dividers (derived from `$color-fg`)

> No `$color-bg-elev`: the editorial concept relies on negative space and
> typography, not layered surfaces. Reintroduce only if a concrete need
> emerges (e.g. elevated footer).

## Typography scale

Editorial scale — fewer steps, larger jumps than a product UI. Fluid via
`clamp()`. Base: `1rem = 16px`.

- `$font-display-xl` — `clamp(3.5rem, 8vw + 1rem, 9rem)` — hero headings (Playfair, lh 0.95)
- `$font-display-l` — `clamp(2.5rem, 5vw + 1rem, 6rem)` — section headings (Playfair, lh 1.0)
- `$font-display-m` — `clamp(1.75rem, 2.5vw + 1rem, 3.5rem)` — feature headings (Playfair, lh 1.1)
- `$font-body-l` — `clamp(1.125rem, 0.5vw + 1rem, 1.375rem)` — lead paragraphs (Inter, lh 1.55)
- `$font-body-m` — `1rem` — body copy (Inter, lh 1.6)
- `$font-caption` — `0.75rem` — metadata, labels (JetBrains Mono, uppercase, tracking 0.08em, lh 1.4)

Line-heights: tight for display (0.95–1.1), relaxed for body (1.55–1.6).

## Spacing

Base-8 rhythm. `$space-1` … `$space-7` for regular rhythm; `$space-epic` is a
narrative-scale space reserved for hero breathing and act transitions — not
everyday rhythm.

- `$space-1` — `0.5rem` (8px)
- `$space-2` — `1rem` (16px)
- `$space-3` — `1.5rem` (24px)
- `$space-4` — `2.5rem` (40px)
- `$space-5` — `4rem` (64px)
- `$space-6` — `6rem` (96px)
- `$space-7` — `9rem` (144px)
- `$space-epic` — `14rem` (224px) — narrative only
- `$section-spacing` — `clamp(4rem, 10vw, 14rem)` — between top-level sections (vw not vh — mobile address-bar safe)
- `$gutter` — `clamp(1.25rem, 2vw, 1.5rem)` — horizontal gutters (20px mobile → 24px desktop)

## Grid

- Columns: `12`
- Max content width: `1440px`
- Gutter desktop: `1.5rem` (24px)
- Gutter mobile: `1.25rem` (20px)

## Motion defaults

Exposed in two places (keep in sync):

- **SCSS** `src/styles/_variables.scss` — for CSS transitions on hover/focus
- **TS** `src/lib/motion.ts` — for GSAP (cannot read CSS custom properties)

Tokens:

- `$motion-duration-fast` — `0.3s` — micro-interactions (hover, focus)
- `$motion-duration-base` — `0.8s` — standard reveals
- `$motion-duration-slow` — `1.2s` — hero beats, long reveals
- `$motion-stagger-base` — `0.08s` — between siblings
- `$motion-ease-base` — `power3.out` (GSAP) / `cubic-bezier(0.215, 0.61, 0.355, 1)` (CSS equivalent)

All motion gated by `usePrefersReducedMotion`.

## Breakpoints

- Mobile: `<768px`
- Tablet: `768–1024px`
- Desktop: `>1024px` (base case)
- Large desktop: `>1440px`

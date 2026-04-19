# CLAUDE.md — Project Rules & Context

## Project

See `.claude/context/project.md` for project-specific context (client, brief,
identity, references, mood). This file holds only stack and engineering rules
that are reusable across projects.

## Stack (non-negotiable)

- Next.js App Router (latest stable)
- React 19
- TypeScript strict (`noUncheckedIndexedAccess: true`)
- SCSS Modules only
- GSAP 3 + ScrollTrigger + @gsap/react
- Lenis for smooth scroll
- NO Tailwind, NO CSS-in-JS, NO styled-components, NO UI libraries

## Architecture rules

### Components

- Every component lives in `ComponentName/ComponentName.tsx` + `ComponentName.module.scss`
- PascalCase for components, camelCase for hooks prefixed with `use`
- Server Components by default — `'use client'` only for GSAP, Lenis, browser hooks, interactivity
- Imports use `@/*` alias (maps to `src/*`)

### SCSS

- SCSS Modules only for component styles
- Use `@use` not `@import`
- SCSS imports use `styles/variables` (via sassOptions.loadPaths), NOT `@/styles/variables`
- `.root` for component wrapper, camelCase for inner elements
- No `!important`, no deep selectors, no global utility classes
  - Exception unique : bloc `@media (prefers-reduced-motion: reduce)` dans
    `globals.scss` où le pattern W3C canonique l'exige pour forcer l'override
    des animations tierces. Nulle part ailleurs.
- Tokens in `styles/_variables.scss`, mixins in `styles/_mixins.scss`
- Always import variables/mixins explicitly — no auto-imports

### TypeScript

- No `any`, no `ts-ignore`, no `as unknown as`
- All params, returns, refs, options must be typed
- Shared types in `src/types/index.ts`

### GSAP

- Registered once in `src/lib/gsap.ts` — never re-register
- Use `@gsap/react` (useGSAP) for React animation lifecycle
- All animations must cleanup on unmount
- All animations must respect `prefers-reduced-motion` via the `usePrefersReducedMotion` hook
- No duplicated GSAP code across components

### Lenis

- Singleton in `src/lib/lenis.ts`
- Synced with ScrollTrigger via `gsap.ticker`
- Exposed via `useLenis` hook
- `SmoothScrollProvider` initializes/destroys in `app/layout.tsx`
- Reduced motion (via `usePrefersReducedMotion`): set `lerp: 1`, `smoothWheel: false`

### Scroll sequences

- Canvas-based rendering only (never stacked `<img>`)
- Frames in `public/assets/sequences/{folder}/frame_0001.webp`
- Preload all frames via `Promise.all` before animating
- ScrollTrigger drives frame index
- `useScrollSequence` hook is generic and reusable
- Reduced motion (via `usePrefersReducedMotion`): show first frame, skip scroll-scrub

### Text animations

- Split text mask reveal pattern for headings
- Wrap lines in overflow-hidden mask, animate `yPercent` in
- Always respect `prefers-reduced-motion` via the `usePrefersReducedMotion` hook

### Fonts

- `next/font` only (either `next/font/google` or `next/font/local`) — no manual `@font-face` in SCSS
- Declared in `app/layout.tsx`, exposed as CSS variables
- Families defined per project in `.claude/context/project.md`
- If local: files in `public/fonts/` as `.woff2`

### Performance

- `next/image` for static images, canvas for sequences
- WebP for images, WOFF2 for fonts
- `will-change` sparingly
- No premature optimization — just a clean base
- `npm run build` must always pass clean

### Accessibility

- `usePrefersReducedMotion` hook used in all animation hooks
- Content readable without animations
- Semantic HTML structure
- Focus-visible styles on interactive elements

### SEO

- Next.js Metadata API in `app/layout.tsx`
- `app/robots.ts` and `app/sitemap.ts` present
- Open Graph metadata configured

## Specs & design tokens

- `.claude/specs/` is Git-tracked. Every spec is part of the project history
  — the Architect writes there, the Coder reads from there, the Reviewer
  audits against there. Specs can be referenced by commit hash.
- `src/styles/_variables.scss` and `src/styles/_mixins.scss` are pre-generated
  at project scaffolding from `.claude/context/design-system.md`. They must
  exist before the first feature is implemented. Keep them in sync with
  `design-system.md`: when a token changes in SCSS, update the markdown
  (or vice versa) in the same commit.

## Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run format     # Prettier
```

## Verification checklist

Before considering any task complete:

1. `npm run typecheck` passes
2. `npm run lint` passes
3. `npm run build` passes
4. No `any` types introduced
5. No `console.log` left in code
6. `prefers-reduced-motion` respected via `usePrefersReducedMotion` in any animation code
7. SCSS uses `@use` with explicit imports
8. New components follow folder convention
9. Client directive only where necessary

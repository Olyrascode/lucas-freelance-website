# Design system

> Tokens and scales for this project. The source of truth at runtime is
> `src/styles/_variables.scss` — this file mirrors it in a form the Architect
> can reference when writing specs. Keep the two in sync: when you change a
> token in SCSS, update this file.
>
> Motion tokens are duplicated in `src/lib/motion.ts` for GSAP (which cannot
> read CSS custom properties). Keep both sources aligned.

## Color

Dark-mode native editorial. Deep near-black background (not pure `#000`,
légèrement adouci), texte blanc pur pour les titres, variations de gris
pour la hiérarchie secondaire. Pas d'accent coloré en V1 : la force vient
de la typographie et de la composition, pas d'une couleur signature.

- `$color-bg` — `#0A0A0A` — page background, noir profond adouci
- `$color-bg-elev` — `#111111` — surfaces légèrement surélevées (cards,
  hover states) — usage très parcimonieux
- `$color-fg` — `#FFFFFF` — primary text, titres et accents
- `$color-fg-secondary` — `#EAEAEA` — body copy, paragraphes principaux
- `$color-fg-muted` — `#888888` — secondary text, metadata, captions
  (AA ~5.8:1 on bg)
- `$color-fg-subtle` — `#555555` — labels très secondaires, copyright footer
- `$color-line` — `rgba(255, 255, 255, 0.1)` — hairlines, dividers
  (derived from `$color-fg`)
- `$color-line-subtle` — `rgba(255, 255, 255, 0.05)` — séparations discrètes

> Pas d'accent coloré en V1. Si un jour un accent devient nécessaire
> (CTA fort, highlight), privilégier un blanc cassé chaud `#F5F0E8`
> ou rester en pure grayscale. Ne JAMAIS introduire une couleur saturée
> sans raison narrative forte — ça casserait l'esthétique éditoriale dark.

## Typography scale

Editorial scale — fewer steps, larger jumps than a product UI. Fluid via
`clamp()`. Base: `1rem = 16px`.

Approche : display serif expressive pour les titres, sans-serif neutre
pour le corps, mono technique pour les labels et indices.

### Stack

- **Display**: Fraunces (variable, via `next/font/google`)
  - Axes utilisés : weight (300-900), opsz (9-144), SOFT (0-100)
  - Privilégier opsz haute (80-120) pour les gros titres (formes plus
    expressives, contrastes plus marqués)
- **Body**: Inter (via `next/font/google`)
- **Mono**: JetBrains Mono (via `next/font/google`)

### Scale

- `$font-display-xl` — `clamp(3.5rem, 10vw + 1rem, 10rem)` — hero headings
  (Fraunces, lh 0.92, tracking -0.03em, weight 300-400)
- `$font-display-l` — `clamp(2.5rem, 5vw + 1rem, 6rem)` — section headings
  (Fraunces, lh 1.0, tracking -0.02em, weight 400)
- `$font-display-m` — `clamp(1.75rem, 2.5vw + 1rem, 3rem)` — feature headings
  (Fraunces, lh 1.1, tracking -0.01em, weight 400)
- `$font-display-s` — `clamp(1.375rem, 1.5vw + 1rem, 2rem)` — card titles,
  project names (Fraunces, lh 1.15, weight 400)
- `$font-body-l` — `clamp(1.125rem, 0.5vw + 1rem, 1.375rem)` — lead
  paragraphs (Inter, lh 1.5, weight 400)
- `$font-body-m` — `1rem` — body copy (Inter, lh 1.6, weight 400)
- `$font-body-s` — `0.9375rem` — secondary body, meta descriptions
  (Inter, lh 1.55, weight 400)
- `$font-label` — `0.75rem` — metadata, labels, indices "01/04"
  (JetBrains Mono, uppercase, tracking 0.12em, lh 1.4, weight 400)
- `$font-label-sm` — `0.6875rem` — micro-labels, footer meta
  (JetBrains Mono, uppercase, tracking 0.15em, lh 1.4, weight 400)

### Règles typographiques

- Line-heights : tight pour display (0.92–1.15), relaxed pour body (1.5–1.6)
- Tracking négatif sur les gros titres (-0.02 à -0.03em) pour resserrer
  les formes display
- Tracking positif (+0.1em à +0.15em) sur les labels uppercase pour aérer
- Weights display : rester entre 300 et 500. Ne pas partir en bold/black —
  le style éditorial dark repose sur des formes fines et expressives,
  pas sur la masse
- Numerals tabulaires sur les indices (via `font-variant-numeric: 
tabular-nums` pour les "01", "02", "03", "04" alignés)

## Spacing

Base-8 rhythm. `$space-1` … `$space-7` pour le rythme régulier.
`$space-epic` est réservé aux transitions de sections narratives majeures
(hero, fin de page).

- `$space-1` — `0.5rem` (8px)
- `$space-2` — `1rem` (16px)
- `$space-3` — `1.5rem` (24px)
- `$space-4` — `2.5rem` (40px)
- `$space-5` — `4rem` (64px)
- `$space-6` — `6rem` (96px)
- `$space-7` — `9rem` (144px)
- `$space-epic` — `14rem` (224px) — narrative only

- `$section-spacing` — `clamp(5rem, 10vw, 12rem)` — entre top-level
  sections (vw, mobile address-bar safe)
- `$section-spacing-hero` — `clamp(7rem, 15vw, 16rem)` — autour du hero
  et avant le footer (respiration maximale)
- `$gutter` — `clamp(1.25rem, 2vw, 2rem)` — gutters horizontaux
  (20px mobile → 32px desktop)

## Grid

Grille éditoriale 12 colonnes, avec usage explicite des lignes de grille
comme élément visuel (dividers verticaux fins entre certaines colonnes).

- Columns: `12`
- Max content width: `1440px`
- Gutter desktop: `2rem` (32px)
- Gutter mobile: `1.25rem` (20px)
- Row gap: `$space-4` par défaut (40px)

### Usage éditorial de la grille

La grille n'est pas qu'une structure invisible. Sur certaines sections
(projets, services), des dividers verticaux fins (`$color-line`) peuvent
être rendus visibles pour renforcer le côté "magazine éditorial" — à
utiliser avec parcimonie (1-2 sections max).

## Motion defaults

Exposed in two places (keep in sync):

- **SCSS** `src/styles/_variables.scss` — for CSS transitions on hover/focus
- **TS** `src/lib/motion.ts` — for GSAP (cannot read CSS custom properties)

Motion philosophy : **sobre et précise**. Les animations doivent servir
le rythme de lecture et la hiérarchie visuelle, jamais la décoration.
Pas de bounces, pas d'élastiques, pas de rotations gratuites. Ease
mesurée, durées courtes à moyennes.

### Tokens

- `$motion-duration-fast` — `0.2s` — micro-interactions (hover, focus,
  button states)
- `$motion-duration-base` — `0.6s` — standard reveals (text fade-up,
  image fade-in)
- `$motion-duration-medium` — `0.9s` — section reveals, multi-step
  staggers
- `$motion-duration-slow` — `1.2s` — hero beats, long editorial reveals
- `$motion-stagger-tight` — `0.05s` — between siblings serrés (list items)
- `$motion-stagger-base` — `0.08s` — between siblings standard
- `$motion-stagger-loose` — `0.15s` — between sections révélées ensemble

### Easings

- `$motion-ease-base` — GSAP `power3.out` / CSS `cubic-bezier(0.215, 
0.61, 0.355, 1)` — standard reveals, fades
- `$motion-ease-soft` — GSAP `power2.out` / CSS `cubic-bezier(0.25, 
0.46, 0.45, 0.94)` — micro-interactions fluides
- `$motion-ease-precise` — GSAP `expo.out` / CSS `cubic-bezier(0.19, 
1, 0.22, 1)` — scroll-tied reveals de texte
- `$motion-ease-linear` — pour les scrub scroll uniquement (jamais pour
  des transitions UI)

### Animation patterns recommandés

**Text reveal (GSAP + ScrollTrigger)**opacity: 0 → 1
y: 16px → 0
duration: 0.6-0.8s
ease: power3.out
stagger: 0.08s (pour les lignes successives)
trigger: top 80% viewport

**Image fade-in**opacity: 0 → 1
scale: 1.02 → 1 (léger, pas plus)
duration: 0.9-1.2s
ease: expo.out

**Divider line draw**scaleX: 0 → 1 (transform-origin: left)
duration: 0.8s
ease: power3.inOut

**Hover state (links, cards)**opacity / translate très subtil
duration: 0.2-0.3s
ease: power2.out

### Reduced-motion

**Toutes** les animations GSAP et CSS doivent avoir un fallback statique
quand `prefers-reduced-motion: reduce` est actif. Implémentation via
le hook `usePrefersReducedMotion` et conditionnels dans les timelines
GSAP. Cf. `CLAUDE.md` pour le pattern canonique.

## Breakpoints

- Mobile: `<768px`
- Tablet: `768–1024px`
- Desktop: `>1024px` (base case)
- Large desktop: `>1440px`

### Rules

- Design d'abord desktop (1440px base), puis adapté mobile
- Pas de "mobile first" dogmatique : le site étant éditorial, la
  composition desktop est la version canonique
- Sur mobile, les scales typographiques se resserrent via les `clamp()`
- La grille 12 colonnes devient 6 colonnes en tablet, 4 en mobile
  (via SCSS mixins)

## Borders & radii

Le style éditorial dark rejette les border-radius. Angles vifs partout.

- `$radius-none` — `0` — défaut universel
- `$radius-xs` — `2px` — réservé aux inputs et boutons (micro-adoucissement)
- Pas de radii > 4px dans ce projet

## Shadows

Le dark éditorial se passe de shadows. La hiérarchie se fait par les
lignes (`$color-line`) et les variations de gris, pas par l'élévation
visuelle.

- `$shadow-none` — `none` — défaut universel
- Introduire des shadows uniquement si un besoin fonctionnel précis
  émerge (modal overlay, par exemple — peu probable en V1)

## Z-index scale

- `$z-base` — `0`
- `$z-content` — `10`
- `$z-sticky` — `100` — header si sticky
- `$z-overlay` — `200` — backdrops
- `$z-modal` — `300` — modales
- `$z-toast` — `400` — notifications
- `$z-top` — `500` — debug, éléments de dev uniquement

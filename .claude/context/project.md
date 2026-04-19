# Project context

> **Placeholders marked `(…)` must be filled before the Architect writes any
> spec that depends on that information.** References and "Out of scope" can
> remain empty until the project matures — the Architect should ask the user
> when those become relevant.

This file holds everything specific to the current project. Engineering rules
live in `.claude/CLAUDE.md` and are reusable across projects — this file is
where the soul of the current site is defined.

## Client & brief

**Client:** Lucas Aufrère
**Product:** Portfolio freelance personnel (lucas-aufrere.com)
**Type:** Portfolio creative front-end developer freelance
**Quality target:** Awwwards SOTD / portfolio de référence pour prospection
agences et clients directs

**Domain:** lucas-aufrere.com
**Primary goal:** convertir des prospects qualifiés (agences de communication,
marques premium, startups tech) en RDV découverte
**Secondary goal:** être un objet de référence dans la sphère creative dev
française (portable sur Awwwards à terme)

## Positioning

Dark editorial aesthetic. Le site doit ressembler à un objet éditorial
soigné (type magazine design + portfolio d'architecte) plutôt qu'à une
page de vente. La typographie et le rythme font le travail émotionnel ;
la copie reste directe et confiante, sans jargon marketing.

Le ton : expert, sobre, confiant. Pas arrogant. Pas sur-vendeur. L'élégance
vient de la retenue et de la précision des détails, pas de l'accumulation
d'effets.

## Visual direction

### Palette

- Background: **#0A0A0A** (noir profond, légèrement adouci, pas pur #000)
- Text primary: **#FFFFFF** (blanc pur pour les titres importants)
- Text secondary: **#EAEAEA** ou **#E5E5E5** (corps de texte, légère douceur)
- Text tertiary: **#888888** (labels, meta, numérotations, dates)
- Lines / borders: **#2A2A2A** ou **#333333** (dividers, bordures cellules)
- Lines subtle: **#1A1A1A** (séparations discrètes)
- Accent (minimal usage): à définir — pourrait rester grayscale pur OU
  un accent subtil (blanc cassé chaud #F5F0E8 ou rien)

### Principes visuels

- **Dark-mode natif** (pas un "dark theme" alterné — le dark EST la baseline)
- **Typographie éditoriale massive** en hero et titres de sections
- **Grille éditoriale forte** visible (lignes de structure, indices numériques
  type "01 / 04")
- **Espace négatif généreux** — respiration longue entre les sections
  (section padding de 8-12rem vertical desktop)
- **Détails typographiques soignés** : labels en caps small, chiffres
  tabulaires pour les indices, italiques pour les meta
- **Motion subtile** : sert le rythme de lecture, jamais la décoration

### Inspiration visuelle principale

- Dribbble référence : 3M 3D Designer Portfolio Landing Page
  (background noir, lignes grises, texte blanc, approche éditoriale dark)
- Esprit portfolio Aristide Benoist / Ben Mingo
- Éditorial type magazine design (It's Nice That en version dark)

## Typography

### Stack

- **Display (hero, titres de sections H1/H2):**
  Playfair Display OU Fraunces OU une serif éditoriale forte
  → À trancher en architect : **Fraunces variable** est recommandé
  (moderne, expressif, variable axes pour jouer avec weight et opsz)

- **Body (paragraphes, descriptions):**
  Inter (fonctionnel, lisible, neutre)

- **Accent / labels / meta (indices, caps small, dates):**
  JetBrains Mono OU IBM Plex Mono (monospace pour labels techniques
  et indices "01/04", "2025")

### Règles typographiques

- H1 hero : 8-12vw en display serif, tight letter-spacing (-0.02em),
  line-height 0.95
- H2 sections : 4-6rem desktop, display serif
- Body : 1.125rem (18px), line-height 1.6, Inter regular
- Labels/meta : 0.75rem (12px), uppercase, letter-spacing 0.1em, mono
- Contrastes forts (H1 vs body ratio > 4x) pour asseoir la hiérarchie

### Fonts loading

Servies via `next/font/google` pour Fraunces, Inter et JetBrains Mono.
No WOFF2 local nécessaire au démarrage.

## Scroll choreography

- **Lenis smooth scroll** activé sur l'ensemble du site (desktop + mobile,
  sauf reduced-motion)
- **Scroll comme dispositif narratif principal** : les sections se révèlent
  progressivement, le rythme est contrôlé par la descente verticale
- **Text reveals** tied to viewport (ScrollTrigger GSAP), pas au time
- **Animations minimales** : fade-up subtils (16px, duration 0.8s, ease
  power3.out), pas d'animations spectaculaires sans raison
- **Dividers animés** : les lignes de grille peuvent tracer en scroll
  (scaleX ou width de 0 à 100%)
- **Hero statique ou légèrement animé** : pas de WebGL complexe en V1,
  restons sobres et charge rapide

### Respect de reduced-motion

Toutes les animations scroll-tied doivent avoir un fallback statique
quand `prefers-reduced-motion: reduce` est actif. Cf. CLAUDE.md.

## Sections & architecture

### Pages V1

1. `/` — Home
2. `/a-propos` — About
3. `/projets` — Portfolio index
4. `/projets/[slug]` — Portfolio détail (à terme — V1 peut se contenter
   d'une page index sans détails individuels)
5. `/services` — Prestations détaillées
6. `/contact` — Formulaire contact

### Home structure

1. Hero (nom + tagline + CTA)
2. Approche (3-4 lignes d'intro + grille de compétences)
3. Services (4 blocs de prestations)
4. Projets sélectionnés (grille 4 projets)
5. Collaborations (mention Axelle + Samuel)
6. Contact teaser (CTA vers /contact)
7. Footer

## Content tone

- **Français uniquement en V1** (anglais dans 3-6 mois)
- **"Je"** personnel (freelance assumé, pas "nous" corporate)
- **Direct et confiant** sans arrogance
- **Concret** — pas de jargon marketing vide
- **Court** — phrases nettes, pas de remplissage

## References & mood

### Primary reference

- https://dribbble.com/shots/23852527-3M-3D-Designer-Portfolio-Landing-Page-Website
  (background noir, lignes grises, texte blanc, approche éditoriale)

### Complementary references (à ajouter au fil de la prod)

- Aristide Benoist — aristidebenoist.com (structure portfolio freelance)
- Ben Mingo — benmingo.com (direction éditoriale)
- (à compléter lors de la construction du moodboard)

## Out of scope (V1)

- **Version anglaise** — prévue V1.5 dans 3-6 mois, pas maintenant
- **Blog / journal** — pas prioritaire, à envisager V2
- **WebGL / 3D complexe** — on reste sur SVG, canvas simples et GSAP
  pour la V1 (rapidité de prod + robustesse)
- **Animations spectaculaires non justifiées** — pas de "juste parce que
  c'est cool", chaque animation doit avoir une raison narrative
- **Design system trop rigide** — le site reste éditorial, pas une
  application SaaS : on priorise la composition sur la systématisation
- **Case studies détaillées** — V1 se contente d'un portfolio index
  avec 4 projets présentés succinctement. Pages /projets/[slug]
  repoussées à V2
- **Témoignages clients** — à ajouter quand la reco Dexnill arrive
  (dans 1-2 semaines espérées)
- **Multi-langue runtime switcher** — si on ajoute l'anglais plus tard,
  ce sera un build FR-only et EN-only séparés ou une simple route /en

## Key content blocks

### Hero

- Nom : "Lucas Aufrère"
- Tagline : "Développeur front-end créatif freelance.
  Sites sur-mesure, animations fluides et interfaces soignées."
- Context : "Basé à Clermont-Ferrand — Missions partout en France
  et à l'international."
- CTAs : "Voir les projets" / "Me contacter"

### Projets à afficher (V1)

1. **Dexnill Productions** — Client · 2025 — Next.js + GSAP + Lenis
2. **Kengo Kuma** — Étude personnelle · 2025 — Next.js + GSAP
3. **Jacquemus** — Étude personnelle · 2025 — Next.js + GSAP
4. **Fyconic** — Laboratoire créatif personnel

### Services à afficher

1. Sites web sur-mesure (à partir de 3500€ HT)
2. Animations et interactions web (à partir de 2000€ HT)
3. Développement front-end white-label (à partir de 1200€ HT)
4. SEO technique et performance (à partir de 800€ HT)

- Mention discrète de la maintenance mensuelle (à partir de 29€/mois)

## Technical constraints

- Next.js 15 (App Router)
- React 19
- TypeScript strict
- SCSS Modules (pas de CSS-in-JS ni Tailwind)
- GSAP 3 + ScrollTrigger
- Lenis
- Vercel deployment
- Performance cible : Lighthouse 95+ sur desktop et mobile
- Accessibilité : WCAG AA minimum
- SEO technique intégré dès le build (metadata, OG, schema.org, sitemap)

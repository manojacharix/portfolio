# Manoj Achari — Design System

**Owner:** Manoj Achari  
**Role:** AI Product Manager · Builder · Designer  
**Tagline:** From branding to product design to deployment — the full stack of making things real.

---

## About

Manoj Achari is a one-person product powerhouse: AI-native, builder-minded, and refreshingly direct. He takes digital products from zero — brand, design system, prototype, code, deployment — with no hand-waving and no committees slowing him down. The brand reflects that: sharp, confident, a little witty, never corporate.

**Uploaded sources:**
- `uploads/manoj_logo.svg` — Primary logo mark (geometric shield shape)
- `uploads/manojbrand_colors.png` — Color palette reference (Neutral/Grey + Yellow scale)
- `uploads/manojbrand_colors2.png` — Color palette reference (Blue + LightBlue scale)
- Font zips (`Space_Grotesk.zip`, `DM_Sans.zip`) were listed but not present in uploads at time of generation — substituted with Google Fonts CDN (see note in VISUAL FOUNDATIONS)

---

## Content Fundamentals

### Voice & Tone

**Witty, tad bit informal, genuine and direct.** No filler. No "leveraging synergies." No corporate fluff.

- **First person, singular.** "I build..." not "We help..."
- **Active voice always.** "Shipped 12 products" not "12 products have been shipped."
- **Short sentences punch harder.** Use them. Especially for emphasis.
- **Lowercase-casual where it fits.** e.g. "yeah, that's me" or "let's just try it" in UI microcopy.
- **Smart > Clever.** Wit that comes from insight, not wordplay for wordplay's sake.
- **No emoji** in UI or branded copy. Clean visual language does the work.
- **Titles and headings:** Sentence case. "Build. Ship. Repeat." not "Build, Ship, Repeat".
- **CTAs:** Verbs first, tight. "See the work." "Let's talk." "Ship it."

### Specific examples

| Context | ✅ Do | ❌ Don't |
|---|---|---|
| Hero headline | "Build. Ship. Repeat." | "Empowering Digital Transformation" |
| About line | "I don't just design — I make it real." | "Passionate professional with 10+ years..." |
| CTA | "Let's talk." | "Get In Touch With Me Today" |
| Project desc | "Zero to shipped in 3 weeks." | "Leveraged agile methodologies to deliver..." |
| Error message | "That doesn't look right." | "An error has occurred. Please try again." |
| Empty state | "Nothing here yet. Good time to build something." | "No items found." |

---

## Visual Foundations

### Colors

Dark-first. The base is near-black (`#030303` to `#141414`) — not pure black, just deep enough to feel rich. Yellow (`#F18F01`) is the energy: used for CTAs, hover states, accent underlines, and key moments of emphasis. Blue (`#2980B9`) and Light Blue (`#26C0F8`) represent the AI/tech side — precise, clear, digital. Together: a palette that reads as "serious builder with personality."

**Usage rules:**
- Backgrounds: always dark (`grey-950` to `grey-800`)
- Primary text: white or `grey-100`
- Muted/secondary text: `grey-300`
- Accent/interactive: `yellow-500` (#F18F01) as default
- Tech/AI contexts: `lightblue-600` (#26C0F8)
- Avoid: using yellow on a white/light background; using gradients casually

### Typography

- **Display / Headings:** Space Grotesk — geometric, slightly quirky, distinctive. Bold weights (600–700) for headlines; tight letter-spacing (`-0.03em`) at large sizes.
- **Body / UI:** DM Sans — clean, neutral, highly readable. Used for all running copy, labels, navigation, form elements.
- **Mono:** JetBrains Mono or Fira Code — code snippets, technical labels, terminal-style moments.
- **Scale:** jumps from 16 → 18 → 24 → 32 → 40 → 56 → 80px. Generous spacing at large sizes; tight at small.
- **Label Caps:** DM Sans, 11px, 600 weight, 0.12em tracking, uppercase. Used for section labels, metadata, tags.

### Spacing

4px base unit. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px. Sections breathe — generous vertical padding (64–96px). Component internals are tighter (8–24px).

### Backgrounds & Surfaces

- **Base surface:** `grey-950` (#030303)
- **Raised surface:** `grey-800` (#080808) — cards, panels
- **Elevated:** `grey-500` (#141414) — tooltips, dropdowns, modals
- No background images by default. No gradients on backgrounds.
- Subtle texture can be introduced via very low-opacity noise (optional, for hero sections).

### Cards

- Background: `grey-800`, border: `1px solid grey-500`
- Border-radius: `12px` (default), `16px` (large cards)
- Optional top-border accent in `yellow-500` for featured/highlighted cards
- Box shadow: `shadow-md` for standard, `shadow-accent` (yellow glow) for CTA cards

### Animation

- Keep it subtle and purposeful. No bounces, no spring physics.
- Transitions: `150–200ms ease` for hover states; `300ms ease` for panel transitions.
- Hover: slight brightness increase or border color change (to yellow-500). No scale transforms on cards.
- Press states: `yellow-600` (darker) — no physical "press" shrink.
- Fade-in on scroll: opacity 0→1 with slight translateY(8px)→0, `400ms ease-out`.

### Borders

- Default: `1px solid grey-500` (#141414)
- Accent: `1.5px solid yellow-500` (focus states, selected states)
- Subtle: `1px solid grey-600` (dividers)
- No decorative border-only-left patterns.

### Shadows

- `shadow-sm`: subtle depth on flat cards
- `shadow-md`: panels and dropdowns
- `shadow-lg`: modals and overlay surfaces
- `shadow-accent`: yellow glow — for CTAs and featured content only
- `shadow-blue`: cyan glow — for AI/tech feature highlights

### Corner Radii

- `4px` — small chips, code blocks
- `8px` — buttons, inputs
- `12px` — cards, panels (default)
- `16px` — large cards, modals
- `24px` — illustrated containers
- `999px` — pill badges, pill buttons

### Iconography → see ICONOGRAPHY section

### Imagery

- **Color vibe:** Cool-dark. Blues, grays, deep navy backgrounds. Yellow used as a highlight color in imagery too.
- No stock photography feel. Prefer abstract product screenshots, terminal/code aesthetics, geometric shapes.
- Full-bleed images used sparingly and only in hero contexts.
- No hand-drawn illustrations.

### Layout

- Max content width: `1200px`, centered.
- Column grid: 12-column with `24px` gutters.
- Fixed header when scrolling.
- Mobile-first, breakpoints at 640/768/1024/1280px.
- Heavy use of CSS Grid for 2- and 3-column layouts.

---

## Iconography

**Icon system:** [Phosphor Icons](https://phosphoricons.com/) — CDN: `https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js`

**Usage:**
```html
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js"></script>
<i class="ph-bold ph-rocket-launch"></i>
```

**Weight rules:**
- `ph-bold` — default for UI, navigation, buttons (pairs with Space Grotesk display font)
- `ph` (regular) — body text inline icons, meta info
- `ph-thin` — decorative large icons only (hero contexts)
- `ph-duotone` — not recommended; clashes with dark palette

**Key icons in use:**
| Context | Icon |
|---|---|
| Launch / CTA | `ph-rocket-launch` |
| AI / Intelligence | `ph-brain` |
| Code / Build | `ph-code` |
| Product / Layout | `ph-layout` |
| Growth / Metrics | `ph-chart-line-up` |
| Speed / Energy | `ph-lightning` |
| Cloud / Deploy | `ph-cloud` |
| Systems | `ph-cube`, `ph-gear` |
| Navigation | `ph-arrow-right`, `ph-arrow-left` |
| Success | `ph-check-circle` |

**No emoji.** No unicode substitutes. No hand-rolled SVG icons. Use Phosphor or leave a placeholder.

**Logo:** `assets/manoj_logo.svg` — geometric shield/hexagon shape. White on dark, or inverted (black) on yellow/light.

---

## File Index

```
/
├── README.md                    ← You are here
├── SKILL.md                     ← Agent skill descriptor
├── colors_and_type.css          ← All CSS tokens: colors, type, spacing, radii, shadows
├── assets/
│   └── manoj_logo.svg           ← Primary logo mark
├── preview/
│   ├── colors-neutrals.html     ← Grey scale swatches
│   ├── colors-yellow.html       ← Yellow accent scale
│   ├── colors-blue.html         ← Blue + LightBlue scale
│   ├── colors-semantic.html     ← Semantic token chips
│   ├── colors-palette.html      ← Full palette + combos
│   ├── type-display.html        ← Space Grotesk display specimens
│   ├── type-body.html           ← DM Sans body specimens
│   ├── spacing-scale.html       ← Spacing scale bars
│   ├── spacing-radii-shadows.html ← Radii + shadow system
│   ├── components-buttons.html  ← Button variants + sizes
│   ├── components-badges.html   ← Badges + tags
│   ├── components-cards.html    ← Card variants
│   ├── components-inputs.html   ← Form inputs
│   ├── brand-logo.html          ← Logo on dark + yellow
│   └── brand-icons.html         ← Phosphor icon showcase
└── ui_kits/
    └── personal_site/
        ├── README.md
        └── index.html           ← Interactive personal site prototype
```

---

## ⚠️ Caveats

- **Font files missing:** `Space_Grotesk.zip` and `DM_Sans.zip` were listed but not found in uploads. Both fonts are loaded via Google Fonts CDN. For production/offline use, please provide the actual font files.
- **No illustrations:** No brand illustrations were provided. Placeholder gradients used in project card thumbnails.

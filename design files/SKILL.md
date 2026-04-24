---
name: manoj-achari-design
description: Use this skill to generate well-branded interfaces and assets for Manoj Achari's personal brand — an AI product manager who builds digital products from branding to deployment. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production work.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick Reference

**Fonts:** Space Grotesk (display/headings) + DM Sans (body) via Google Fonts  
**Icons:** Phosphor Icons — `https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js` — use `ph-bold` weight  
**Logo:** `assets/manoj_logo.svg` — white on dark, or CSS `invert(1)` on light/yellow  
**CSS tokens:** `colors_and_type.css` — import this first

**Key colors — Light Theme (primary):**
- Background: `#F0FBFE` (lightblue-50)
- Surface: `#FFFFFF`
- Accent/CTA: `#26C0F8` (lightblue-600)
- Deep accent: `#F18F01` (yellow-500) — for CTAs, highlights
- Text: `#010D14` / `#05678A` / `#A6CEDF`

**Key colors — Dark Theme:**
- Background: `#010D14` (near-black navy)
- Accent: `#26C0F8` (cyan), `#F18F01` (yellow)

**Tone:** Witty, direct, informal but genuine. First person. Short sentences. No emoji. No em dashes. No corporate fluff. Sentence case headings.

**Animation:** Import `animations.css` for entrance classes (`ma-fade-up`, `ma-scale-in`, etc.), stagger delays (`ma-delay-1` through `ma-delay-6`), micro-interactions (`ma-hover-lift`, `ma-press`), and continuous animations (`ma-pulse`, `ma-float`, `ma-spin`, `ma-blink`, `ma-shimmer`).

**UI Kit:** `ui_kits/personal_site/index.html` — interactive site prototype: light theme, split hero with dot-matrix WebGL terminal, agent CLI typewriter, Home/Work/Contact screens.

**Social links:** LinkedIn: manoj-manages/ · X: x_achari · GitHub: manojacharix

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

**Key colors:**
- Background: `#030303` (grey-950)
- Surface: `#080808` (grey-800)
- Accent/CTA: `#F18F01` (yellow-500)
- Tech/AI accent: `#26C0F8` (lightblue-600)
- Text: `#FFFFFF` / `#D1D1D1` / `#737373`

**Tone:** Witty, direct, informal but genuine. First person. Short sentences. No emoji. No corporate fluff. Sentence case headings.

**UI Kit:** `ui_kits/personal_site/index.html` — interactive prototype of the personal site

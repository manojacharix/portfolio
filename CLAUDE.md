@AGENTS.md

# Portfolio — Agent Rules

## After every code change, run the build audit

```bash
cd /Users/manojachari/Sites/portfolio && npm run build 2>&1
```

Then run the audit checklist below. Do not commit or push until all checks pass.

---

## Build & Audit Protocol

### 1. Build check
- `npm run build` must exit 0 with no errors
- Zero TypeScript errors
- Zero ESLint errors
- All routes listed under `Route (app)` — verify `/`, `/work`, `/about`, `/contact`, `/work/[slug]` are present

### 2. CSS rules
- All `@import` statements in any `.css` file must be at the very top, before any rules
- No Google Fonts `@import` inside CSS files — fonts are loaded via `<link>` in `layout.tsx`
- CSS variables must be defined in `:root` in `globals.css` before use

### 3. Next.js App Router rules
- `"use client"` required on any component using `useEffect`, `useRef`, `useState`, `usePathname`, or any browser API
- Dynamic route params (`params`) must be typed as `Promise<{...}>` and awaited — NOT accessed directly
- `generateStaticParams` must be exported from all `[slug]` pages
- No `next/font` imports — fonts are loaded via Google Fonts CDN in `layout.tsx`

### 4. Content integrity
- `content/meta.json` — verify `name`, `headline`, `email`, `linkedin`, `calendly`, `resume` are filled (no placeholder values)
- `content/work.json` — verify no case study has "TBD" in `problem`, `approach`, or `outcome`
- `content/about.json` — verify `experience` array has at least 3 entries

### 5. Design system checks
- Background must use `var(--bg)` or `var(--navy)` — not hardcoded white or zinc
- Body font must resolve to DM Sans (`var(--font-body)`)
- Display/heading font must resolve to Space Grotesk (`var(--font-display)`)
- CTAs must use `var(--cyan-600)` or `var(--yellow)` — not tailwind blue/zinc

### 6. WebGL / canvas components
- `HeroTerminal.tsx` must have `"use client"` at top
- Canvas `useEffect` must return a cleanup function that calls `cancelAnimationFrame`
- `resize` event listener must be removed in cleanup

### 7. Accessibility basics
- All `<img>` and `<Image>` tags must have `alt` text
- All `<Link>` tags must have visible text or `aria-label`
- No `onClick` on non-interactive elements without `role` and `tabIndex`

### 8. Agent-managed content
- `content/*.json` files are the single source of truth — never hardcode portfolio content in `.tsx` files
- If adding a new case study, add it to `work.json` only — pages are generated from that file

---

## Common fixes

| Error | Fix |
|---|---|
| `@import rules must precede all rules` | Move Google Fonts to `<link>` in `layout.tsx`, remove from CSS |
| `params` type error in `[slug]/page.tsx` | Type as `Promise<{slug:string}>` and `await params` |
| `useEffect` in server component | Add `"use client"` to the component file |
| Font not applying | Check `var(--font-body)` is set on `body` in `globals.css` |
| WebGL canvas blank | Check `devicePixelRatio` resize and `gl.viewport` call |

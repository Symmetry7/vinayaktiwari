# Vinayak Tiwari Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old starter site in `Symmetry7/vinayaktiwari` with a single-page, dark monochrome AI-engineer portfolio whose hero has a physics-driven 3D lanyard badge.

**Architecture:** Vite SPA, one page, no router. All copy and links live in one typed module (`src/content.ts`); section components only render it, so content rules (no "CTO", no phone, hidden missing links, AI-first order) are tested in one place. The 3D badge is a lazy-loaded island with a static-image fallback, so the page is fully usable before/without WebGL.

**Tech Stack:** Vite 6, React 19, TypeScript, Tailwind CSS 3, `motion` (scroll reveals), `three` + `@react-three/fiber` 9 + `@react-three/drei` 10 + `@react-three/rapier` 2 + `meshline` 3 (lanyard, per React Bits `Lanyard`), Vitest + @testing-library/react + jsdom.

**Spec:** `docs/superpowers/specs/2026-11-08-portfolio-design.md` — read it before any task; section numbers below (§) refer to it.

## Global Constraints

- Repo `C:\Users\KIIT\portfolio` = clone of `https://github.com/Symmetry7/vinayaktiwari.git`, branch `master`. Pushing to `master` deploys to Vercel → **never push**; local commits only when Vinayak asks (memory rule style: he reviews changes).
- Package manager: npm (existing `package-lock.json`). Node v22.23.4.
- Site text says **"Intern"** at InseLabs, never "CTO" (§3.6). The PDF is served unchanged.
- No phone number anywhere on the site (§3.8).
- A link with no known URL renders nothing — never `href="#"` (§5).
- Calendly is out of scope (§3.8). "Start a project" = `mailto:vinayaktiwari732@gmail.com?subject=Project%20inquiry`.
- LinkedIn = `https://www.linkedin.com/in/vinayaktiwari9`. Email = `vinayaktiwari732@gmail.com`.
- Resume served at `/resume-vinayak-tiwari.pdf` (existing filename in `public/`, keeps old shared links working — Claude's call), overwritten with `C:\Users\KIIT\Downloads\vinayak-T-cv_1.pdf`. Opens in a new tab.
- Monochrome palette, no v0/Vercel/Globant branding or event copy (§2).
- Before every UI-editing task: read `C:\Users\KIIT\.agents\skills\impeccable\reference\craft-floor.md`. Design checks use `C:\Users\KIIT\.codex\skills\ui-ux-pro-max\SKILL.md` priorities 1–7.
- Images: use `npx --yes sharp-cli` one-off for resizing/WebP; do not add an image dependency.

## Review Focus

1. **Swiping over the badge on a phone** — page must still scroll vertically; only a deliberate drag on the card moves it. → test in Task 5.
2. **No WebGL / 3D fails to load** — static badge image shows, rest of page unaffected. → test in Task 5.
3. **`prefers-reduced-motion: reduce`** — words appear without animation, marquee doesn't move, badge hangs still (no auto-swing). → tests in Tasks 4 and 5.
4. **A link URL still TBD** (repos, GitHub, Codeforces, AlgoGym live) — its button/link is absent, not dead. → test in Task 2.
5. **Slow connection** — hero text and buttons render before the 3D chunk downloads; the 3D code is not in the main bundle. → test in Task 5 (bundle check) and Task 3.

---

### Task 1: Clean slate and toolchain

**Files:**
- Delete: `src/components/ui/`, `src/hooks/`, `src/pages/`, `src/App.css`, `src/lib/utils.ts`, `components.json`, `AGENTS.md`, `.dockerignore`, `public/placeholder.svg`
- Modify: `package.json`, `.npmrc`, `vite.config.ts`, `tsconfig.app.json`, `.gitignore`, `src/App.tsx`, `src/main.tsx`, `tailwind.config.ts`, `src/index.css`
- Create: `src/test/setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Produces: `App` default export from `src/App.tsx`; `npm test`, `npm run build`, `npm run typecheck` all work.

- [ ] **Step 1:** Delete the files above. Empty `.npmrc` of `legacy-peer-deps=true` (delete the file) so peer conflicts surface. Add `.superpowers/` and `.playwright-mcp/` to `.gitignore`.
- [ ] **Step 2:** Rewrite `package.json` dependencies to only: `react`, `react-dom` (^19), `motion`, `three`, `@react-three/fiber` (^9), `@react-three/drei` (^10), `@react-three/rapier` (^2), `meshline` (^3). devDependencies: `vite` (^6), `@vitejs/plugin-react-swc`, `typescript`, `@types/react`, `@types/react-dom`, `@types/three`, `tailwindcss` (^3), `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `prettier`. Delete `package-lock.json` and `node_modules`, run `npm install`. Expected: no `ERESOLVE` errors.
- [ ] **Step 3:** In `vite.config.ts` add `test: { environment: "jsdom", setupFiles: "./src/test/setup.ts", globals: true }` (import `defineConfig` from `vitest/config`). `setup.ts` imports `@testing-library/jest-dom/vitest`. Set `"strict": true` in `tsconfig.app.json`.
- [ ] **Step 4: Write the failing test** `src/App.test.tsx`: `it("renders a main landmark")` → `render(<App />)`; `expect(screen.getByRole("main")).toBeInTheDocument()`.
- [ ] **Step 5:** Run `npm test` — Expected: FAIL (App still imports deleted modules).
- [ ] **Step 6:** `App.tsx` returns `<main />` (no router/providers). `main.tsx` unchanged except import path. Reset `tailwind.config.ts` to `content: ["./index.html","./src/**/*.{ts,tsx}"]` with empty `extend`; `index.css` to the three `@tailwind` lines.
- [ ] **Step 7:** Run `npm test && npm run typecheck && npm run build` — Expected: all pass.
- [ ] **Step 8: Commit** (only if Vinayak has OK'd commits) `chore: clear old starter, move to React 19 toolchain`.

### Task 2: Content module

**Files:**
- Create: `src/content.ts`, `src/content.test.ts`

**Interfaces:**
- Produces (exact types):
  ```ts
  export type Href = string | undefined;           // undefined = hide
  export interface Project { slug: string; name: string; hook: string; dates: string; stack: string[]; points: string[]; live?: Href; repo?: Href; note?: string }
  export interface Service { title: string; body: string; proof: string }   // proof = Project.slug
  export interface Role { title: string; org: string; dates?: string; points: string[] }
  export interface Achievement { title: string; detail: string; href?: Href; featured?: boolean; image?: string }
  export interface SocialLink { label: string; href: Href }
  export const profile: { name: string; role: "AI Engineer"; eyebrow: string; tagline: string; oneLiner: string; about: string; email: string; resumeHref: "/resume-vinayak-tiwari.pdf"; startProjectHref: string }
  export const stack: string[]; export const projects: Project[]; export const services: Service[];
  export const roles: Role[]; export const achievements: Achievement[]; export const socials: SocialLink[];
  export const visibleLinks: (links: SocialLink[]) => (SocialLink & { href: string })[];
  ```
- Copy: verbatim facts from spec §3.2–3.8. `projects` order: `investiq`, `truehuman`, `algogym`, `weapon-detection`. `stack` starts with `"Azure OpenAI"`. All TBD URLs = `undefined`.

- [ ] **Step 1: Write failing tests** in `src/content.test.ts`:
  - `it("never says CTO")` → `expect(JSON.stringify(allContent)).not.toMatch(/\bCTO\b|Chief Technology/i)` (export an `allContent` aggregate for this).
  - `it("has no phone number")` → `not.toMatch(/7489788301|\+91/)`.
  - `it("leads with AI work")` → `projects.map(p=>p.slug)` equals `["investiq","truehuman","algogym","weapon-detection"]`; `stack[0] === "Azure OpenAI"`; `profile.role === "AI Engineer"`.
  - `it("every service proof points at a real project")`.
  - `it("hides links without a URL")` → `visibleLinks([{label:"GitHub",href:undefined},{label:"LinkedIn",href:"https://www.linkedin.com/in/vinayaktiwari9"}])` returns only LinkedIn.
  - `it("start-project mails Vinayak")` → `profile.startProjectHref === "mailto:vinayaktiwari732@gmail.com?subject=Project%20inquiry"`.
  - `it("lists InseLabs as an internship")` → a role with `org` matching `/InseLabs/` has `title === "Intern"`.
- [ ] **Step 2:** `npm test src/content.test.ts` — Expected: FAIL (module missing).
- [ ] **Step 3:** Write `src/content.ts` from the spec.
- [ ] **Step 4:** `npm test` — Expected: PASS.

### Task 3: Design system, assets and static page

Builds every section without motion or 3D. Hero's right side holds `<BadgeSlot />` rendering the static fallback image for now.

**Files:**
- Create: `DESIGN.md`, `src/components/{Nav,Hero,Marquee,About,Projects,Services,Experience,Achievements,Contact,Footer,DotField,BadgeFallback}.tsx`, `src/App.page.test.tsx`
- Create assets: `public/img/portrait-badge.webp` (chest-up crop, ~600×800, from `C:\Users\KIIT\Downloads\WhatsApp Image 2026-11-08 at 10.31.18 AM.jpeg`), `public/img/about.webp` (full photo, ≤1200px tall), `public/img/achievement-stage.webp` (`C:\Users\KIIT\Downloads\1791977633696.jpeg`), `public/img/icpc-certificate.webp` (`C:\Users\KIIT\Downloads\ICPC certificate (1).jpg`), `public/img/badge-static.webp` (rendered card face for fallback — produced in Task 5; use `portrait-badge.webp` until then), `public/og.png` (1200×630).
- Modify: `index.html` (title "Vinayak Tiwari — AI Engineer", meta description, OG tags, fonts), `tailwind.config.ts`, `src/index.css`, `src/App.tsx`, `public/resume-vinayak-tiwari.pdf` (overwrite)

**Interfaces:**
- Consumes: everything from `src/content.ts`.
- Produces: `App` renders sections with ids `work`, `services`, `experience`, `achievements`, `contact`; `Hero` accepts `badge: React.ReactNode`.

- [ ] **Step 1:** Run impeccable context (`C:\Users\KIIT\.agents\skills\impeccable\scripts\impeccable.cmd context` from repo root; if it fails, say so and read its `reference/new-work.md` directly). Choose fonts with ui-ux-pro-max font-pairing data, matching the demo: tight geometric/grotesk sans for headings + monospace for labels. Record tokens (bg, fg, muted, line, radii, type scale, fonts) in `DESIGN.md` and map them into `tailwind.config.ts` / CSS variables in `index.css`. Contrast ≥ 4.5:1 for body text.
- [ ] **Step 2:** Produce the image assets above with `npx --yes sharp-cli`; copy the resume PDF over `public/resume-vinayak-tiwari.pdf`. Photos get a light grayscale treatment (§3.4); verify the badge crop visually (Read the output image).
- [ ] **Step 3: Write failing tests** `src/App.page.test.tsx`:
  - each id `work, services, experience, achievements, contact` exists;
  - `getAllByRole("link", { name: /resume/i })` length ≥ 2, each `href="/resume-vinayak-tiwari.pdf"` and `target="_blank"` and `rel` contains `noopener`;
  - `getAllByRole("link", { name: /start a project/i })[0]` has `href` = `profile.startProjectHref`;
  - no element has `href="#"` (`container.querySelectorAll('a[href="#"]').length === 0`);
  - h1 contains "Vinayak Tiwari"; text "AI Engineer" present;
  - every `<img>` has non-empty `alt`.
- [ ] **Step 4:** `npm test` — Expected: FAIL.
- [ ] **Step 5:** Build the components. `DotField` = CSS/SVG dotted halftone background (no image download, `aria-hidden`). `Marquee` renders `stack` twice for a seamless loop (static for now, `aria-label="Tech stack"`, duplicate copy `aria-hidden`). Achievements: ICPC card first, featured, thumbnail opens `/img/icpc-certificate.webp` in a new tab; stage photo beside the list with a neutral caption ("Contest win, KIIT — October") until Vinayak names the contest. Mobile-first: layouts work at 360px.
- [ ] **Step 6:** `npm test && npm run build` — Expected: PASS.
- [ ] **Step 7:** Visual check: `npm run dev`, screenshot with Playwright at 1440×900 and 390×844 (desktop full page + mobile full page). Fix what one look shows, then look once more.

### Task 4: Motion — word reveals and marquee

**Files:**
- Create: `src/components/RevealWords.tsx`, `src/components/RevealWords.test.tsx`
- Modify: `src/components/Marquee.tsx`, `src/index.css`, section headings in Task 3 components

**Interfaces:**
- Produces: `RevealWords({ text, as = "h2", className }: { text: string; as?: "h1"|"h2"|"p"; className?: string })` — renders the full `text` once as accessible text (visually-hidden span) plus `aria-hidden` per-word spans animated with `motion` `whileInView`, stagger ~0.04s, opacity+translateY+blur only.

- [ ] **Step 1:** Load skills `animate` and `vectorlab-ux-skills:reduced-motion`; follow their timing guidance.
- [ ] **Step 2: Write failing tests:** `it("exposes the full sentence to screen readers")` → `getByRole("heading",{name:"Let's build it"})` for `<RevealWords as="h2" text="Let's build it"/>`; `it("renders words without motion when reduced motion is on")` → mock `matchMedia('(prefers-reduced-motion: reduce)')` true; word spans have no inline `opacity: 0`/transform.
- [ ] **Step 3:** `npm test` — Expected: FAIL.
- [ ] **Step 4:** Implement `RevealWords` (use `useReducedMotion` from `motion/react`). Marquee: CSS `@keyframes` translateX(-50%), pauses on hover, `animation: none` under `@media (prefers-reduced-motion: reduce)`. Swap section headings to `RevealWords`.
- [ ] **Step 5:** `npm test && npm run build` — Expected: PASS.

### Task 5: 3D lanyard badge

**Files:**
- Create: `src/components/badge/Lanyard.tsx` (adapted from React Bits `Lanyard` TS+TW variant), `src/components/badge/cardTexture.ts`, `src/components/badge/BadgeSlot.tsx`, `src/components/badge/BadgeSlot.test.tsx`, `public/badge/card.glb`, `public/badge/lanyard.png`
- Modify: `src/components/Hero.tsx` (use `BadgeSlot`), `src/components/BadgeFallback.tsx`

**Interfaces:**
- Produces: `BadgeSlot()` — decides 3D vs fallback; `Lanyard` loaded via `React.lazy(() => import("./Lanyard"))` inside `<Suspense fallback={<BadgeFallback/>}>`. `canUseWebGL(): boolean` exported from `BadgeSlot.tsx`. `drawCardFace(ctx: CanvasRenderingContext2D, portrait: HTMLImageElement, w: number, h: number): void` in `cardTexture.ts` (name "VINAYAK TIWARI", "AI ENGINEER", "LLM · RAG · AGENTS", monochrome).

- [ ] **Step 1:** Get the React Bits Lanyard source (`https://reactbits.dev` → Lanyard, TS + Tailwind) and its `card.glb` + `lanyard.png`. Check its license header and keep attribution in a comment. Inspect the GLB's card material/UVs to find which texture region is the card front; apply `drawCardFace` output as a `CanvasTexture` on that region (`colorSpace = SRGBColorSpace`, `anisotropy = 16`). Replace `lanyard.png` with a black strap repeating "VINAYAK TIWARI" in white.
- [ ] **Step 2: Write failing tests** `BadgeSlot.test.tsx` (mock `React.lazy` target):
  - `it("shows the static badge when WebGL is unavailable")` → `canUseWebGL` returns false (jsdom has no WebGL) → `getByRole("img",{name:/Vinayak Tiwari badge/i})` present, Lanyard not imported.
  - `it("keeps the badge still under reduced motion")` → reduced motion true → fallback rendered (Claude's call: static image, no physics).
- [ ] **Step 3:** `npm test` — Expected: FAIL.
- [ ] **Step 4:** Implement `BadgeSlot`, `Lanyard`, `cardTexture`. Canvas container: `touch-action: pan-y` and only capture pointer when the drag starts on the card mesh, so vertical swipes scroll the page (Review Focus 1). Render the Canvas only when the hero is in view (`frameloop="demand"` or unmount off-screen) to save battery. Clamp `dpr` to `[1, 2]`.
- [ ] **Step 5:** Render the card face once to `public/img/badge-static.webp` (screenshot of the canvas output) and point `BadgeFallback` at it.
- [ ] **Step 6:** `npm test && npm run build`. Then check the bundle: `ls dist/assets` — Expected: `three`/rapier code is in a separate chunk, main `index-*.js` < 250 kB (Review Focus 5).
- [ ] **Step 7:** Visual + interaction check in Playwright at 1440×900 and 390×844: badge visible, drag swings it, on mobile a vertical swipe starting over the badge scrolls the page.

### Task 6: Quality pass and handoff

**Files:** whatever the checks touch.

- [ ] **Step 1:** Run impeccable critique/audit on the running page (per its SKILL.md Commands table) and `vectorlab-ux-skills:anti-slop`; fix findings that break the spec's look or the craft floor.
- [ ] **Step 2:** `break-ui`: long project names, missing links, 360px width — fix overflow.
- [ ] **Step 3:** `mobile-native` pass at 390×844: safe areas, tap targets ≥ 44px, no horizontal scroll.
- [ ] **Step 4:** Accessibility: keyboard tab through nav → buttons → links with visible focus rings; one `h1`; landmarks.
- [ ] **Step 5:** Final `npm test && npm run typecheck && npm run build` — all PASS. `npm run preview` and take final screenshots (desktop + mobile) to show Vinayak.
- [ ] **Step 6:** Report to Vinayak with screenshots and the still-open items (spec §7). **Do not push** — wait for his explicit "go".

# Vinayak Tiwari — Portfolio

An animated portfolio built with React, TypeScript, Vite, GSAP, and Tailwind CSS. The cream landing page opens behind a short cinematic intro. Four selected projects have their own editorial stories.

## Run locally

```powershell
npm install
npm run dev
```

Open **http://127.0.0.1:5173/**. Vite uses port 5173 and exits if it is occupied by another app.

## Verify

```powershell
npm run typecheck
npm test
npm run build
npm run test:intro
npm run test:site
```

The two browser checks use Playwright Core and expect Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`. Set `CHROME_PATH` to use another executable. `test:intro` checks the scene order, inward and reverse shutter, skip, replay, sound control, reduced motion, and desktop/mobile layouts. `test:site` checks the menu, moving cursor, text rollover, four project routes, images, word counts, and responsive overflow.

## Experience

- The intro runs once per browser session; **Replay Intro** and **Skip Intro** remain available.
- Sound begins only after **Sound On** is selected. The reference site synthesizes its soundtrack with Web Audio; this portfolio has its own synchronized word hits, image noise, and rising drive.
- The final black panels close at the center, then reopen quickly to the live landing page.
- `{{ first name }}` on the hero accepts a visitor's name and keeps it for the session.
- A pointer-following red ball and staggered letter roll respond to interactive text. The hamburger menu sends a bat across the page and opens a Mr. Bean panel.
- The work cards link to `/work/weapon-detection`, `/work/investiq`, `/work/algogym`, and `/work/symm-type`. Each page contains a story grounded in the supplied resume or project repository.
- `prefers-reduced-motion` bypasses the intro and suppresses decorative movement.

## Project tree

```text
public/
  fonts/                 Impact display font
  hero/                  Original portrait assets
  images/                Landing and Gotham posters
  img/                   Portfolio proof images
  intro/                 Original intro frames and restored WebP versions
  menu/                  Supplied Mr. Bean image
  projects/              Four supplied work card images
  reference/             Placeholder quote and hire artwork
  resume-vinayak-tiwari.pdf
scripts/
  intro-qa.mjs           Intro browser check
  site-qa.mjs            Menu, work and project browser check
src/
  intro/                 Scene map, GSAP timeline, score, styles and component
  App.tsx                Landing page and navigation
  CursorBall.tsx         Pointer-following dot
  RollText.tsx           Staggered letter rollover
  ProjectPage.tsx        Project detail layout
  projectPages.ts        Project copy and image mapping
  content.ts             Profile facts
  index.css              Page styles and design tokens
  main.tsx               React entry point
```

## Assets and publication

The landing and Gotham posters are user-supplied artwork. The intro retains the five supplied source frames and uses enhanced WebP versions for playback. The four card images and Mr. Bean image are supplied assets; the project repositories do not contain suitable image files, so these images also serve the detail pages. Their source resolution is approximately 736 px wide.

The quote and hire artwork in `public/reference/`, plus some landing copy, remain placeholders adapted from [Work Sruthi](https://www.worksruthi.com/). Replace those and confirm image usage rights before publishing. `index.html` currently sets `noindex, nofollow`.

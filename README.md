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
- The red cursor sits exactly on the pointer; its dot briefly stretches with movement and becomes an **Open** badge over work cards. Staggered letter rolls respond to interactive text. The hamburger menu sends a bat across the page and opens a Mr. Bean panel.
- The menu links to Experience and Achievements sections drawn from the resume.
- The work gallery uses enhanced 1672 px WebP versions of the four supplied images without cropping their landscape composition. Cards link to `/work/weapon-detection`, `/work/investiq`, `/work/algogym`, and `/work/symm-type`. Each page contains a story grounded in the supplied resume or project repository.
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
  projects/              Four enhanced WebP work card images
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

The landing and Gotham posters are user-supplied artwork. The intro retains the five supplied source frames and uses enhanced WebP versions for playback. The four card artworks were faithfully enhanced from the supplied 736 px images and optimized as WebP; they also serve the detail pages. The Mr. Bean menu image is user-supplied.

The quote and hire artwork in `public/reference/`, plus some landing copy, remain placeholders adapted from [Work Sruthi](https://www.worksruthi.com/). Replace those and confirm image usage rights before publishing. `index.html` currently sets `noindex, nofollow`.

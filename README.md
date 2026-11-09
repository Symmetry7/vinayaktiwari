# Vinayak Tiwari — Portfolio

A single-page portfolio for Vinayak Tiwari, built with React, TypeScript, Vite, GSAP, and Tailwind CSS. The opening sequence uses oversized typography, five cinematic image scenes, an optional original Web Audio score, and a closing shutter that reveals the landing page.

## Run locally

```powershell
npm install
npm run dev
```

Open **http://127.0.0.1:5173/**. The dev server uses port 5173 and stops with an error if another app already occupies it.

## Check the project

```powershell
npm run typecheck
npm test
npm run build
npm run test:intro
```

`test:intro` runs a Chrome browser check with Playwright Core. It expects Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`; set `CHROME_PATH` if yours is elsewhere. It checks the scene order, shutters, skip and replay, the editable name, reduced motion, and desktop and mobile layouts.

## Project tree

```text
public/
  fonts/              Impact display font
  hero/               Vinayak portrait and navigation cutout
  images/             Landing and Gotham posters
  img/                Portfolio proof images
  intro/              Original intro frames and restored WebP versions
  reference/          Placeholder artwork used below the hero
  resume-vinayak-tiwari.pdf
scripts/
  intro-qa.mjs        Browser smoke test
src/
  intro/              Scene map, GSAP timeline, score, styles, component
  App.tsx             Landing page and navigation
  content.ts          Profile and project facts
  index.css           Page styles and design tokens
  main.tsx            React entry point
```

## Experience

- The intro plays once per browser session. **Replay Intro** starts it again; **Skip Intro** reveals the page immediately.
- Sound starts only when the viewer selects **Sound On**, as browsers restrict autoplay audio.
- Visitors can click `{{ first name }}` on the hero and type a name. It remains in that browser session.
- `prefers-reduced-motion` bypasses the cinematic sequence.

## Assets and publication

The landing image in `public/images/vinayak-modern-design.png` and Gotham finale in `public/images/vinayak-gotham-hero.png` are supplied poster artwork. `public/intro/` retains the five supplied originals; `public/intro/restored/` contains enhanced WebP versions used by the intro. The enhancements may differ in fine detail from the originals.

Artwork under `public/reference/` and some copy in `src/App.tsx` are **layout placeholders from [Work Sruthi](https://www.worksruthi.com/)**. Replace them with Vinayak's own projects, writing, and imagery before publishing the site as a finished portfolio. `index.html` currently sets `noindex, nofollow`.

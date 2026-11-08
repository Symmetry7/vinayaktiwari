# Vinayak Tiwari — Portfolio Website Design

Date: 2026-11-08
Status: Draft, awaiting Vinayak's approval

## 1. Intent

A personal portfolio for **Vinayak Tiwari**, a 2nd-year B.Tech CSE student at KIIT (2024–2028), positioned as an **AI Engineer** (GenAI, LLMs, RAG, AI agents/automation). Two audiences, equal weight (Vinayak's instruction):
1. **Recruiters** → land AI-engineering internships / roles. They should leave knowing: he ships real LLM/RAG products, he has strong CS fundamentals (competitive programming record), and he leads (AlgoZenith-KIIT President).
2. **Freelance clients** → people who want something built. They should leave knowing: what he can build for them (AI-powered apps), proof he has built it before, and how to start (book a call / email).

GenAI / AI / LLM work leads everywhere: headline, project order, marquee order, services. Competitive programming is supporting proof, not the headline.

The hook is a **physics-driven 3D ID badge on a lanyard** that visitors can grab, swing and throw — memorable within the first second, then the page gets out of the way and lets the work speak.

## 2. Visual direction (decided by Vinayak)

Modelled on the v0 community template **"v0 IRL event landing — custom 3D lanyard"** by juandadev:
- Template page: https://v0.app/templates/v0-irl-event-landing-custom-3d-lanyard-IegtBb6qiEV
- Live demo: https://v0-irl-landing-template-is.vercel.app
- Credits on the demo: built with v0, Tailark, React Bits.

What to carry over from the demo:
- Near-black background, white/grey monochrome palette, no accent colors (or one very restrained one).
- Large, tight sans-serif headings; small uppercase **monospace** labels (e.g. dates/eyebrows).
- Faint **dotted world-map / halftone** texture behind the hero.
- **3D lanyard badge** hanging in the hero's right side, draggable with physics.
- Headings revealed **word by word** on scroll.
- An auto-scrolling horizontal **logo marquee** under the hero.
- Section rhythm: hero → marquee → cards → timeline → closing CTA → minimal footer.

What NOT to carry over: the "type your name onto the card + download" personalization widget (not useful for a portfolio), v0/Vercel/Globant branding, event copy.

## 3. Page structure & content

Single page, sections in this order: Nav → Hero → Marquee → About → Projects → Services → Experience → Achievements → Contact → Footer. All copy below is drafted from Vinayak's resume (`C:\Users\KIIT\Downloads\vinayak-T-cv_1.pdf`) and chat; builder may polish wording but not change facts.

### 3.1 Nav
Left: "VT" or "Vinayak Tiwari" wordmark. Right: anchor links (Work · Services · Experience · Achievements · Contact), a **Resume** button, and a primary **Hire me** button (scrolls to Contact).

### 3.2 Hero
- Eyebrow (mono): `AI ENGINEER — AVAILABLE FOR FREELANCE & INTERNSHIPS`
- Headline: **Vinayak Tiwari** / sub-headline (Claude's draft): *I build AI products — LLM apps, RAG systems and AI agents.*
- One-liner: Intern at InseLabs · President, AlgoZenith-KIIT · CS @ KIIT '28.
- Buttons: **Start a project** (→ Contact / Calendly), **View my work** (→ projects), **Resume** (see 3.9).
- Right side: the **lanyard badge** (see 4).

### 3.3 Tech marquee
Scrolling row of tech logos/names, AI first: Azure OpenAI, Gemini, LangChain, RAG, Vector DBs, Azure AI Search, Python, FastAPI, Pydantic, TypeScript, Next.js, React, Supabase, PostgreSQL, MongoDB, Docker, Kubernetes, AWS, Azure.

### 3.4 About
Short paragraph (2–3 sentences) + the **full moon photo** (`C:\Users\KIIT\Downloads\WhatsApp Image 2026-11-08 at 10.31.18 AM.jpeg`). Light black-and-white treatment, keep some warmth in the moon glow (Claude's call; Vinayak may ask for full color).

### 3.5 Projects (cards, AI-first order)
Each card leads with the AI capability in plain words a client understands (e.g. "Chat with 100-page financial reports"), then the stack. Display order (table below is unordered): InvestIQ → TrueHuman → AlgoGym (InseLabs work; describe the AI pipeline only, no confidential details, link none) → Weapon Detection.

| Project | Dates | Stack | Summary | Link |
|---|---|---|---|---|
| **TrueHuman** (InseLabs, internship work) | — | AI pipeline | 6-stage identity-protection workflow: facial enrollment, embeddings, web monitoring, matching, 0–100 risk scoring, AI takedown drafting. | none |
| **AlgoGym** (Live) | Aug–Sep 2024 | Next.js, TypeScript, Gemini API, Supabase, PostgreSQL | DSA training platform: 8 tracks, topic/rating filters, verified Codeforces progress; Gemini tutoring and code variants in C++/Java/Python; Codeforces + LeetCode sync with Supabase Auth and RLS. | live URL — **TBD** |
| **InvestIQ** | May–Jun 2025 | Python, FastAPI, Azure OpenAI, LangChain, PostgreSQL | RAG platform for annual-report Q&A with company/year-filtered retrieval; PDF ingestion + semantic chunking into Azure AI Search; Pydantic-validated KPI extraction; Dockerized with Kubernetes config. | GitHub — **TBD** |
| **Weapon Detection** | Oct 2024–Jan 2025 | Python, OpenCV, Haar Cascade | Real-time weapon detection on webcam/CCTV feeds; custom dataset of 255+ images (pistols, rifles, snipers); anomaly-based surveillance alerts. | GitHub — **TBD** |

### 3.5b Services — "What I can build for you" (for freelance clients)
3–4 cards, each tied to proof from the projects above (Claude's draft):
1. **AI chatbots & RAG over your data** — assistants that answer from your PDFs, docs or database, with sources. *Proof: InvestIQ.*
2. **AI agents & workflow automation** — LLM pipelines that do multi-step work: extract, score, draft, notify. *Proof: TrueHuman at InseLabs.*
3. **Full-stack AI web apps** — Next.js/React + FastAPI + Supabase/Postgres, auth, deployed. *Proof: AlgoGym.*
4. **LLM integration into an existing product** — add Gemini/OpenAI features with validated, structured outputs (Zod/Pydantic). *Proof: AlgoGym, InvestIQ.*
Ends with a **Start a project** button → Contact. No prices (non-goal).

### 3.6 Experience timeline (newest first)
1. **Intern — InseLabs.** AI-powered tools and workflow automation; features for TrueHuman's 6-stage identity-protection workflow (facial enrollment, embedding, web monitoring, matching, 0–100 risk scoring, takedown drafting); AI application workflows and integrations. **Title must read "Intern", never "CTO"** (Vinayak's instruction). Dates — TBD.
2. **President — AlgoZenith-KIIT** · Feb 2025 – Present · Onsite. Collaborated with a team of 50 programmers on contest problem-solving strategies; conducted Data Structures classes and led post-contest discussions; solved 1000+ CP problems across CodeChef, Codeforces, AtCoder.
3. **Academic Associate & Web Developer — IIWCPC** (International India Women's Programming Contest). Authored/reviewed DSA problems with the IIT Kanpur team; headed the Contest Integrity Team; built the official IIWCPC website. Dates — TBD.
4. **B.Tech CSE — Kalinga Institute of Industrial Technology**, 2024–2028.

### 3.7 Achievements
Grid/list plus one featured photo (`C:\Users\KIIT\Downloads\1791977633696.jpeg` — stage photo with certificates, AlgoZenith tees, 🥇 on screen, "10th–11th October, Campus-25"). Caption — **TBD** (which contest).
- **Featured first:** ICPC Asia Amritapuri Regional Contest 2025 — Regionalist (rank < 200 per resume). Certificate image: `C:\Users\KIIT\Downloads\ICPC certificate (1).jpg` (participation certificate, hosted by Amrita Vishwa Vidyapeetham, endorsed by ICPC Foundation, dated 03/01/2026). Show as a clickable thumbnail that opens the full image. The certificate itself states participation, not rank — the rank < 200 claim comes from the resume.
- More certificates: from Vinayak's Google Drive folder (pending download; it sits in a second Google account the Drive connector can't see).
- Codeforces Specialist — 1430, top 8% (handle: Vinayak Tiwari — profile URL TBD)
- CodeChef — 1513, top 10% (handle: Symmetry9)
- AIR 1 — Code O Olympic, IIIT Bhubaneswar
- Rank 1 — Geek Clash, GFG-KIIT
- Rank 1 of 100 teams — The Last Test Case (offline), GFG-KIIT
- Finalist — Shaastra Programming Contest, IIT Madras

### 3.8 Contact / closing CTA
Speaks to both audiences. Headline in the template's style (e.g. "Have an AI idea? Let's build it."), sub-line "Hiring? Grab my resume." Primary button **Start a project** → `mailto:vinayaktiwari732@gmail.com` with a prefilled subject (e.g. "Project inquiry"). **Calendly is deferred** (Vinayak: revisit near completion) — do not add it now; keep the CTA easy to repoint later. Links: email `vinayaktiwari732@gmail.com`, LinkedIn `https://www.linkedin.com/in/vinayaktiwari9`, GitHub (URL TBD — resume says `github.com/symmetry`, unverified), Codeforces, CodeChef. Second **Resume** button.

**Phone number is NOT shown** (Claude's call: spam risk).

### 3.9 Resume button (Vinayak's explicit requirement)
Appears in nav/hero and contact. Opens the PDF in a new tab (browser viewer → user can read and download). Serve a static copy of `vinayak-T-cv_1.pdf` from the site's public folder under a clean name (e.g. `/Vinayak-Tiwari-Resume.pdf`). Updating = replacing that one file.

Decided by Vinayak: the PDF stays as-is (it says "CTO"); the site's own text says "Intern". Launch is not blocked on the PDF. The "never CTO" rule applies to site text only, not the PDF.

### 3.10 Footer
Name, small link row, "Built with Next.js · Lanyard from React Bits".

## 4. The badge

- 3D card on a lanyard strap, hanging from the top of the hero, draggable with physics, like the demo.
- Front of card: cropped portrait of Vinayak (chest-up, from the moon photo; some moon glow at the edge), name **Vinayak Tiwari**, role line **AI ENGINEER**, and a small mono detail like `LLM · RAG · AGENTS`. Monochrome to match the page.
- Lanyard strap texture: simple, e.g. repeated "VINAYAK TIWARI" or "VT" in white on black.
- Mobile: badge must still render and be usable (smaller, or placed above/below text); must not block scrolling.

## 5. How it gets made (Claude's calls, Vinayak did not object)

- **Repo: `https://github.com/Symmetry7/vinayaktiwari.git`** (branch `master`), already connected to Vercel under Vinayak's name — pushing to it deploys. Vinayak said the existing code may be deleted/replaced. It is currently a Vite + React + Tailwind + shadcn/ui starter ("fusion-starter", last commit 2025-06-22) with a Calendly link (`calendly.com/symmetry9`).
- **Stack (Claude's call, changed from Next.js):** keep **Vite + React + TypeScript + Tailwind**, the stack the repo and its Vercel project already use, so the Vercel settings keep working untouched. A single static page gains nothing from Next.js. Replace the page contents and drop unused shadcn components/deps.
- Lanyard from **React Bits** (`Lanyard` component — three.js / @react-three/fiber / @react-three/rapier physics); card texture made from Vinayak's photo + text.
- Starting point: the v0 template's source if it can be obtained (v0 "Open in"); otherwise rebuild the look from the live demo using React Bits + Tailwind. Do not copy v0/Vercel branding or event copy.
- Hosting: **Vercel** free tier, default `*.vercel.app` domain unless Vinayak provides one.
- Work in a clone of that repo at `C:\Users\KIIT\portfolio` (move this spec into it; add `.superpowers/` to `.gitignore`).
- Deploy (Claude's call): build ends with a passing production build locally. Pushing to `master` = going live, so push only after Vinayak explicitly says so in chat.
- Photo check (verified): the moon photo is 1200×1600; Vinayak sits lower-right, face ~150px wide. A chest-up crop of ~450×600px is enough for the card texture (card renders well under that size on screen).
- Unknown links at launch: hide the link/button rather than show a dead one.
- **Design-quality skills to use during the build (Vinayak's request):**
  - **impeccable** (`C:\Users\KIIT\.agents\skills\impeccable\SKILL.md`): run its context step, follow `reference/new-work.md` and read `reference/craft-floor.md` before UI edits; use its critique/audit to keep the site free of "AI slop" tells.
  - **ui-ux-pro-max** (`C:\Users\KIIT\.codex\skills\ui-ux-pro-max\SKILL.md`): font pairing, accessibility/touch/performance checklist, scroll-animation presets.
  - Supporting Claude Code skills: `vectorlab-ux-skills:anti-slop`, `animate` + `vectorlab-ux-skills:reduced-motion` for the scroll reveals, `break-ui` to stress-test with long/missing content, `mobile-native` for the phone pass.
  - Runway (AI video, "render") is available but **not planned**: a generated video background would fight the monochrome template look and slow the page. Use only if a specific need appears and Vinayak agrees.
- Sitepeel DESIGN.md was attempted but parked (browser extension not connecting); builder reads colors/fonts from the template/demo directly.

## 6. Goals / non-goals / anti-goals

**Goals:** memorable badge interaction; a recruiter finds AI projects, experience, achievements and resume within seconds; a client understands what he can build and can book a call in one click; looks polished on desktop and phone; fast to load.

**Non-goals:** pricing/packages, blog, CMS, admin panel, contact form backend, analytics, dark/light toggle, multiple pages, badge personalization by visitors.

**Anti-goals (failure even if it works):**
- Saying "CTO" anywhere on the site.
- The 3D badge making the page slow, janky, or broken on phones / low-end laptops.
- Looking like the unmodified v0 event template (event copy, sponsor logos).
- Exposing his phone number.
- Reading as "competitive programmer who also does web" instead of "AI engineer".
- Leaking confidential InseLabs/TrueHuman details beyond what's on his resume.

## 7. Open items (need Vinayak)
1. AlgoGym live URL; GitHub URLs for InvestIQ and Weapon Detection; his GitHub profile URL.
2. Codeforces and CodeChef profile URLs; ICPC certificate link.
3. Which contest the achievement photo is from (caption).
4. Dates for InseLabs internship and IIWCPC role.
5. Custom domain (optional).
6. Calendly / "Book a call" — revisit near completion.

## 8. Left to the builder
Exact typography/fonts, spacing, animation timing, card texture design details, section copy polish, how the badge adapts on small screens, accessibility details (alt text, reduced-motion fallback for scroll reveals and the physics badge, keyboard-reachable links).

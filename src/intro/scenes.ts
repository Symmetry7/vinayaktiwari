export const INTRO_SESSION_KEY = "cinematic-intro-seen-v1";

// Restored source frames are kept alongside the originals in public/intro.
export const INTRO_ASSETS = {
  eyes: "/intro/restored/eyes.webp",
  promise: "/intro/restored/promise.webp",
  unbothered: "/intro/restored/unbothered.webp",
  discipline: "/intro/restored/discipline.webp",
  focus: "/intro/restored/focus.webp",
  gotham: "/images/vinayak-gotham-hero.png",
} as const;

export type IntroAssetKey = keyof typeof INTRO_ASSETS;

export const INTRO_SCENES = [
  { id: "watch", at: 0, word: "WATCH.", image: null },
  { id: "eyes", at: 0.27, word: null, image: INTRO_ASSETS.eyes },
  { id: "promise-word", at: 0.89, word: "PROMISE.", image: null },
  { id: "promise", at: 1.16, word: null, image: INTRO_ASSETS.promise },
  { id: "calm", at: 1.76, word: "CALM.", image: null },
  { id: "unbothered", at: 2.03, word: null, image: INTRO_ASSETS.unbothered },
  { id: "more", at: 2.66, word: "MORE.", image: null },
  { id: "discipline", at: 2.91, word: null, image: INTRO_ASSETS.discipline },
  { id: "focus-word", at: 3.5, word: "FOCUS.", image: null },
  { id: "focus", at: 3.75, word: null, image: INTRO_ASSETS.focus },
  { id: "fold", at: 4.35, word: "NEVER FOLD.", image: null },
  { id: "gotham", at: 4.68, word: null, image: INTRO_ASSETS.gotham },
] as const;

export const INTRO_DURATION = 5.72;

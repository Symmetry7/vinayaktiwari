import "@testing-library/jest-dom/vitest";

// jsdom lacks IntersectionObserver (used by motion's whileInView).
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
globalThis.IntersectionObserver ??= IO as unknown as typeof IntersectionObserver;

// jsdom lacks matchMedia; default to "no preference" (tests override per case).
if (!window.matchMedia) {
  window.matchMedia = (q: string) =>
    ({ matches: false, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as MediaQueryList;
}

import { render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";

const lanyardImported = vi.fn();
vi.mock("./Lanyard", () => {
  lanyardImported();
  return { default: () => <div data-testid="lanyard" /> };
});

// jsdom has no 2D canvas or font loading; the artwork itself is checked visually in the browser.
vi.mock("./cardTexture", () => ({
  buildBadgeImages: async () => ({ front: "data:front", back: "data:back", strap: "data:strap" }),
}));

import { BadgeSlot, canUseWebGL } from "./BadgeSlot";

const reducedMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduce && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));

afterEach(() => {
  vi.unstubAllGlobals();
  lanyardImported.mockClear();
});

it("reports no WebGL in an environment without it", () => {
  expect(canUseWebGL()).toBe(false);
});

it("shows the static badge when WebGL is unavailable", () => {
  reducedMotion(false);
  render(<BadgeSlot />);
  expect(screen.getByRole("img", { name: /Vinayak Tiwari badge/i })).toBeInTheDocument();
  expect(screen.queryByTestId("lanyard")).toBeNull();
});

it("keeps the badge still under reduced motion", () => {
  reducedMotion(true);
  render(<BadgeSlot webgl />);
  expect(screen.getByRole("img", { name: /Vinayak Tiwari badge/i })).toBeInTheDocument();
  expect(screen.queryByTestId("lanyard")).toBeNull();
});

it("loads the 3D lanyard when WebGL works and motion is allowed", async () => {
  reducedMotion(false);
  render(<BadgeSlot webgl />);
  expect(await screen.findByTestId("lanyard")).toBeInTheDocument();
});

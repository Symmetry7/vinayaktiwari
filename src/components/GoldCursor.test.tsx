import { render } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { GoldCursor } from "./GoldCursor";

const media = (fine: boolean, reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: (q.includes("pointer: fine") && fine) || (q.includes("prefers-reduced-motion") && reduce),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));

afterEach(() => vi.unstubAllGlobals());

it("renders on a fine pointer", () => {
  media(true, false);
  const { container } = render(<GoldCursor />);
  expect(container.querySelector("[data-gold-cursor]")).not.toBeNull();
});

it("is absent on touch screens", () => {
  media(false, false);
  const { container } = render(<GoldCursor />);
  expect(container.querySelector("[data-gold-cursor]")).toBeNull();
});

it("is absent under reduced motion", () => {
  media(true, true);
  const { container } = render(<GoldCursor />);
  expect(container.querySelector("[data-gold-cursor]")).toBeNull();
});

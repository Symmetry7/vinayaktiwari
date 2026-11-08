import { render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { RevealWords } from "./RevealWords";

const mockReducedMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduce && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  }));

afterEach(() => vi.unstubAllGlobals());

it("exposes the full sentence to screen readers", () => {
  mockReducedMotion(false);
  render(<RevealWords as="h2" text="Let's build it" />);
  expect(screen.getByRole("heading", { name: "Let's build it" })).toBeInTheDocument();
});

it("renders words without motion when reduced motion is on", () => {
  mockReducedMotion(true);
  const { container } = render(<RevealWords as="h2" text="Let's build it" />);
  expect(container.querySelector("h2")).not.toHaveClass("reveal");
  const words = container.querySelectorAll("[data-word]");
  expect(words).toHaveLength(3);
  for (const w of words) {
    const style = (w as HTMLElement).style;
    expect(style.opacity).not.toBe("0");
    expect(style.transform).toBe("");
  }
});

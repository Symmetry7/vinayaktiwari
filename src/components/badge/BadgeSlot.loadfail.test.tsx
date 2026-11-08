import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Simulates the three.js chunk failing to download (flaky network, stale deploy).
vi.mock("./Lanyard", () => {
  throw new Error("chunk load failed");
});
vi.mock("./cardTexture", () => ({
  buildBadgeImages: async () => ({ front: "data:front", back: "data:back", strap: "data:strap" }),
}));

import { BadgeSlot } from "./BadgeSlot";

it("falls back to the static badge when the 3D chunk fails to load", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  render(
    <main>
      <BadgeSlot webgl />
      <p>rest of page</p>
    </main>,
  );
  await new Promise((r) => setTimeout(r, 600));
  expect(screen.getByRole("img", { name: /Vinayak Tiwari badge/i })).toBeInTheDocument();
  expect(screen.getByText("rest of page")).toBeInTheDocument();
});

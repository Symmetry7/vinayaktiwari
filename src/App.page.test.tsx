import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { INTRO_SESSION_KEY } from "./intro/scenes";

it("shows Vinayak's landing page sections and supplied modern design artwork", () => {
  sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  const { container } = render(<App />);
  const sections = [...container.querySelectorAll("main > section")];
  expect(sections.map((section) => section.id)).toEqual(["top", "quote", "person", "work", "experience", "achievements", "faqs", "hire"]);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Meet Vinayak — Software Engineering, Full-stack, AI/i);
  expect(screen.getByRole("img", { name: /Vinayak portrait with red HELLO, MEET, and VINAYAK typography/i })).toHaveAttribute("src", "/images/vinayak-modern-design.png");
  expect(screen.getAllByRole("link", { name: /vinayaktiwari732@gmail.com/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /work i'm super/i })).toBeInTheDocument();
  for (const image of container.querySelectorAll(".site-shell img")) {
    expect(image.getAttribute("src")).toMatch(/^\/(reference|hero|images|menu|projects)\//);
    expect(image).toHaveAttribute("alt");
  }
});

it("links the four supplied work cards to distinct project stories", () => {
  sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  render(<App />);
  expect(screen.getByRole("link", { name: /Read about Weapon Detection/i })).toHaveAttribute("href", "/work/weapon-detection");
  expect(screen.getByRole("link", { name: /Read about InvestIQ/i })).toHaveAttribute("href", "/work/investiq");
  expect(screen.getByRole("link", { name: /Read about AlgoGym/i })).toHaveAttribute("href", "/work/algogym");
  expect(screen.getByRole("link", { name: /Read about SYMM-Type/i })).toHaveAttribute("href", "/work/symm-type");
});

it("opens navigation and keeps section links usable", () => {
  sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  const nav = screen.getByRole("navigation", { name: "Main navigation" });
  expect(nav).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "experience" })).toHaveAttribute("href", "#experience");
  expect(screen.getByRole("link", { name: "achievements" })).toHaveAttribute("href", "#achievements");
  expect(screen.queryByRole("link", { name: "b-roll" })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "playground" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "work" }));
  expect(nav).toHaveAttribute("aria-hidden", "true");
});

it("lets visitors enter and keep a first name", () => {
  sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  sessionStorage.removeItem("portfolio-visitor-first-name");
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "type your first name" }));
  const input = screen.getByRole("textbox", { name: "your first name" });
  fireEvent.change(input, { target: { value: "Alex Morgan" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(screen.getByRole("button", { name: "type your first name" })).toHaveTextContent("{{ Alex }}");
  expect(sessionStorage.getItem("portfolio-visitor-first-name")).toBe("Alex");
});

it("can skip and replay the cinematic intro", () => {
  sessionStorage.removeItem(INTRO_SESSION_KEY);
  render(<App />);
  expect(screen.getByRole("dialog", { name: "Cinematic introduction" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /skip intro/i }));
  expect(screen.queryByRole("dialog", { name: "Cinematic introduction" })).not.toBeInTheDocument();
  expect(sessionStorage.getItem(INTRO_SESSION_KEY)).toBe("1");
  fireEvent.click(screen.getByRole("button", { name: /replay intro/i }));
  expect(screen.getByRole("dialog", { name: "Cinematic introduction" })).toBeInTheDocument();
});

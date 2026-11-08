import { render, screen } from "@testing-library/react";
import App from "./App";
import { about, profile, tech } from "./content";

const setup = () => render(<App />);

it("has every section anchor", () => {
  const { container } = setup();
  for (const id of ["about", "work", "services", "stack", "achievements", "contact"]) {
    expect(container.querySelector(`#${id}`)).not.toBeNull();
  }
});

it("offers the resume at least twice, opening in a new tab", () => {
  setup();
  const links = screen.getAllByRole("link", { name: /resume/i });
  expect(links.length).toBeGreaterThanOrEqual(2);
  for (const a of links) {
    expect(a).toHaveAttribute("href", "/resume-vinayak-tiwari.pdf");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a.getAttribute("rel")).toMatch(/noopener/);
  }
});

it("start a project mails Vinayak", () => {
  setup();
  expect(screen.getAllByRole("link", { name: /start a project/i })[0]).toHaveAttribute("href", profile.startProjectHref);
});

it("has no dead links", () => {
  const { container } = setup();
  expect(container.querySelectorAll('a[href="#"], a:not([href])').length).toBe(0);
});

it("names him as an AI Engineer in the single h1", () => {
  setup();
  const h1s = screen.getAllByRole("heading", { level: 1 });
  expect(h1s).toHaveLength(1);
  expect(h1s[0]).toHaveTextContent("Vinayak Tiwari");
  expect(screen.getAllByText(/AI Engineer/i).length).toBeGreaterThan(0);
});

it("gives every image alt text", () => {
  const { container } = setup();
  for (const img of container.querySelectorAll("img")) expect(img.getAttribute("alt")?.trim()).toBeTruthy();
});

it("about terminals expose their full text", () => {
  setup();
  for (const t of Object.values(about)) expect(screen.getByText(t, { selector: ".sr-only" })).toBeInTheDocument();
});

it("lists every tech in the orbit by name", () => {
  setup();
  const list = screen.getByRole("list", { name: /tech stack/i });
  for (const t of tech) expect(list).toHaveTextContent(t.name);
});

it("links the featured ICPC certificate", () => {
  setup();
  expect(screen.getByRole("link", { name: /ICPC Asia Amritapuri Regionalist 2025/i })).toHaveAttribute("href", "/img/icpc-certificate.webp");
});

it("connect cards only show links that exist", () => {
  setup();
  expect(screen.getAllByRole("link", { name: /LinkedIn/i }).length).toBeGreaterThan(0);
  expect(screen.queryByRole("link", { name: /GitHub/i })).toBeNull();
});

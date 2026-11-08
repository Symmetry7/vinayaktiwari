import { allContent, profile, projects, roles, services, stack, visibleLinks } from "./content";

it("never says CTO", () => {
  expect(JSON.stringify(allContent)).not.toMatch(/\bCTO\b|Chief Technology/i);
});

it("has no phone number", () => {
  expect(JSON.stringify(allContent)).not.toMatch(/7489788301|\+91/);
});

it("leads with AI work", () => {
  expect(projects.map((p) => p.slug)).toEqual(["investiq", "truehuman", "algogym", "weapon-detection"]);
  expect(stack[0]).toBe("Azure OpenAI");
  expect(profile.role).toBe("AI Engineer");
});

it("every service proof points at a real project", () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const s of services) expect(slugs.has(s.proof)).toBe(true);
});

it("hides links without a URL", () => {
  const out = visibleLinks([
    { label: "GitHub", href: undefined },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vinayaktiwari9" },
  ]);
  expect(out).toEqual([{ label: "LinkedIn", href: "https://www.linkedin.com/in/vinayaktiwari9" }]);
});

it("start-project mails Vinayak", () => {
  expect(profile.startProjectHref).toBe("mailto:vinayaktiwari732@gmail.com?subject=Project%20inquiry");
});

it("lists InseLabs as an internship", () => {
  expect(roles.find((r) => /InseLabs/.test(r.org))?.title).toBe("Intern");
});

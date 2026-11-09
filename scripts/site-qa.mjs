import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const origin = process.env.SITE_QA_ORIGIN || "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const shots = path.join(os.tmpdir(), "portfolio-site-qa");
await mkdir(shots, { recursive: true });
const errors = [];
const names = ["weapon-detection", "investiq", "algogym", "symm-type"];

for (const [width, height] of [[1440, 900], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference" });
  await context.addInitScript(() => sessionStorage.setItem("cinematic-intro-seen-v1", "1"));
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(origin, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".work-card").count(), 4);
  assert.deepEqual(await page.locator(".work-card").evaluateAll(nodes => nodes.map(n => new URL(n.href).pathname)), names.map(n => `/work/${n}`));
  assert(await page.locator(".work-card img").evaluateAll(async nodes => (await Promise.all(nodes.map(async n => (await fetch(n.getAttribute("src"))).status))).every(status => status === 200)), "card art failed to load");
  await page.getByRole("button", { name: "Open menu" }).click();
  assert.equal(await page.locator(".nav-photo").getAttribute("src"), "/menu/mr-bean.jpg");
  assert.equal(await page.locator(".bat-flight").count(), width === 1440 ? 1 : 1);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(shots, `${width}-bat.png`) });
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(shots, `${width}-menu.png`) });
  await page.getByRole("button", { name: "Close menu" }).click();
  await page.locator(".person-cta").scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  assert(await page.locator(".person").evaluate(node => node.classList.contains("in")), "about text did not reveal");
  if (width === 1440) {
    await page.locator(".person-cta").hover();
    await page.waitForTimeout(240);
    assert(await page.locator(".roll-glyph-track").last().evaluate(node => getComputedStyle(node).transform !== "none"), "link letters did not roll");
    assert(await page.locator(".cursor-ball").evaluate(node => node.classList.contains("is-visible")), "cursor ball did not follow pointer");
  }
  await page.screenshot({ path: path.join(shots, `${width}-about.png`) });
  await page.evaluate(width => { const section = document.querySelector("#work"); scrollTo(0, section.offsetTop + (width > 809 ? innerHeight * 1.5 : 0)); }, width);
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(shots, `${width}-work.png`) });
  for (const slug of names) {
    await page.goto(`${origin}/work/${slug}`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".cinematic-intro").count(), 0);
    assert(await page.locator("h1").isVisible());
    const words = await page.locator(".project-story p").allTextContents().then(ps => ps.join(" ").split(/\s+/).length);
    assert(words >= 450 && words <= 600, `${slug} story has ${words} words`);
    assert(await page.locator(".project-hero-image img").evaluate(img => img.complete && img.naturalWidth > 0));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, `${slug} overflows at ${width}px`);
    if (slug === "investiq") await page.screenshot({ path: path.join(shots, `${width}-investiq.png`) });
  }
  await context.close();
}
const direct = await browser.newPage();
await direct.goto(`${origin}/work/weapon-detection`, { waitUntil: "networkidle" });
assert.equal(await direct.locator(".cinematic-intro").count(), 0, "a direct project visit should not run the homepage intro");
assert(await direct.getByRole("heading", { level: 1, name: /weapon detection/i }).isVisible());
await direct.close();
assert.deepEqual(errors, []);
console.log("site QA passed; screenshots:", shots);
await browser.close();

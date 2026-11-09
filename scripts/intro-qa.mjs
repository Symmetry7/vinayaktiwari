import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const origin = process.env.INTRO_QA_ORIGIN || "http://127.0.0.1:8080";
const chrome = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const shots = path.join(os.tmpdir(), "portfolio-intro-qa");
await mkdir(shots, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: chrome });
const errors = [];

async function waitTo(page, started, seconds) {
  await page.waitForTimeout(Math.max(0, seconds * 1000 - (Date.now() - started)));
}

async function inspect(width, height, fullRun) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(origin, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".cinematic-intro")?.dataset.startedAt);
  const started = Number(await page.locator(".cinematic-intro").getAttribute("data-started-at"));
  await page.evaluate(() => {
    const root = document.querySelector(".cinematic-intro");
    window.__introScenes = [root.dataset.scene];
    window.__shutterSamples = [];
    new MutationObserver(() => window.__introScenes.push(root.dataset.scene)).observe(root, { attributes: true, attributeFilter: ["data-scene"] });
    const timer = setInterval(() => {
      const elapsed = Date.now() - Number(root.dataset.startedAt);
      if (elapsed >= 5200 && elapsed <= 5570) window.__shutterSamples.push({ top: root.querySelector(".intro-close--top").getBoundingClientRect().bottom, bottom: root.querySelector(".intro-close--bottom").getBoundingClientRect().top });
      if (elapsed > 5570) clearInterval(timer);
    }, 16);
  });
  const samples = fullRun
    ? [[0.55, "eyes"], [1.42, "promise"], [2.32, "unbothered"], [3.16, "discipline"], [3.98, "focus"], [4.83, "gotham"]]
    : [[0.55, "eyes"], [2.32, "unbothered"], [3.98, "focus"], [4.83, "gotham"]];
  for (const [seconds, expected] of samples) {
    await waitTo(page, started, seconds);
    await page.screenshot({ path: path.join(shots, `${width}-${expected}.png`) });
  }

  const imageStatus = await page.evaluate(() => [...document.querySelectorAll("img[src^='/intro/'], img[src^='/images/']")].map((image) => ({ src: image.getAttribute("src"), loaded: image.complete && image.naturalWidth > 0 })));
  assert(imageStatus.every(({ loaded }) => loaded), "one or more intro images failed");
  await page.locator(".cinematic-intro").waitFor({ state: "detached", timeout: 3000 });
  const motion = await page.evaluate(() => ({ scenes: window.__introScenes, shutters: window.__shutterSamples }));
  assert.deepEqual(motion.scenes, ["watch", "eyes", "promise-word", "promise", "calm", "unbothered", "more", "discipline", "focus-word", "focus", "fold", "gotham", "closing"], "intro scene order changed");
  assert(motion.shutters.length >= 3, "closing shutter was not sampled");
  assert(motion.shutters.at(-1).top > motion.shutters[0].top && motion.shutters.at(-1).bottom < motion.shutters[0].bottom, "black panels must close toward center");
  await page.screenshot({ path: path.join(shots, `${width}-homepage.png`) });
  const state = await page.evaluate(() => ({ overflow: document.body.style.overflow, inert: document.querySelector(".site-shell").inert, horizontalOverflow: document.documentElement.scrollWidth - innerWidth, replay: !!document.querySelector(".replay-intro") }));
  assert.equal(state.inert, false);
  assert.notEqual(state.overflow, "hidden");
  assert.equal(state.horizontalOverflow, 0);
  assert.equal(state.replay, true);
  if (fullRun) {
    const assets = await page.evaluate(async () => {
      const sources = [...new Set([...document.images].map((image) => image.currentSrc || image.src))];
      return Promise.all(sources.map(async (src) => ({ src, status: (await fetch(src)).status })));
    });
    assert.deepEqual(assets.filter(({ status }) => status !== 200), [], "homepage image asset is missing");
  }

  await page.getByRole("button", { name: /type your first name/i }).click();
  await page.getByRole("textbox", { name: /your first name/i }).fill("Alex");
  await page.getByRole("textbox", { name: /your first name/i }).press("Enter");
  assert.match(await page.getByRole("button", { name: /type your first name/i }).innerText(), /Alex/);
  await page.getByRole("button", { name: "Open menu" }).click();
  assert.equal(await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded"), "true");
  await page.getByRole("button", { name: "Close menu" }).click();

  const skipTimes = fullRun ? [0.15, 1.42, 2.32, 3.16, 3.98, 4.9, 5.3] : [2.32, 5.3];
  for (const seconds of skipTimes) {
    await page.getByRole("button", { name: /replay intro/i }).click();
    await page.waitForFunction(() => document.querySelector(".cinematic-intro")?.dataset.startedAt);
    const replayStarted = Number(await page.locator(".cinematic-intro").getAttribute("data-started-at"));
    if (seconds === 0.15) {
      await page.getByRole("button", { name: /sound off/i }).click();
      assert.equal(await page.getByRole("button", { name: /sound on/i }).getAttribute("aria-pressed"), "true");
      await page.getByRole("button", { name: /sound on/i }).click();
    }
    await waitTo(page, replayStarted, seconds);
    await page.getByRole("button", { name: /skip intro/i }).click();
    await page.locator(".cinematic-intro").waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.querySelector(".site-shell").inert), false);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
  }
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator(".cinematic-intro").count(), 0, "intro unexpectedly replayed after reload");
  assert.match(await page.getByRole("button", { name: /type your first name/i }).innerText(), /Alex/, "first name did not persist in session");
  await context.close();
  return state;
}

console.log("desktop", JSON.stringify(await inspect(1440, 900, true)));
console.log("mobile", JSON.stringify(await inspect(390, 844, false)));
const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const reducedPage = await reduced.newPage();
await reducedPage.goto(origin, { waitUntil: "networkidle" });
assert.equal(await reducedPage.locator(".cinematic-intro").count(), 0, "reduced motion should bypass intro");
assert.equal(await reducedPage.locator("main").count(), 1);
await reduced.close();
assert.deepEqual(errors, []);
console.log("passed; screenshots:", shots);
await browser.close();

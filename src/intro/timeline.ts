import { gsap } from "gsap";
import { INTRO_DURATION, INTRO_SCENES } from "./scenes";

export function createIntroTimeline(root: HTMLElement, onClosing: () => void, onComplete: () => void) {
  const find = (selector: string) => {
    const element = root.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing intro element: ${selector}`);
    return element;
  };
  const scene = (id: string) => find(`.intro-scene--${id}`);
  const tl = gsap.timeline({ paused: true, onComplete });

  INTRO_SCENES.forEach(({ id, at }, index) => {
    tl.addLabel(id, at);
    if (index) tl.set(scene(INTRO_SCENES[index - 1].id), { autoAlpha: 0 }, at);
    tl.set(scene(id), { autoAlpha: 1 }, at);
    tl.set(root, { attr: { "data-scene": id } }, at);
  });

  // Every word names the idea in the image that follows it.
  tl.fromTo(find(".intro-word--watch"), { yPercent: 105 }, { yPercent: 0, duration: 0.18, ease: "power4.out" }, 0);
  tl.fromTo(scene("eyes"), { clipPath: "inset(48% 0 48%)" }, { clipPath: "inset(0% 0 0%)", duration: 0.24, ease: "power4.inOut" }, 0.27);
  tl.fromTo(find(".intro-image--eyes"), { scale: 1.035 }, { scale: 1, duration: 0.58, ease: "none" }, 0.27);

  tl.fromTo(find(".intro-word--promise-word"), { xPercent: -105 }, { xPercent: 0, duration: 0.19, ease: "power4.out" }, 0.89);
  tl.fromTo(scene("promise"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.21, ease: "power4.inOut" }, 1.16);
  tl.fromTo(find(".intro-image--promise"), { scale: 1 }, { scale: 1.025, duration: 0.58, ease: "none" }, 1.16);

  tl.fromTo(find(".intro-word--calm"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.19, ease: "power4.out" }, 1.76);
  tl.fromTo(find(".intro-image--unbothered"), { xPercent: -1.2, scale: 1.02 }, { xPercent: 1.2, scale: 1.02, duration: 0.62, ease: "none" }, 2.03);
  tl.fromTo(find(".intro-caption--unbothered"), { yPercent: 115 }, { yPercent: 0, duration: 0.2, ease: "power4.out" }, 2.15);

  tl.fromTo(find(".intro-word--more"), { yPercent: -105 }, { yPercent: 0, duration: 0.17, ease: "power4.out" }, 2.66);
  tl.fromTo(scene("discipline"), { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.21, ease: "power4.inOut" }, 2.91);
  tl.fromTo(find(".intro-image--discipline"), { xPercent: 1 }, { xPercent: -1, duration: 0.58, ease: "none" }, 2.91);

  tl.fromTo(find(".intro-word--focus-word"), { xPercent: 105 }, { xPercent: 0, duration: 0.17, ease: "power4.out" }, 3.5);
  tl.fromTo(scene("focus"), { clipPath: "inset(35% 0 35%)" }, { clipPath: "inset(0% 0 0%)", duration: 0.15, ease: "power4.out" }, 3.75);
  tl.fromTo(find(".intro-image--focus"), { scale: 1.025 }, { scale: 1, duration: 0.22, ease: "power3.out" }, 3.75);

  tl.fromTo(find(".intro-word--fold"), { scale: 0.93, yPercent: 22 }, { scale: 1, yPercent: 0, duration: 0.22, ease: "power4.out" }, 4.35);
  tl.fromTo(scene("gotham"), { clipPath: "inset(47% 0 47%)" }, { clipPath: "inset(0% 0 0%)", duration: 0.16, ease: "power4.out" }, 4.68);
  tl.fromTo(find(".intro-image--gotham"), { scale: 1.025 }, { scale: 1, duration: 0.45, ease: "none" }, 4.68);
  tl.fromTo(find(".intro-gotham-rgb"), { autoAlpha: 0, x: -4 }, { autoAlpha: 0.2, x: 4, duration: 0.03, ease: "none" }, 4.92);
  tl.to(find(".intro-gotham-rgb"), { autoAlpha: 0, x: 0, duration: 0.045, ease: "none" }, 4.955);

  // Two black panels travel from the screen edges and meet exactly at center.
  tl.addLabel("closing", 5.17);
  tl.call(onClosing, [], 5.17);
  tl.set(root, { attr: { "data-scene": "closing" } }, 5.17);
  tl.fromTo(find(".intro-close--top"), { yPercent: 0 }, { yPercent: 100, duration: 0.39, ease: "power3.inOut" }, 5.17);
  tl.fromTo(find(".intro-close--bottom"), { yPercent: 0 }, { yPercent: -100, duration: 0.39, ease: "power3.inOut" }, 5.17);
  tl.to(root, { autoAlpha: 0, duration: 0.13, ease: "none" }, 5.59);
  tl.set(root, {}, INTRO_DURATION);
  return tl;
}

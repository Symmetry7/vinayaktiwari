import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const finePointer = "(hover: hover) and (pointer: fine)";
const useFinePointer = () =>
  useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(finePointer);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(finePointer).matches,
    () => false,
  );

// Gold "jelly" ring that trails the native cursor: it stretches along its velocity and
// swells over links/buttons. Decorative only; mouse users only; off under reduced motion.
export function GoldCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const on = fine && !reduce;

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hover = 1;
    let hoverTarget = 1;
    let raf = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      hoverTarget = (e.target as Element)?.closest?.("a, button, [data-cursor-grow]") ? 2.2 : 1;
    };
    const leave = () => {
      target.x = target.y = -100;
    };
    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.2;
      pos.y += dy * 0.2;
      hover += (hoverTarget - hover) * 0.18;
      const speed = Math.min(Math.hypot(dx, dy) / 60, 0.6);
      const angle = Math.atan2(dy, dx);
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angle}rad) scale(${(1 + speed) * hover}, ${(1 - speed * 0.6) * hover})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [on]);

  if (!on) return null;
  return <div ref={ref} data-gold-cursor aria-hidden="true" className="gold-cursor" />;
}

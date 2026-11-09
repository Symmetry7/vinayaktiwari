import { useEffect, useRef } from "react";

export default function CursorBall() {
  const dotRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;
    document.body.classList.add("has-custom-cursor");
    let targetX = -100, targetY = -100, x = -100, y = -100, frame = 0;
    const animate = () => {
      x += (targetX - x) * .38;
      y += (targetY - y) * .38;
      dot.style.transform = `translate3d(${x - 7}px, ${y - 7}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .3) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX; targetY = event.clientY;
      dot.classList.add("is-visible");
      dot.classList.toggle("is-active", !!(event.target as Element)?.closest?.("a,button"));
      dot.classList.toggle("is-card", !!(event.target as Element)?.closest?.(".work-card"));
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const leave = () => dot.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { document.body.classList.remove("has-custom-cursor"); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <span className="cursor-ball" ref={dotRef} aria-hidden="true" />;
}

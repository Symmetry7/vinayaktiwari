import { useEffect, useRef } from "react";

export default function CursorBall() {
  const ballRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const ball = ballRef.current;
    const dot = dotRef.current;
    if (!ball || !dot) return;

    document.body.classList.add("has-custom-cursor");
    let previousX = 0;
    let previousY = 0;
    let previousTime = 0;
    let settleTimer = 0;

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;
      const elapsed = Math.max(8, now - previousTime);
      const speed = previousTime ? Math.hypot(dx, dy) / elapsed : 0;
      const stretch = Math.min(0.6, speed * 0.13);

      // Follow the pointer exactly. Only the small dot stretches and settles.
      ball.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      ball.classList.add("is-visible");
      ball.classList.toggle("is-card", !!(event.target as Element)?.closest?.(".work-card"));
      if (stretch > 0.025) {
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        dot.style.transform = `rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.48})`;
      }
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => { dot.style.transform = "none"; }, 45);
      previousX = event.clientX;
      previousY = event.clientY;
      previousTime = now;
    };
    const hide = () => ball.classList.remove("is-visible");
    const leaveWindow = (event: MouseEvent) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseout", leaveWindow);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseout", leaveWindow);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return <span className="cursor-ball" ref={ballRef} aria-hidden="true"><span className="cursor-ball__dot" ref={dotRef} /><span className="cursor-ball__label">open ↗</span></span>;
}

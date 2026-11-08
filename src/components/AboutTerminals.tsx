import { useEffect, useRef, useState } from "react";
import { about } from "@/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Section } from "./Section";

const commands = [
  ["whoami", about.whoami],
  ["whatido", about.whatido],
  ["beyondcode", about.beyondcode],
] as const;

// Types the answer once the card scrolls into view; screen readers get the full text immediately.
function Terminal({ cmd, text, delay }: { cmd: string; text: string; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now() + delay;
      const step = () => {
        const chars = Math.max(0, Math.floor((performance.now() - start) / 14));
        setN(Math.min(chars, text.length));
        if (chars < text.length) timer = requestAnimationFrame(step);
      };
      timer = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(timer);
    };
  }, [reduce, text, delay]);

  const shown = reduce ? text : text.slice(0, n);
  return (
    <div ref={ref} className="crosshair relative flex min-h-64 flex-col border border-line bg-raised/40 p-6">
      <p className="font-mono text-sm text-gold">
        <span className="text-faint">$ </span>
        {cmd}
      </p>
      <span className="sr-only">{text}</span>
      <p aria-hidden="true" className="mt-4 text-[0.95rem] leading-relaxed text-ink/90">
        {shown}
        {!reduce && n < text.length && <span className="caret" />}
      </p>
    </div>
  );
}

export function AboutTerminals() {
  return (
    <Section id="about" title="A little about me" center>
      <div className="grid gap-4 md:grid-cols-3">
        {commands.map(([cmd, text], i) => (
          <Terminal key={cmd} cmd={cmd} text={text} delay={i * 350} />
        ))}
      </div>
    </Section>
  );
}

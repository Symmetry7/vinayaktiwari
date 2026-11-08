import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Tag = "h1" | "h2" | "p";

// Headings assemble word by word on first scroll into view (marketing, seen once per visit).
// CSS transitions do the motion (see .reveal in index.css); the observer only flips data-shown.
// Screen readers get the sentence once; the animated words are aria-hidden.
export function RevealWords({ text, as = "h2", className = "", id }: { text: string; as?: Tag; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const Tag = as;
  return (
    <Tag ref={ref} id={id} className={reduce ? className : `reveal ${className}`} data-shown={shown || undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} data-word className="inline-block" style={reduce ? undefined : ({ "--i": i } as CSSProperties)}>
            {w}&nbsp;
          </span>
        ))}
      </span>
    </Tag>
  );
}

import type { CSSProperties } from "react";

export default function RollText({ text }: { text: string }) {
  return <span className="roll-text">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" className="roll-text-visual">{[...text].map((char, i) => char === " "
      ? <span className="roll-space" key={i}>&nbsp;</span>
      : <span className="roll-glyph" key={i} style={{ "--letter-i": i } as CSSProperties}><span className="roll-glyph-track"><span>{char}</span><span>{char}</span></span></span>)}</span>
  </span>;
}

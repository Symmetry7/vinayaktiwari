import type { CSSProperties } from "react";
import { tech } from "@/content";
import { BrandIcon } from "./BrandIcon";

// Three tilted rings orbit the title (CSS 3D). Each chip counter-rotates so it always faces the viewer.
// Reduced motion: rings hold still (see .orbit-ring in index.css).
const radii = [0.2, 0.32, 0.45]; // fraction of stage width
const speeds = [38, 56, 80];

export function TechOrbit() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative overflow-hidden py-16 sm:py-20">
      <div className="orbit-stage relative mx-auto aspect-[16/10] w-full max-w-[min(56rem,100vw)]">
        <h2 id="stack-title" className="orbit-title absolute inset-0 z-10 flex items-center justify-center text-center text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-none tracking-tightest">
          Tech Stack
        </h2>
        <ul aria-label="Tech stack" className="absolute inset-0">
          {[0, 1, 2].map((ring) => {
            const items = tech.filter((t) => t.ring === ring);
            return (
              <li key={ring} className="orbit-ring" style={{ "--rf": radii[ring], "--dur": `${speeds[ring]}s`, "--dir": ring % 2 ? "reverse" : "normal" } as CSSProperties}>
                <ul>
                  {items.map((t, i) => (
                    <li key={t.name} className="orbit-slot" style={{ "--angle": `${(360 / items.length) * i}deg` } as CSSProperties}>
                      <span className="orbit-chip" data-cursor-grow>
                        {t.icon ? <BrandIcon name={t.icon} className="size-5 sm:size-6" /> : <span className="font-mono text-[0.65rem] font-medium sm:text-xs">{t.name}</span>}
                        <span className={t.icon ? "sr-only" : "hidden"}>{t.name}</span>
                        {t.icon && <span className="orbit-tip" aria-hidden="true">{t.name}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

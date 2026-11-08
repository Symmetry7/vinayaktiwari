import type { ReactNode } from "react";
import { RevealWords } from "./RevealWords";

export function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page py-24 sm:py-32">
      <RevealWords as="h2" id={`${id}-title`} className="section-title max-w-3xl" text={title} />
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
      <div className="mt-14">{children}</div>
    </section>
  );
}

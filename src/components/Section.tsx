import type { ReactNode } from "react";
import { RevealWords } from "./RevealWords";

export function Section({
  id,
  title,
  intro,
  children,
  center,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page py-24 sm:py-32">
      <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        <RevealWords as="h2" id={`${id}-title`} className="section-title" text={title} />
        {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
      </div>
      <div className="mt-14">{children}</div>
    </section>
  );
}

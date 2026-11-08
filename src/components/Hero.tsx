import type { ReactNode } from "react";
import { profile } from "@/content";
import { DotField } from "./DotField";
import { Icon } from "./Icon";
import { ResumeLink } from "./ResumeLink";

export function Hero({ badge }: { badge: ReactNode }) {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <DotField />
      <div className="page relative grid min-h-[calc(100svh-4rem-3.5rem)] items-center gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(3rem,9vw,6rem)] font-semibold leading-[0.95] tracking-tightest">{profile.name}</h1>
          <p className="mt-6 max-w-xl text-xl text-ink/90 sm:text-2xl">{profile.tagline}</p>
          <p className="mt-4 max-w-xl text-sm text-muted">{profile.oneLiner}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
            Available for freelance projects &amp; internships
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.startProjectHref} className="btn-solid">Start a project <Icon name="arrowUpRight" /></a>
            <a href="#work" className="btn-line">View my work <Icon name="arrowDown" /></a>
            <ResumeLink />
          </div>
        </div>
        <div className="relative h-[420px] lg:col-span-5 lg:h-[620px]">{badge}</div>
      </div>
    </section>
  );
}

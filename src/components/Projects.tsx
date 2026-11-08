import { projects } from "@/content";
import { BrandIcon } from "./BrandIcon";
import { Icon } from "./Icon";
import { Section } from "./Section";

// Bento: first and fourth cards run wide. A card without a gallery image gets a typographic cover.
export function Projects() {
  return (
    <Section id="work" title="AI systems I've built" intro="Retrieval, LLM pipelines and the full-stack products around them." center>
      <ul className="grid gap-4 md:grid-cols-5">
        {projects.map((p, i) => {
          const wide = i % 3 === 0;
          return (
            <li
              key={p.slug}
              id={p.slug}
              className={`card group flex flex-col overflow-hidden ${wide ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ground">
                {p.image ? (
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex size-full flex-col justify-end p-6" style={{ backgroundImage: "radial-gradient(rgb(var(--ink) / 0.14) 1px, transparent 1.4px)", backgroundSize: "12px 12px" }}>
                    <h3 className="text-4xl font-semibold tracking-tightest text-ink/90 sm:text-5xl">{p.name}</h3>
                    <p className="data mt-2">{p.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  {p.image ? <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3> : <span />}
                  <p className="data shrink-0 pt-1">{p.note ?? p.dates}</p>
                </div>
                <p className="mt-3 text-ink/90">{p.hook}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {p.points.map((pt) => (
                    <li key={pt} className="max-w-[65ch]">{pt}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                  <ul className="flex flex-wrap gap-2" aria-label={`${p.name} stack`}>
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{s}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${p.name} live site`}>
                        <Icon name="arrowUpRight" />
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${p.name} source on GitHub`}>
                        <BrandIcon name="siGithub" className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

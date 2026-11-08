import { projects } from "@/content";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="work" title="AI systems I've built" intro="Retrieval, LLM pipelines and the full-stack products around them.">
      <ol className="border-t border-line">
        {projects.map((p) => (
          <li key={p.slug} className="grid gap-6 border-b border-line py-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h3 className="text-3xl font-semibold tracking-tight">{p.name}</h3>
              <p className="data mt-2">{p.note ?? p.dates}</p>
              <p className="mt-4 text-lg text-ink/90">{p.hook}</p>
              {(p.live || p.repo) && (
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                      Live site <Icon name="arrowUpRight" />
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                      Source <Icon name="arrowUpRight" />
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="md:col-span-7">
              <ul className="space-y-3 text-muted">
                {p.points.map((pt) => (
                  <li key={pt} className="max-w-[65ch]">{pt}</li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${p.name} stack`}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{s}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

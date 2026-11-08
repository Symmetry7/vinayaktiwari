import { profile, projects, services } from "@/content";
import { Icon } from "./Icon";
import { Section } from "./Section";

const nameOf = (slug: string) => projects.find((p) => p.slug === slug)?.name;

export function Services() {
  return (
    <Section id="services" title="What I can build for you" intro="Have a product idea that needs AI in it? These are things I've already shipped." center>
      <ol className="card divide-y divide-line">
        {services.map((s) => (
          <li key={s.title} className="grid gap-3 p-6 sm:p-8 md:grid-cols-12 md:gap-8">
            <h3 className="text-xl font-semibold tracking-tight md:col-span-5">{s.title}</h3>
            <div className="md:col-span-7">
              <p className="text-muted">{s.body}</p>
              <a href={`#${s.proof}`} className="data mt-4 inline-block py-1 transition-colors hover:text-gold">
                Built before: {nameOf(s.proof)} →
              </a>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex justify-center">
        <a href={profile.startProjectHref} className="btn-solid">
          Start a project <Icon name="arrowUpRight" />
        </a>
      </div>
    </Section>
  );
}

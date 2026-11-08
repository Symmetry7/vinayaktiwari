import { profile, projects, services } from "@/content";
import { Icon } from "./Icon";
import { Section } from "./Section";

const nameOf = (slug: string) => projects.find((p) => p.slug === slug)?.name;

export function Services() {
  return (
    <Section id="services" title="What I can build for you" intro="Have a product idea that needs AI in it? These are things I've already shipped.">
      <ul className="grid border-l border-t border-line sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.title} className="border-b border-r border-line p-8">
            <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-muted">{s.body}</p>
            <p className="data mt-6">Built before: {nameOf(s.proof)}</p>
          </li>
        ))}
      </ul>
      <a href={profile.startProjectHref} className="btn-solid mt-10">
        Start a project <Icon name="arrowUpRight" />
      </a>
    </Section>
  );
}

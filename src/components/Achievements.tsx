import { achievements } from "@/content";
import { Section } from "./Section";

export function Achievements() {
  const featured = achievements.find((a) => a.featured);
  const rest = achievements.filter((a) => !a.featured);
  return (
    <Section id="achievements" title="Competitive programming" intro="The fundamentals behind the AI work.">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {featured?.href && (
            <a href={featured.href} target="_blank" rel="noopener noreferrer" className="group block">
              <img
                src={featured.image}
                alt={`${featured.title} certificate`}
                width={1600}
                height={1131}
                loading="lazy"
                className="w-full rounded-2xl border border-line transition-opacity group-hover:opacity-90"
              />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{featured.title}</h3>
              <p className="mt-1 text-muted">
                {featured.detail} <span className="underline">View certificate</span>
              </p>
            </a>
          )}
          <ul className="mt-10 border-t border-line">
            {rest.map((a) => (
              <li key={a.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                <span className="font-medium">{a.title}</span>
                <span className="data">{a.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="lg:col-span-5">
          <img
            src="/img/achievement-stage.webp"
            alt="Vinayak with fellow winners holding certificates on stage at KIIT"
            width={800}
            height={1268}
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
          <figcaption className="data mt-3">Contest win, KIIT — October</figcaption>
        </figure>
      </div>
    </Section>
  );
}

import { roles } from "@/content";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="border-t border-line">
        {roles.map((r) => (
          <li key={r.org} className="grid gap-2 border-b border-line py-8 md:grid-cols-12 md:gap-4">
            <p className="data md:col-span-3 md:pt-1.5">{r.dates}</p>
            <div className="md:col-span-9">
              <h3 className="text-xl font-semibold tracking-tight">
                {r.title} <span className="text-muted">· {r.org}</span>
              </h3>
              {r.points.length > 0 && (
                <ul className="mt-3 space-y-2 text-muted">
                  {r.points.map((pt) => (
                    <li key={pt} className="max-w-[65ch]">{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

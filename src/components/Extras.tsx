import { extras, type Extra } from "@/content";
import { Section } from "./Section";

function Body({ x }: { x: Extra }) {
  return (
    <>
      {x.image && (
        <div className="overflow-hidden border-b border-line">
          <img
            src={x.image}
            alt={x.alt ?? x.title}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${x.wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold tracking-tight transition-colors group-hover:text-gold">{x.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{x.detail}</p>
      </div>
    </>
  );
}

// Roles, wins and photos as one bento. New gallery photos: add to `extras` in content.ts.
export function Extras() {
  return (
    <Section id="achievements" title="Some extra stuff" intro="Roles, contests and moments outside the code." center>
      <ul className="grid auto-rows-auto grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extras.map((x) => (
          <li key={x.title} className={`${x.wide ? "sm:col-span-2" : ""} ${x.image && !x.wide ? "lg:row-span-2" : ""}`}>
            {x.href ? (
              <a href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.title} className="card group block h-full overflow-hidden">
                <Body x={x} />
              </a>
            ) : (
              <div className="card group h-full overflow-hidden">
                <Body x={x} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

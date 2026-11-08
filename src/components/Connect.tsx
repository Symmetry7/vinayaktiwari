import { profile, socials, visibleLinks, type SocialLink } from "@/content";
import { BrandIcon } from "./BrandIcon";
import { Icon } from "./Icon";
import { ResumeLink } from "./ResumeLink";
import { RevealWords } from "./RevealWords";

function Card({ s, hidden }: { s: SocialLink & { href: string }; hidden?: boolean }) {
  const external = s.href.startsWith("http");
  return (
    <a
      href={s.href}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card group flex w-72 shrink-0 gap-4 p-5 transition-colors hover:border-gold/60"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-ink transition-colors group-hover:text-gold">
        <BrandIcon name={s.icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{s.label}</span>
        {s.handle && <span className="data block truncate normal-case">{s.handle}</span>}
        {s.blurb && <span className="mt-2 block text-sm text-muted">{s.blurb}</span>}
      </span>
    </a>
  );
}

// Two rows drifting in opposite directions; repeated so a short list still fills the track.
function Row({ items, reverse, decorative }: { items: (SocialLink & { href: string })[]; reverse?: boolean; decorative?: boolean }) {
  const reps = Math.max(2, Math.ceil(8 / Math.max(items.length, 1)));
  const loop = Array.from({ length: reps }, () => items).flat();
  return (
    <div className="connect-row overflow-hidden" data-reverse={reverse || undefined}>
      <div className="connect-track flex w-max gap-4 pr-4">
        {[...loop, ...loop].map((s, i) => (
          <Card key={i} s={s} hidden={decorative || i >= items.length} />
        ))}
      </div>
    </div>
  );
}

export function Connect() {
  const links = visibleLinks(socials);
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-28 sm:py-36">
      <div className="page text-center">
        <RevealWords as="h2" id="contact-title" className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-tightest" text="Have an AI idea? Let’s build it." />
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Tell me what you want to make. Hiring? My resume is one click away.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={profile.startProjectHref} className="btn-solid">
            Start a project <Icon name="arrowUpRight" />
          </a>
          <ResumeLink />
        </div>
      </div>
      <div className="mt-20 space-y-4" aria-label="Connect with me" role="region">
        <Row items={links} />
        <Row items={[...links].reverse()} reverse decorative />
      </div>
    </section>
  );
}

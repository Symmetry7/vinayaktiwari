import { profile, socials, visibleLinks } from "@/content";
import { Icon } from "./Icon";
import { ResumeLink } from "./ResumeLink";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page border-t border-line py-28 sm:py-40">
      <h2 id="contact-title" className="max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-tightest">
        Have an AI idea? Let's build it.
      </h2>
      <p className="mt-6 max-w-xl text-lg text-muted">Tell me what you want to make. Hiring? My resume is one click away.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={profile.startProjectHref} className="btn-solid">
          Start a project <Icon name="arrowUpRight" />
        </a>
        <ResumeLink />
      </div>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        {visibleLinks(socials).map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              className="text-muted underline decoration-line transition-colors hover:text-ink hover:decoration-ink"
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {s.label === "Email" ? profile.email : s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

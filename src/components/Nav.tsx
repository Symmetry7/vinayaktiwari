import { profile } from "@/content";
import { ResumeLink } from "./ResumeLink";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Experience", "#experience"],
  ["Achievements", "#achievements"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line/60 bg-ground/80 backdrop-blur-md">
      <nav className="page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="text-sm font-semibold tracking-tight">{profile.name}</a>
        <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <li key={href}><a href={href} className="transition-colors hover:text-ink">{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ResumeLink className="btn-line hidden h-9 px-4 sm:inline-flex" />
          <a href="#contact" className="btn-solid h-9 px-4">Hire me</a>
        </div>
      </nav>
    </header>
  );
}

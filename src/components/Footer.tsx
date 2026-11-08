import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="page flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-sm text-faint">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>Built with React &amp; three.js · Lanyard from React Bits</p>
    </footer>
  );
}

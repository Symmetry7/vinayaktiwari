import { profile } from "@/content";

export function About() {
  return (
    <section aria-label="About" className="page grid items-center gap-10 py-24 sm:py-32 md:grid-cols-12">
      <img
        src="/img/about.webp"
        alt="Vinayak Tiwari seated beside a glowing moon sculpture"
        width={900}
        height={1200}
        loading="lazy"
        className="w-full rounded-2xl object-cover md:col-span-5"
      />
      <p className="text-2xl leading-snug tracking-tight text-ink/90 sm:text-3xl md:col-span-7 md:pl-8">{profile.about}</p>
    </section>
  );
}

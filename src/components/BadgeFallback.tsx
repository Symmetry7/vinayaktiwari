import { profile } from "@/content";

// Static badge used before/without WebGL and under reduced motion.
export function BadgeFallback() {
  return (
    <div className="flex h-full flex-col items-center pt-0">
      <div className="h-24 w-5 border-x border-line bg-raised" aria-hidden="true" />
      <figure className="w-56 rounded-2xl border border-line bg-raised p-3 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)] sm:w-64">
        <img src="/img/portrait-badge.webp" alt={`${profile.name} badge`} width={540} height={720} className="aspect-[3/4] w-full rounded-xl object-cover" />
        <figcaption className="px-1 pb-1 pt-3">
          <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="data mt-1">{profile.role}</p>
          <p className="data">LLM · RAG · Agents</p>
        </figcaption>
      </figure>
    </div>
  );
}

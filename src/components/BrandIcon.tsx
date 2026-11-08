import {
  siCodechef,
  siCodeforces,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGmail,
  siGooglegemini,
  siKubernetes,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siOpencv,
  siPostgresql,
  siPydantic,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

// Named imports only, so the bundle carries just these paths.
const icons: Record<string, { path: string }> = {
  siCodechef, siCodeforces, siCplusplus, siDocker, siFastapi, siGit, siGithub, siGmail, siGooglegemini,
  siKubernetes, siLangchain, siMongodb, siNextdotjs, siOpencv, siPostgresql, siPydantic, siPython,
  siReact, siSupabase, siTailwindcss, siTypescript,
};

// LinkedIn is not in Simple Icons (trademark); authored geometric mark.
const linkedin = "M4 9h4v11H4zM6 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM10 9h3.8v1.6c.6-1 1.9-1.9 3.8-1.9 3.6 0 4.4 2.3 4.4 5.4V20h-4v-5.3c0-1.4 0-3-1.9-3s-2.1 1.4-2.1 2.9V20h-4z";

export function BrandIcon({ name, className = "size-5" }: { name?: string; className?: string }) {
  const path = name === "linkedin" ? linkedin : name ? icons[name]?.path : undefined;
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

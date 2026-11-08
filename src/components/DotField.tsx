// Halftone dot field behind the hero (pinned by the template look). Pure CSS, decorative.
export function DotField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: "radial-gradient(rgb(var(--ink) / 0.22) 1px, transparent 1.4px)",
        backgroundSize: "14px 14px",
        maskImage: "radial-gradient(ellipse 70% 60% at 70% 40%, black 10%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 40%, black 10%, transparent 75%)",
      }}
    />
  );
}

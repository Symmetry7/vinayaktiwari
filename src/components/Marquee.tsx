import { stack } from "@/content";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {stack.map((s) => (
        <li key={s} className="whitespace-nowrap font-mono text-sm text-muted">{s}</li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line py-4" aria-label="Tech stack" role="region">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

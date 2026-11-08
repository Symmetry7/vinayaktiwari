import { profile } from "@/content";
import { Icon } from "./Icon";

export function ResumeLink({ className = "btn-line" }: { className?: string }) {
  return (
    <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className={className}>
      <Icon name="file" />
      Resume
    </a>
  );
}

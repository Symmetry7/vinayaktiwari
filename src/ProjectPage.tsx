import { useEffect } from "react";
import { projectPages, type ProjectPageData } from "./projectPages";
import CursorBall from "./CursorBall";

export default function ProjectPage({ project }: { project: ProjectPageData }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${project.title} — Vinayak Tiwari`;
    return () => { document.title = previous; };
  }, [project.title]);
  const index = projectPages.findIndex((item) => item.slug === project.slug);
  const next = projectPages[(index + 1) % projectPages.length];
  return <div className="project-page"><CursorBall />
    <header className="project-header">
      <a className="project-logo" href="/" aria-label="Vinayak, back to homepage">Vinayak<span>.</span></a>
      <a className="project-back" href="/#work">[ back to work ↗ ]</a>
    </header>
    <main id="project-main">
      <div className="project-heading section-wrap">
        <p className="project-eyebrow">{project.eyebrow} <span>VINAYAK TIWARI / SELECTED WORK</span></p>
        <h1>{project.title}<span aria-hidden="true">.</span></h1>
        <p className="project-summary">{project.summary}</p>
      </div>
      <figure className="project-hero-image"><img src={project.image} alt={project.imageAlt} width="736" height="414" fetchPriority="high" /></figure>
      <div className="project-body section-wrap">
        <aside className="project-meta"><span>THE BUILD</span><ul>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>{project.repo && <a href={project.repo} target="_blank" rel="noreferrer">view source ↗</a>}</aside>
        <article className="project-story"><h2>Behind the work<span>.</span></h2>{project.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</article>
      </div>
      <a className="project-next" href={`/work/${next.slug}`}><span>NEXT PROJECT / 0{(index + 1) % projectPages.length + 1}</span><strong>{next.title} ↗</strong></a>
    </main>
    <footer className="project-footer"><span>VINAYAK TIWARI © 2026</span><a href="/">BACK HOME ↑</a></footer>
  </div>;
}

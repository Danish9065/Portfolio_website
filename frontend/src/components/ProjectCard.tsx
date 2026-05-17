import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../types/api";

export function ProjectCard({ project, highlighted = false }: { project: Project; highlighted?: boolean }) {
  return (
    <article className={`panel grid overflow-hidden rounded-lg transition ${highlighted ? "border-accent/45 shadow-glow" : ""}`}>
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="aspect-[16/9] bg-gradient-to-br from-panel2 via-panel to-accent/20">
          {project.image_url ? <img src={project.image_url} alt={`${project.title} screenshot`} className="h-full w-full object-cover" /> : null}
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{project.category}</p>
        {highlighted ? <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Audience match</p> : null}
        <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 min-h-16 text-sm leading-6 text-muted">{project.short_description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 5).map((item) => <span key={item} className="rounded-md bg-white/6 px-2 py-1 text-xs text-mist">{item}</span>)}
        </div>
        <div className="mt-5 flex gap-3 text-sm">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-accent">Case study <ArrowUpRight className="h-4 w-4" /></Link>
          {project.github_url ? <a href={project.github_url} className="inline-flex items-center gap-1 text-muted hover:text-white"><Github className="h-4 w-4" /> GitHub</a> : null}
        </div>
      </div>
    </article>
  );
}

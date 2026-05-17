import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { getProjects } from "../api/portfolio";
import { EmptyState } from "../components/EmptyState";
import { ProjectCard } from "../components/ProjectCard";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return data.filter((project) => [project.title, project.category, project.short_description, ...project.tech_stack].join(" ").toLowerCase().includes(term));
  }, [data, query]);
  return (
    <RevealSection className="container-shell py-14">
      <SectionHeader eyebrow="Projects" title="Case-study oriented work" body="Search by stack, domain, type, or keyword." />
      <label className="mb-8 flex max-w-xl items-center gap-3 rounded-md border border-line bg-panel px-4 py-3">
        <Search className="h-5 w-5 text-muted" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      {filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <EmptyState title="No matching projects" body="Try a broader stack, category, or keyword." />}
    </RevealSection>
  );
}

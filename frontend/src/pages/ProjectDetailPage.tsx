import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/portfolio";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { RevealSection } from "../components/RevealSection";
import { Seo } from "../components/Seo";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { data, isLoading, error } = useQuery({ queryKey: ["project", slug], queryFn: () => getProjectBySlug(slug), enabled: Boolean(slug) });
  if (isLoading) return <RevealSection className="container-shell py-14"><LoadingSpinner /></RevealSection>;
  if (error || !data) return <RevealSection className="container-shell py-14"><ErrorMessage message="Project not found." /></RevealSection>;
  return (
    <RevealSection className="container-shell py-14">
      <Seo title={`${data.title} — Danish MD`} description={data.short_description} image={data.image_url} path={`/projects/${data.slug}`} type="article" />
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-accent"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="aspect-[16/10] rounded-lg border border-line bg-panel">{data.image_url ? <img src={data.image_url} alt={`${data.title} screenshot`} width="1200" height="750" decoding="async" className="h-full w-full rounded-lg object-cover" /> : null}</div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{data.category}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{data.title}</h1>
          <p className="mt-5 leading-8 text-muted">{data.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{data.tech_stack.map((item) => <span key={item} className="rounded-md bg-white/6 px-3 py-2 text-sm">{item}</span>)}</div>
          <div className="mt-8 flex gap-4 text-sm">
            {data.live_url ? <a href={data.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-accent"><ExternalLink className="h-4 w-4" /> View live project</a> : null}
            {data.github_url ? <a href={data.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted"><Github className="h-4 w-4" /> View source on GitHub</a> : null}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

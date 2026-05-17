import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProfile, getProjects, getSkills } from "../api/portfolio";
import { CTAButtons } from "../components/CTAButtons";
import { Hero3D } from "../components/Hero3D";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProjectCard } from "../components/ProjectCard";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { SkillBadge } from "../components/SkillBadge";
import { useAudience } from "../hooks/useAudience";
import type { Audience, Project, Skill } from "../types/api";

const audienceDetails: Record<Audience, { intro: string; focus: string[]; skillTerms: string[]; projectTerms: string[] }> = {
  recruiter: {
    intro: "A full-stack portfolio focused on role fit, technical proof, project depth, and clear interview paths.",
    focus: ["Role-fit proof", "Stack depth", "Readable case studies"],
    skillTerms: ["react", "typescript", "python", "fastapi", "supabase", "api", "database", "testing"],
    projectTerms: ["full-stack", "dashboard", "api", "admin", "technical", "portfolio", "system"]
  },
  client: {
    intro: "A service-oriented portfolio focused on outcomes, delivery confidence, and a simple path to request work.",
    focus: ["Outcome clarity", "Delivery confidence", "Simple project intake"],
    skillTerms: ["react", "design", "frontend", "supabase", "cloudinary", "resend", "seo", "performance"],
    projectTerms: ["client", "service", "landing", "commerce", "booking", "contact", "portfolio", "website"]
  }
};

function projectScore(project: Project, audience: Audience) {
  const terms = audienceDetails[audience].projectTerms;
  const haystack = [project.title, project.category, project.short_description, project.description, ...project.tech_stack].join(" ").toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function skillMatches(skill: Skill, audience: Audience) {
  const haystack = `${skill.name} ${skill.category}`.toLowerCase();
  return audienceDetails[audience].skillTerms.some((term) => haystack.includes(term));
}

export function HomePage() {
  const { audience, setAudience } = useAudience();
  const profile = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const skills = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const projects = useQuery({ queryKey: ["projects"], queryFn: getProjects });
  const details = audienceDetails[audience];
  const featured = (projects.data?.filter((project) => project.featured) ?? [])
    .map((project) => ({ project, score: projectScore(project, audience) }))
    .sort((a, b) => b.score - a.score || a.project.sort_order - b.project.sort_order)
    .slice(0, 3);
  const highlightedSkills = skills.data?.filter((skill) => skill.is_featured && skillMatches(skill, audience)).slice(0, 8) ?? [];
  const fallbackSkills = skills.data?.filter((skill) => skill.is_featured).slice(0, 8) ?? [];

  return (
    <>
      <RevealSection className="container-shell grid min-h-[calc(100vh-64px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 inline-flex rounded-md border border-white/12 bg-white/6 p-1 backdrop-blur" role="group" aria-label="Choose audience mode">
            <button className={`rounded px-3 py-2 text-sm transition ${audience === "recruiter" ? "bg-accent text-ink shadow-glow" : "text-muted hover:text-white"}`} onClick={() => setAudience("recruiter")} aria-pressed={audience === "recruiter"}>For Recruiters</button>
            <button className={`rounded px-3 py-2 text-sm transition ${audience === "client" ? "bg-accent text-ink shadow-glow" : "text-muted hover:text-white"}`} onClick={() => setAudience("client")} aria-pressed={audience === "client"}>For Clients</button>
          </div>
          {profile.isLoading ? <LoadingSpinner /> : null}
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Available for selective opportunities</p>
          <h1 className="mt-4 font-display text-balance text-5xl font-semibold tracking-normal text-white md:text-7xl">{profile.data?.full_name ?? "Your Name"} builds useful, polished software.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {details.intro}
          </p>
          <p className="mt-4 text-sm text-muted">{profile.data?.title ?? "Full-stack developer"} · {profile.data?.location ?? "Location not configured"}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {details.focus.map((item) => <span key={item} className="rounded-md border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-mist">{item}</span>)}
          </div>
          <div className="mt-8"><CTAButtons /></div>
          <div className="mt-8 flex flex-wrap gap-2">
            {(highlightedSkills.length ? highlightedSkills : fallbackSkills).map((skill) => <SkillBadge key={skill.id} skill={skill} highlighted={highlightedSkills.some((item) => item.id === skill.id)} />)}
          </div>
        </div>
        <Hero3D />
      </RevealSection>
      <RevealSection className="container-shell py-16">
        <SectionHeader eyebrow="Proof" title={audience === "recruiter" ? "Featured technical case studies" : "Featured client-ready work"} body="The audience toggle prioritizes projects by matching their real title, category, description, and stack metadata." />
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map(({ project, score }) => <ProjectCard key={project.id} project={project} highlighted={score > 0} />)}
        </div>
        <Link to="/projects" className="mt-8 inline-flex text-sm font-semibold text-accent">View all projects</Link>
      </RevealSection>
    </>
  );
}

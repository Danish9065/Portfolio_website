import { useQuery } from "@tanstack/react-query";
import { getExperience } from "../api/portfolio";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";

export function ExperiencePage() {
  const { data = [] } = useQuery({ queryKey: ["experience"], queryFn: getExperience });
  return <RevealSection className="container-shell py-14"><SectionHeader eyebrow="Experience" title="Timeline for recruiters and hiring teams" body="Work history, internships, education, certifications, and role fit." /><ExperienceTimeline items={data} /></RevealSection>;
}

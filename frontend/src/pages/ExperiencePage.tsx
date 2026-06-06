import { useQuery } from "@tanstack/react-query";
import { getExperience } from "../api/portfolio";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";

export function ExperiencePage() {
  const { data = [] } = useQuery({ queryKey: ["experience"], queryFn: getExperience });
  return <RevealSection className="container-shell py-14"><SectionHeader eyebrow="Experience" title="Experience and education" body="A timeline of my work, learning, certifications, and technical growth." /><ExperienceTimeline items={data} /></RevealSection>;
}

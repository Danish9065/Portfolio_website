import { useQuery } from "@tanstack/react-query";
import { getExperience, getProfile, getSkills } from "../api/portfolio";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { SkillBadge } from "../components/SkillBadge";

export function AboutPage() {
  const profile = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const skills = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const experience = useQuery({ queryKey: ["experience"], queryFn: getExperience });
  return (
    <RevealSection className="container-shell py-14">
      <SectionHeader eyebrow="About" title="Built for technical credibility and clear communication" body={profile.data?.bio ?? "Profile content loads from Supabase when configured; demo content is served otherwise."} />
      <div className="mb-12 flex flex-wrap gap-2">{skills.data?.map((skill) => <SkillBadge key={skill.id} skill={skill} />)}</div>
      <SectionHeader title="Timeline" body="Replace the sample timeline with real work, education, and certifications before publishing." />
      <ExperienceTimeline items={experience.data ?? []} />
    </RevealSection>
  );
}

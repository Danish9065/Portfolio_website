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
      <SectionHeader eyebrow="About" title="Built for technical credibility and clear communication" body={profile.data?.bio ?? "Full-stack developer focused on practical, reliable digital products."} />
      <div className="mb-12 flex flex-wrap gap-2">{skills.data?.map((skill) => <SkillBadge key={skill.id} skill={skill} />)}</div>
      <SectionHeader title="Timeline" body="Work history, education, certifications, and role-focused milestones." />
      <ExperienceTimeline items={experience.data ?? []} />
    </RevealSection>
  );
}

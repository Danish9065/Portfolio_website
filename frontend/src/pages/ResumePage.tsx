import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { getProfile, getSkills } from "../api/portfolio";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { SkillBadge } from "../components/SkillBadge";

const RESUME_FILENAME = "Danish-MD-Resume.pdf";

function getDownloadUrl(url: string) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/") || url.includes("/fl_attachment")) {
    return url;
  }

  return url.replace("/upload/", `/upload/fl_attachment:${RESUME_FILENAME}/`);
}

export function ResumePage() {
  const profile = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const skills = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const resumeUrl = profile.data?.resume_url || "/resume-placeholder.txt";
  const downloadUrl = getDownloadUrl(resumeUrl);
  return (
    <RevealSection className="container-shell py-14">
      <SectionHeader eyebrow="Resume" title="Recruiter snapshot" body="Configure a real resume URL through Supabase or Cloudinary before sending this page publicly." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="panel rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white">{profile.data?.full_name ?? "Your Name"}</h3>
          <p className="mt-2 text-accent">{profile.data?.title ?? "Full-stack developer"}</p>
          <p className="mt-4 text-sm leading-6 text-muted">{profile.data?.bio}</p>
          <a href={downloadUrl} download={RESUME_FILENAME} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 font-semibold text-ink"><Download className="h-4 w-4" /> Download resume</a>
        </div>
        <div className="panel rounded-lg p-6">
          <h3 className="font-semibold text-white">Core stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">{skills.data?.map((skill) => <SkillBadge key={skill.id} skill={skill} />)}</div>
        </div>
      </div>
    </RevealSection>
  );
}

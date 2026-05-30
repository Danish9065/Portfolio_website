import { useState, type MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { getProfile, getSkills } from "../api/portfolio";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { SkillBadge } from "../components/SkillBadge";

const RESUME_FILENAME = "Danish-MD-Resume.pdf";

export function ResumePage() {
  const profile = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const skills = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const resumeUrl = profile.data?.resume_url;
  const [downloading, setDownloading] = useState(false);

  async function downloadResume(event: MouseEvent<HTMLAnchorElement>) {
    if (!profile.data?.resume_url) return;

    event.preventDefault();
    setDownloading(true);

    try {
      const response = await fetch(profile.data.resume_url);
      if (!response.ok) throw new Error("Resume download failed");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(profile.data.resume_url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <RevealSection className="container-shell py-14">
      <SectionHeader eyebrow="Resume" title="Recruiter snapshot" body="A focused overview of profile, skills, and resume details." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="panel rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white">{profile.data?.full_name ?? "Danish MD"}</h3>
          <p className="mt-2 text-accent">{profile.data?.title ?? "Full-stack developer"}</p>
          <p className="mt-4 text-sm leading-6 text-muted">{profile.data?.bio}</p>
          {resumeUrl ? (
            <a href={resumeUrl} download={RESUME_FILENAME} onClick={downloadResume} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 font-semibold text-ink"><Download className="h-4 w-4" /> {downloading ? "Downloading..." : "Download resume"}</a>
          ) : (
            <span className="mt-6 inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 font-semibold text-muted"><Download className="h-4 w-4" /> Resume available on request</span>
          )}
        </div>
        <div className="panel rounded-lg p-6">
          <h3 className="font-semibold text-white">Core stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">{skills.data?.map((skill) => <SkillBadge key={skill.id} skill={skill} />)}</div>
        </div>
      </div>
    </RevealSection>
  );
}

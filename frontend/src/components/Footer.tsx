import { useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Mail } from "lucide-react";
import { getProfile } from "../api/portfolio";

export function Footer() {
  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  return (
    <footer className="border-t border-[#D7E2EA]/10 bg-[#0C0C0C] py-10">
      <div className="container-shell flex flex-col justify-between gap-6 text-sm text-muted md:flex-row">
        <div className="flex gap-4">
          {profile?.email ? <a href={`mailto:${profile.email}`} aria-label="Email"><Mail className="h-5 w-5" /></a> : null}
          {profile?.github_url ? <a href={profile.github_url} aria-label="GitHub"><Github className="h-5 w-5" /></a> : null}
          {profile?.linkedin_url ? <a href={profile.linkedin_url} aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a> : null}
        </div>
      </div>
    </footer>
  );
}

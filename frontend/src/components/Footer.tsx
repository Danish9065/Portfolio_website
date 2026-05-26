import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#D7E2EA]/10 bg-[#0C0C0C] py-10">
      <div className="container-shell flex flex-col justify-between gap-6 text-sm text-muted md:flex-row">
        <div className="flex gap-4">
          <a href="mailto:hello@example.com" aria-label="Email"><Mail className="h-5 w-5" /></a>
          <a href="https://github.com/" aria-label="GitHub"><Github className="h-5 w-5" /></a>
          <a href="https://linkedin.com/" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}

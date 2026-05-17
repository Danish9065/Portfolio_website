import { BriefcaseBusiness, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/events";

export function CTAButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        to="/resume"
        onClick={() => trackEvent("cta_clicked", { cta: "hire_job" })}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-ink shadow-glow"
      >
        <BriefcaseBusiness className="h-5 w-5" />
        Hire Me for a Job
      </Link>
      <Link
        to="/services"
        onClick={() => trackEvent("cta_clicked", { cta: "work_client" })}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-panel px-5 py-3 font-semibold text-mist hover:border-accent/60"
      >
        <Handshake className="h-5 w-5" />
        Work With Me as a Client
      </Link>
    </div>
  );
}

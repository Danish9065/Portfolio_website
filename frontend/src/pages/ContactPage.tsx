import { ContactForm } from "../components/ContactForm";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";

export function ContactPage() {
  return (
    <RevealSection className="container-shell grid items-start gap-8 pb-8 pt-14 lg:grid-cols-[0.85fr_1.15fr]">
      <SectionHeader eyebrow="Contact" title="Start the right conversation" body="Tell me about the role, project, or collaboration you have in mind." />
      <ContactForm />
    </RevealSection>
  );
}

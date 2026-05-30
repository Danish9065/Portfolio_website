import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/portfolio";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";

export function ServicesPage() {
  const { data = [] } = useQuery({ queryKey: ["services"], queryFn: getServices });
  return <RevealSection className="container-shell py-14"><SectionHeader eyebrow="Services" title="Clear ways to work together" body="Focused web development, frontend polish, and integration work for practical product goals." /><div className="grid gap-5 md:grid-cols-3">{data.map((service) => <ServiceCard key={service.id} service={service} />)}</div></RevealSection>;
}

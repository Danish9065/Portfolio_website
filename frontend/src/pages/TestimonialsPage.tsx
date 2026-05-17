import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../api/portfolio";
import { RevealSection } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { TestimonialCard } from "../components/TestimonialCard";

export function TestimonialsPage() {
  const { data = [] } = useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });
  return <RevealSection className="container-shell py-14"><SectionHeader eyebrow="Testimonials" title="Proof, clearly labeled" body="Demo testimonials are marked in seed content and should be replaced with real permissioned quotes." /><div className="grid gap-5 md:grid-cols-2">{data.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}</div></RevealSection>;
}

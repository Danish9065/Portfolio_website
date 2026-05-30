import type { Testimonial } from "../types/api";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="panel rounded-lg p-6">
      <blockquote className="text-base leading-7 text-mist">"{testimonial.quote}"</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-white">{testimonial.name}</span>
        <span className="block text-muted">{[testimonial.role, testimonial.company].filter(Boolean).join(" · ") || "Reference"}</span>
      </figcaption>
    </figure>
  );
}

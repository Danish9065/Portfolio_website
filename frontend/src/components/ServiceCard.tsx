import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../types/api";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="panel rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
      <ul className="mt-5 space-y-2 text-sm text-mist">
        {service.features.map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      {service.starting_price ? <p className="mt-5 text-sm text-gold">{service.starting_price}</p> : null}
      <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Request quote <ArrowRight className="h-4 w-4" /></Link>
    </article>
  );
}

import type { Experience } from "../types/api";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <article key={item.id} className="panel rounded-lg p-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold text-white">{item.role}</h3>
              <p className="text-sm text-accent">{item.company} · {item.type}</p>
            </div>
            <p className="text-sm text-muted">{item.start_date} - {item.current ? "Present" : item.end_date}</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">{item.description}</p>
          <ul className="mt-4 grid gap-2 text-sm text-mist">
            {item.highlights.map((highlight) => <li key={highlight}>• {highlight}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

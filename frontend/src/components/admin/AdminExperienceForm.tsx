import { useState } from "react";
import type { Experience } from "../../types/api";

type AdminExperienceFormProps = {
  label: string;
  initial?: Partial<Experience>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
};

export function AdminExperienceForm({ label, initial, onSubmit }: AdminExperienceFormProps) {
  const [values, setValues] = useState<Record<string, string>>({
    role: initial?.role ?? "",
    company: initial?.company ?? "",
    type: initial?.type ?? "Work",
    location: initial?.location ?? "",
    start_date: initial?.start_date ?? "",
    end_date: initial?.end_date ?? "",
    current: String(initial?.current ?? false),
    description: initial?.description ?? "",
    highlights: initial?.highlights?.join(", ") ?? ""
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      ...values,
      end_date: values.current === "true" ? null : values.end_date || null,
      current: values.current === "true",
      highlights: values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
    });
  }

  return (
    <form onSubmit={submit} className="panel grid gap-3 rounded-lg p-5">
      <h3 className="font-semibold text-white">{label}</h3>
      <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Role, degree, or certification" value={values.role} onChange={(event) => setValues({ ...values, role: event.target.value })} />
      <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Company, school, or issuer" value={values.company} onChange={(event) => setValues({ ...values, company: event.target.value })} />
      <div className="grid gap-3 md:grid-cols-2">
        <select className="rounded-md border border-line bg-ink px-3 py-2 text-sm" value={values.type} onChange={(event) => setValues({ ...values, type: event.target.value })}>
          <option>Work</option>
          <option>Education</option>
          <option>Certification</option>
          <option>Freelance</option>
          <option>Internship</option>
        </select>
        <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Location" value={values.location} onChange={(event) => setValues({ ...values, location: event.target.value })} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Start date
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm normal-case tracking-normal text-mist" type="date" value={values.start_date} onChange={(event) => setValues({ ...values, start_date: event.target.value })} />
        </label>
        <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          End date
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm normal-case tracking-normal text-mist disabled:opacity-40" type="date" value={values.end_date} disabled={values.current === "true"} onChange={(event) => setValues({ ...values, end_date: event.target.value })} />
        </label>
      </div>
      <label className="flex items-center gap-2 rounded-md border border-line bg-ink px-3 py-2 text-sm text-mist">
        <input type="checkbox" checked={values.current === "true"} onChange={(event) => setValues({ ...values, current: String(event.target.checked), end_date: event.target.checked ? "" : values.end_date })} />
        Current / active
      </label>
      <textarea className="min-h-24 rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Description" value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })} />
      <textarea className="min-h-20 rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Highlights, comma separated" value={values.highlights} onChange={(event) => setValues({ ...values, highlights: event.target.value })} />
      <button className="rounded-md bg-accent px-4 py-2 font-semibold text-ink">Save</button>
    </form>
  );
}

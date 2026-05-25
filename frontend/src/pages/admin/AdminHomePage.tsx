import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { updateHomeContent } from "../../api/admin";
import { getHomeContent } from "../../api/portfolio";
import { useToast } from "../../components/ToastProvider";
import type { HomeContent, HomeProjectItem, HomeServiceItem } from "../../types/api";

const emptyHomeContent: HomeContent = {
  hero: {
    nav: [],
    heading: "",
    tagline: "",
    portrait_url: "",
    contact_label: "Contact Me"
  },
  marquee: {
    images: []
  },
  about: {
    heading: "",
    body: "",
    decor: {
      moon: "",
      object: "",
      lego: "",
      group: ""
    }
  },
  services: {
    heading: "",
    items: []
  },
  projects: {
    heading: "",
    items: []
  }
};

function linesToArray(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function arrayToLines(value: string[]) {
  return value.join("\n");
}

function Field({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  const className = "mt-2 w-full rounded-md border border-line bg-[#0C0C0C] px-3 py-2 text-sm text-mist outline-none focus:border-accent";

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      {textarea ? (
        <textarea className={`${className} min-h-28 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel rounded-lg p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

export function AdminHomePage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data } = useQuery({ queryKey: ["home"], queryFn: getHomeContent });
  const [form, setForm] = useState<HomeContent>(emptyHomeContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  function updateService(index: number, patch: Partial<HomeServiceItem>) {
    setForm((current) => ({
      ...current,
      services: {
        ...current.services,
        items: current.services.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  function updateProject(index: number, patch: Partial<HomeProjectItem>) {
    setForm((current) => ({
      ...current,
      projects: {
        ...current.projects,
        items: current.projects.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  async function save() {
    setSaving(true);
    try {
      const saved = await updateHomeContent(form);
      setForm(saved);
      client.setQueryData(["home"], saved);
      await client.invalidateQueries({ queryKey: ["home"] });
      notify("Home content saved", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Home content could not be saved", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="hero-heading text-4xl font-black uppercase leading-none md:text-5xl">Home editor</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Edit the content used by the Danish landing page. One URL per line for image lists.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink shadow-glow disabled:opacity-60" onClick={() => void save()} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save home"}
        </button>
      </div>

      <AdminCard title="Hero">
        <Field label="Heading" value={form.hero.heading} onChange={(heading) => setForm({ ...form, hero: { ...form.hero, heading } })} />
        <Field label="Tagline" textarea value={form.hero.tagline} onChange={(tagline) => setForm({ ...form, hero: { ...form.hero, tagline } })} />
        <Field label="Portrait image URL" value={form.hero.portrait_url} onChange={(portrait_url) => setForm({ ...form, hero: { ...form.hero, portrait_url } })} />
        <Field label="Contact button label" value={form.hero.contact_label} onChange={(contact_label) => setForm({ ...form, hero: { ...form.hero, contact_label } })} />
        <Field
          label="Hero nav links (Label|/path)"
          textarea
          value={form.hero.nav.map((item) => `${item.label}|${item.to}`).join("\n")}
          onChange={(value) =>
            setForm({
              ...form,
              hero: {
                ...form.hero,
                nav: linesToArray(value).map((line) => {
                  const [label, to = "/"] = line.split("|");
                  return { label: label.trim(), to: to.trim() };
                })
              }
            })
          }
        />
      </AdminCard>

      <AdminCard title="Marquee">
        <Field label="GIF/image URLs" textarea value={arrayToLines(form.marquee.images)} onChange={(value) => setForm({ ...form, marquee: { images: linesToArray(value) } })} />
      </AdminCard>

      <AdminCard title="About">
        <Field label="Heading" value={form.about.heading} onChange={(heading) => setForm({ ...form, about: { ...form.about, heading } })} />
        <Field label="Paragraph" textarea value={form.about.body} onChange={(body) => setForm({ ...form, about: { ...form.about, body } })} />
        <div className="grid gap-4 md:grid-cols-2">
          {(["moon", "object", "lego", "group"] as const).map((key) => (
            <Field key={key} label={`${key} image URL`} value={form.about.decor[key]} onChange={(value) => setForm({ ...form, about: { ...form.about, decor: { ...form.about.decor, [key]: value } } })} />
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Services section">
        <Field label="Heading" value={form.services.heading} onChange={(heading) => setForm({ ...form, services: { ...form.services, heading } })} />
        <div className="grid gap-4">
          {form.services.items.map((service, index) => (
            <div key={`${service.number}-${index}`} className="rounded-lg border border-line bg-white/5 p-4">
              <div className="grid gap-3 md:grid-cols-[0.25fr_0.75fr]">
                <Field label="Number" value={service.number} onChange={(number) => updateService(index, { number })} />
                <Field label="Name" value={service.name} onChange={(name) => updateService(index, { name })} />
              </div>
              <div className="mt-3">
                <Field label="Description" textarea value={service.description} onChange={(description) => updateService(index, { description })} />
              </div>
              <button className="mt-3 inline-flex items-center gap-2 text-sm text-red-200" onClick={() => setForm({ ...form, services: { ...form.services, items: form.services.items.filter((_, itemIndex) => itemIndex !== index) } })}>
                <Trash2 className="h-4 w-4" /> Remove service
              </button>
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent" onClick={() => setForm({ ...form, services: { ...form.services, items: [...form.services.items, { number: "06", name: "New Service", description: "Describe the service." }] } })}>
          <Plus className="h-4 w-4" /> Add service
        </button>
      </AdminCard>

      <AdminCard title="Projects section">
        <Field label="Heading" value={form.projects.heading} onChange={(heading) => setForm({ ...form, projects: { ...form.projects, heading } })} />
        <div className="grid gap-4">
          {form.projects.items.map((project, index) => (
            <div key={`${project.number}-${index}`} className="rounded-lg border border-line bg-white/5 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Number" value={project.number} onChange={(number) => updateProject(index, { number })} />
                <Field label="Category" value={project.category} onChange={(category) => updateProject(index, { category })} />
                <Field label="Name" value={project.name} onChange={(name) => updateProject(index, { name })} />
              </div>
              <div className="mt-3">
                <Field label="Three project image URLs" textarea value={arrayToLines(project.images)} onChange={(value) => updateProject(index, { images: linesToArray(value) })} />
              </div>
              <button className="mt-3 inline-flex items-center gap-2 text-sm text-red-200" onClick={() => setForm({ ...form, projects: { ...form.projects, items: form.projects.items.filter((_, itemIndex) => itemIndex !== index) } })}>
                <Trash2 className="h-4 w-4" /> Remove project
              </button>
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent" onClick={() => setForm({ ...form, projects: { ...form.projects, items: [...form.projects.items, { number: "04", name: "New Project", category: "Client", images: ["", "", ""] }] } })}>
          <Plus className="h-4 w-4" /> Add project
        </button>
      </AdminCard>
    </section>
  );
}

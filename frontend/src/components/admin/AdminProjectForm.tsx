import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { uploadProjectImage } from "../../api/admin";
import { useToast } from "../ToastProvider";
import type { Project, Service, Testimonial } from "../../types/api";

type AdminFormProps<T> = {
  label: string;
  initial?: Partial<T>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
};

export function AdminProjectForm({ label, initial, onSubmit }: AdminFormProps<Project>) {
  const [values, setValues] = useState<Record<string, string>>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    short_description: initial?.short_description ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "Full-stack",
    tech_stack: initial?.tech_stack?.join(", ") ?? "",
    image_url: initial?.image_url ?? "",
    live_url: initial?.live_url ?? "",
    github_url: initial?.github_url ?? "",
    featured: String(initial?.featured ?? false),
    sort_order: String(initial?.sort_order ?? 0)
  });

  return <GenericForm label={label} values={values} setValues={setValues} onSubmit={onSubmit} kind="project" />;
}

export function AdminServiceForm({ label, initial, onSubmit }: AdminFormProps<Service>) {
  const [values, setValues] = useState<Record<string, string>>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    features: initial?.features?.join(", ") ?? "",
    starting_price: initial?.starting_price ?? "",
    icon: initial?.icon ?? "",
    sort_order: String(initial?.sort_order ?? 0)
  });
  return <GenericForm label={label} values={values} setValues={setValues} onSubmit={onSubmit} kind="service" />;
}

export function AdminTestimonialForm({ label, initial, onSubmit }: AdminFormProps<Testimonial>) {
  const [values, setValues] = useState<Record<string, string>>({
    name: initial?.name ?? "",
    role: initial?.role ?? "",
    company: initial?.company ?? "",
    quote: initial?.quote ?? "",
    avatar_url: initial?.avatar_url ?? "",
    rating: String(initial?.rating ?? "")
  });
  return <GenericForm label={label} values={values} setValues={setValues} onSubmit={onSubmit} kind="testimonial" />;
}

function GenericForm({
  label,
  values,
  setValues,
  onSubmit,
  kind
}: {
  label: string;
  values: Record<string, string>;
  setValues: (values: Record<string, string>) => void;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  kind: "project" | "service" | "testimonial";
}) {
  const { notify } = useToast();
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadProjectImage(file);
      if (!result.configured || !result.secure_url) {
        notify(result.message || "Cloudinary is not configured. Add credentials before uploading images.", "error");
        return;
      }
      setValues({ ...values, image_url: result.secure_url });
      notify("Image uploaded and image_url was filled.", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload: Record<string, unknown> = { ...values };
    if (kind === "project") {
      payload.tech_stack = values.tech_stack.split(",").map((item) => item.trim()).filter(Boolean);
      payload.featured = values.featured === "true";
      payload.sort_order = Number(values.sort_order || 0);
    }
    if (kind === "service") {
      payload.features = values.features.split(",").map((item) => item.trim()).filter(Boolean);
      payload.sort_order = Number(values.sort_order || 0);
    }
    if (kind === "testimonial") payload.rating = values.rating ? Number(values.rating) : null;
    await onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="panel grid gap-3 rounded-lg p-5">
      <h3 className="font-semibold text-white">{label}</h3>
      {Object.entries(values).map(([key, value]) => (
        key === "image_url" && kind === "project" ? (
          <div key={key} className="grid gap-2">
            <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="image_url" value={value} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-panel px-3 py-3 text-sm text-muted hover:border-accent hover:text-white">
              <ImagePlus className="h-4 w-4" />
              {uploading ? "Uploading image..." : "Upload image and use as image_url"}
              <input className="hidden" type="file" accept="image/*" disabled={uploading} onChange={(event) => void handleImageUpload(event.target.files?.[0])} />
            </label>
          </div>
        ) : key === "description" || key === "quote" ? (
          <textarea key={key} className="min-h-24 rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder={key} value={value} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
        ) : (
          <input key={key} className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder={key} value={value} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
        )
      ))}
      <button className="rounded-md bg-accent px-4 py-2 font-semibold text-ink">Save</button>
    </form>
  );
}

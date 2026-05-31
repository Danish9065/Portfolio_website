import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileUp, Save } from "lucide-react";
import { updateProfile, uploadResume } from "../../api/admin";
import { getProfile } from "../../api/portfolio";
import { useToast } from "../../components/ToastProvider";
import type { Profile } from "../../types/api";

const LOCAL_RESUME_PATH = "/Danish-MD-Resume.pdf";

const emptyProfile: Profile = {
  id: "00000000-0000-4000-8000-000000000001",
  full_name: "",
  title: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  linkedin_url: "",
  github_url: "",
  website_url: "",
  resume_url: LOCAL_RESUME_PATH
};

export function AdminResumePage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const [form, setForm] = useState<Profile>(emptyProfile);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...data, resume_url: data.resume_url || LOCAL_RESUME_PATH });
  }, [data]);

  async function handleResumeUpload(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadResume(file);
      if (!result.configured || !result.secure_url) {
        notify(result.message || "Cloudinary is not configured. Add credentials before uploading resumes.", "error");
        return;
      }
      setForm((current) => ({ ...current, resume_url: result.secure_url }));
      notify("Resume uploaded and URL was filled.", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Resume upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = await updateProfile(form);
      setForm(saved);
      client.setQueryData(["profile"], saved);
      await client.invalidateQueries({ queryKey: ["profile"] });
      notify("Resume/profile saved", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Resume/profile could not be saved", "error");
    } finally {
      setSaving(false);
    }
  }

  function updateField(key: keyof Profile, value: string) {
    setForm({ ...form, [key]: value });
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold text-white">Resume</h1>
      <p className="mt-2 text-sm text-muted">Update the profile details and the downloadable resume used on the public resume page.</p>
      <form onSubmit={save} className="panel mt-5 grid gap-3 rounded-lg p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Full name" value={form.full_name} onChange={(event) => updateField("full_name", event.target.value)} />
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(event) => updateField("title", event.target.value)} />
        </div>
        <textarea className="min-h-28 rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Bio" value={form.bio} onChange={(event) => updateField("bio", event.target.value)} />
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Location" value={form.location} onChange={(event) => updateField("location", event.target.value)} />
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Phone" value={form.phone ?? ""} onChange={(event) => updateField("phone", event.target.value)} />
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="Website URL" value={form.website_url ?? ""} onChange={(event) => updateField("website_url", event.target.value)} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="LinkedIn URL" value={form.linkedin_url ?? ""} onChange={(event) => updateField("linkedin_url", event.target.value)} />
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder="GitHub URL" value={form.github_url ?? ""} onChange={(event) => updateField("github_url", event.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-muted">Resume URL — defaults to local file <code className="text-accent">{LOCAL_RESUME_PATH}</code></label>
          <input className="rounded-md border border-line bg-ink px-3 py-2 text-sm" placeholder={LOCAL_RESUME_PATH} value={form.resume_url ?? ""} onChange={(event) => updateField("resume_url", event.target.value)} />
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-panel px-3 py-3 text-sm text-muted hover:border-accent hover:text-white">
            <FileUp className="h-4 w-4" />
            {uploading ? "Uploading resume..." : "Upload resume PDF via Cloudinary"}
            <input className="hidden" type="file" accept=".pdf,application/pdf" disabled={uploading} onChange={(event) => void handleResumeUpload(event.target.files?.[0])} />
          </label>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold text-ink disabled:opacity-60" disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save resume/profile"}
        </button>
      </form>
    </section>
  );
}

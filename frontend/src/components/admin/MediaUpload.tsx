import { ImagePlus, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSiteContent, uploadAndSaveSiteMedia, type SiteContentKey } from "../../api/siteContent";
import { useToast } from "../ToastProvider";

export function MediaUpload({ sectionKey, label, description }: { sectionKey: SiteContentKey; label: string; description?: string }) {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data, isLoading, error } = useQuery({ queryKey: ["site-content", sectionKey], queryFn: () => getSiteContent(sectionKey) });
  const [uploading, setUploading] = useState(false);

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const saved = await uploadAndSaveSiteMedia(sectionKey, file);
      client.setQueryData(["site-content", sectionKey], saved);
      notify(`${label} updated`, "success");
    } catch (uploadError) {
      notify(uploadError instanceof Error ? uploadError.message : "Media upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  const src = data?.optimized_url || data?.media_url;

  return (
    <section className="rounded-lg border border-line bg-white/5 p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <h3 className="font-semibold text-white">{label}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-muted">{description}</p> : null}
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{sectionKey}</p>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : src ? <RefreshCw className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
          {uploading ? "Uploading..." : src ? "Replace media" : "Upload media"}
          <input className="hidden" type="file" accept="image/*,.gif" disabled={uploading} onChange={(event) => void upload(event.target.files?.[0])} />
        </label>
      </div>

      {isLoading ? <p className="mt-4 text-sm text-muted">Loading current media...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-200">Current media could not be loaded.</p> : null}
      {src ? (
        <div className="mt-4 grid gap-3 md:grid-cols-[220px_1fr]">
          <img src={src} alt={`${label} preview`} className="h-36 w-full rounded-md border border-line object-cover" loading="lazy" />
          <dl className="grid content-start gap-2 text-sm text-muted">
            <div><dt className="font-semibold text-mist">Format</dt><dd>{data?.media_format || "Unknown"}</dd></div>
            <div><dt className="font-semibold text-mist">Size</dt><dd>{data?.media_width && data?.media_height ? `${data.media_width} x ${data.media_height}` : "Unknown"}</dd></div>
            <div><dt className="font-semibold text-mist">Public ID</dt><dd className="break-all">{data?.media_public_id || "Not saved"}</dd></div>
          </dl>
        </div>
      ) : !isLoading ? (
        <p className="mt-4 rounded-md border border-dashed border-line p-4 text-sm text-muted">No media selected yet.</p>
      ) : null}
    </section>
  );
}

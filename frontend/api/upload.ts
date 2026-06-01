import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { checkRateLimit, getClientIp, requireAdmin, type ApiRequest as BaseApiRequest } from "./_utils";

type ApiRequest = BaseApiRequest & {
  body?: {
    file?: string;
    type?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const uploadSchema = z.object({
  file: z.string().min(1),
  type: z.enum(["image", "resume"]),
});
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function inspectDataUrl(file: string, type: "image" | "resume") {
  const match = /^data:([^;,]+);base64,([a-z0-9+/=\s]+)$/i.exec(file);
  if (!match) return { ok: false, error: "File must be a base64 data URL." };

  const mimeType = match[1].toLowerCase();
  const base64 = match[2].replace(/\s/g, "");
  const bytes = Math.floor((base64.length * 3) / 4) - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);

  if (type === "image" && !allowedImageTypes.has(mimeType)) {
    return { ok: false, error: "Only JPG, PNG, WebP, and GIF images are allowed." };
  }

  if (type === "resume" && mimeType !== "application/pdf") {
    return { ok: false, error: "Resume uploads must be PDF files." };
  }

  const maxBytes = type === "resume" ? MAX_RESUME_BYTES : MAX_IMAGE_BYTES;
  if (bytes > maxBytes) {
    return { ok: false, error: `File is too large. Maximum size is ${Math.floor(maxBytes / 1024 / 1024)}MB.` };
  }

  return { ok: true, mimeType, bytes };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit({ key: `upload:${ip}`, limit: 20, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.ok) {
    return res.status(429).json({ error: "Too many upload attempts. Try again later.", retry_after: rateLimit.retryAfter });
  }

  const admin = await requireAdmin(req);
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error });

  const parsed = uploadSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid upload payload." });
  }

  const { file, type } = parsed.data;
  const fileInfo = inspectDataUrl(file, type);
  if (!fileInfo.ok) {
    return res.status(400).json({ error: fileInfo.error });
  }

  const cloud_name = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    return res.status(500).json({ error: "Cloudinary is not configured on the server.", configured: false });
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  const folder = type === "resume" ? "portfolio/resumes" : "portfolio/images";
  const resourceType = type === "resume" ? "auto" : "image";

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType,
    });

    return res.status(200).json({
      configured: true,
      secure_url: result.secure_url,
      optimized_url: result.secure_url, // Cloudinary applies auto formatting usually
      public_id: result.public_id,
      asset_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      version: result.version,
    });
  } catch (error: unknown) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed" });
  }
}

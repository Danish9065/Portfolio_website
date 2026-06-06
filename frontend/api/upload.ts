import crypto from "crypto";

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: {
    file?: string;
    type?: string;
  } | string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

type UploadType = "image" | "resume";
type RateLimitEntry = { count: number; resetAt: number };

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_RESUME_BYTES = 3 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const rateLimitStore = new Map<string, RateLimitEntry>();

function getHeader(req: ApiRequest, name: string) {
  const value = req.headers?.[name.toLowerCase()] ?? req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function parseBody(body: ApiRequest["body"]): { file?: string; type?: string } {
  if (typeof body !== "string") return body || {};

  try {
    return JSON.parse(body) as { file?: string; type?: string };
  } catch {
    return {};
  }
}

function checkRateLimit(req: ApiRequest) {
  const forwardedFor = getHeader(req, "x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= 20) return false;
  existing.count += 1;
  return true;
}

function inspectDataUrl(file: string, type: UploadType) {
  const match = /^data:([^;,]+);base64,([a-z0-9+/=\s]+)$/i.exec(file);
  if (!match) return { ok: false as const, error: "File must be a base64 data URL." };

  const mimeType = match[1].toLowerCase();
  const base64 = match[2].replace(/\s/g, "");
  const bytes = Math.floor((base64.length * 3) / 4) - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);

  if (type === "image" && !allowedImageTypes.has(mimeType)) {
    return { ok: false as const, error: "Only JPG, PNG, WebP, and GIF images are allowed." };
  }

  if (type === "resume" && mimeType !== "application/pdf") {
    return { ok: false as const, error: "Resume uploads must be PDF files." };
  }

  const maxBytes = type === "resume" ? MAX_RESUME_BYTES : MAX_IMAGE_BYTES;
  if (bytes > maxBytes) {
    return { ok: false as const, error: `File is too large. Maximum size is ${Math.floor(maxBytes / 1024 / 1024)}MB.` };
  }

  return { ok: true as const };
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function verifyAdmin(req: ApiRequest) {
  const authorization = getHeader(req, "authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const supabaseKey = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "").trim();
  const adminEmails = getAdminEmails();

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) || !supabaseKey) {
    return { ok: false as const, status: 500, error: "Supabase auth is not configured correctly on the server." };
  }

  if (adminEmails.length === 0) {
    return { ok: false as const, status: 500, error: "Admin email allowlist is not configured on the server." };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseKey,
      authorization,
    },
  });

  if (!response.ok) return { ok: false as const, status: 403, error: "Forbidden" };

  const user = await response.json() as { email?: string };
  if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const };
}

async function uploadToCloudinary(file: string, type: UploadType) {
  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

  if (!/^[a-z0-9_-]+$/i.test(cloudName) || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are missing or invalid. Set the cloud name only, not a Cloudinary URL.");
  }

  const folder = type === "resume" ? "portfolio/resumes" : "portfolio/images";
  const resourceType = type === "resume" ? "auto" : "image";
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  const form = new FormData();

  form.set("file", file);
  form.set("api_key", apiKey);
  form.set("folder", folder);
  form.set("timestamp", timestamp);
  form.set("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });
  const result = await response.json() as Record<string, unknown> & { error?: { message?: string } };

  if (!response.ok) {
    throw new Error(result.error?.message || "Cloudinary upload failed.");
  }

  return result;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (!checkRateLimit(req)) return res.status(429).json({ error: "Too many upload attempts. Try again later." });

    const admin = await verifyAdmin(req);
    if (!admin.ok) return res.status(admin.status).json({ error: admin.error });

    const body = parseBody(req.body);
    const type = body.type;
    const file = body.file;
    if ((type !== "image" && type !== "resume") || typeof file !== "string" || !file) {
      return res.status(400).json({ error: "Invalid upload payload." });
    }

    const fileInfo = inspectDataUrl(file, type);
    if (!fileInfo.ok) return res.status(400).json({ error: fileInfo.error });

    const result = await uploadToCloudinary(file, type);
    return res.status(200).json({
      configured: true,
      secure_url: result.secure_url,
      optimized_url: result.secure_url,
      public_id: result.public_id,
      asset_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      version: result.version,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed" });
  }
}

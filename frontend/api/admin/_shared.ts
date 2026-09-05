import { z } from "zod";
import { createSupabaseAdminClient, getClientIp, getQueryValue, requireAdmin, checkRateLimit, type ApiRequest } from "../_utils.js";

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

type HandlerContext = {
  req: ApiRequest;
  res: ApiResponse;
  supabase: ReturnType<typeof createSupabaseAdminClient>;
};

type AdminHandler = (context: HandlerContext) => Promise<void>;

const optionalText = z.string().trim().max(500).nullable().optional();
const urlText = z.string().trim().max(1000).refine((value) => {
  if (!value) return true;
  try {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}, "Must be a valid HTTP(S) URL.").nullable().optional();

const assetUrlText = z.string().trim().max(1000).refine((value) => {
  if (!value) return true;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return true;
  try {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}, "Must be a valid HTTP(S) URL or a site-relative asset path.").nullable().optional();

export const idSchema = z.string().uuid();

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160),
  short_description: z.string().trim().min(1).max(300),
  description: z.string().trim().min(1).max(5000),
  category: z.string().trim().min(1).max(120),
  tech_stack: z.array(z.string().trim().min(1).max(80)).max(40).default([]),
  image_url: urlText,
  cloudinary_public_id: optionalText,
  live_url: urlText,
  github_url: urlText,
  featured: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(-10000).max(10000).default(0),
});

export const experienceSchema = z.object({
  role: z.string().trim().min(1).max(160),
  company: z.string().trim().min(1).max(160),
  type: z.string().trim().min(1).max(80),
  location: optionalText,
  start_date: z.string().trim().min(4).max(40),
  end_date: z.string().trim().max(40).nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().trim().min(1).max(5000),
  highlights: z.array(z.string().trim().min(1).max(300)).max(30).default([]),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(3000),
  features: z.array(z.string().trim().min(1).max(200)).max(30).default([]),
  starting_price: optionalText,
  icon: optionalText,
  sort_order: z.coerce.number().int().min(-10000).max(10000).default(0),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(1).max(160),
  role: optionalText,
  company: optionalText,
  quote: z.string().trim().min(1).max(3000),
  avatar_url: urlText,
  rating: z.coerce.number().int().min(1).max(5).nullable().optional(),
});

export const profileSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().trim().min(1).max(160),
  title: z.string().trim().min(1).max(160),
  bio: z.string().trim().min(1).max(5000),
  location: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(254),
  phone: optionalText,
  linkedin_url: urlText,
  github_url: urlText,
  website_url: urlText,
  resume_url: assetUrlText,
});

const homeNavItemSchema = z.object({
  label: z.string().trim().min(1).max(80),
  to: z.string().trim().min(1).max(200),
});

const homeServiceItemSchema = z.object({
  number: z.string().trim().max(20),
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(1200),
});

const homeProjectItemSchema = z.object({
  number: z.string().trim().max(20),
  name: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(120),
  images: z.array(z.string().trim().max(1000)).max(10),
});

export const homeSchema = z.object({
  hero: z.object({
    nav: z.array(homeNavItemSchema).max(10),
    heading: z.string().trim().min(1).max(300),
    tagline: z.string().trim().min(1).max(1000),
    portrait_url: z.string().trim().max(1000),
    contact_label: z.string().trim().min(1).max(80),
  }),
  marquee: z.object({
    images: z.array(z.string().trim().max(1000)).max(40),
  }),
  about: z.object({
    heading: z.string().trim().min(1).max(300),
    body: z.string().trim().min(1).max(3000),
    decor: z.object({
      moon: z.string().trim().max(1000),
      object: z.string().trim().max(1000),
      lego: z.string().trim().max(1000),
      group: z.string().trim().max(1000),
    }),
  }),
  services: z.object({
    heading: z.string().trim().min(1).max(300),
    items: z.array(homeServiceItemSchema).max(20),
  }),
  projects: z.object({
    heading: z.string().trim().min(1).max(300),
    items: z.array(homeProjectItemSchema).max(20),
  }),
});

export const siteContentSchema = z.object({
  section_key: z.string().trim().min(1).max(120),
  media_url: urlText,
  optimized_url: urlText,
  media_public_id: optionalText,
  media_type: optionalText,
  media_format: optionalText,
  media_width: z.coerce.number().int().positive().nullable().optional(),
  media_height: z.coerce.number().int().positive().nullable().optional(),
  media_bytes: z.coerce.number().int().nonnegative().nullable().optional(),
  media_version: z.coerce.number().int().nonnegative().nullable().optional(),
});

export async function withAdmin(req: ApiRequest, res: ApiResponse, handler: AdminHandler) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit({ key: `admin:${ip}`, limit: 120, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.ok) {
    return res.status(429).json({ error: "Too many admin requests. Try again later.", retry_after: rateLimit.retryAfter });
  }

  const admin = await requireAdmin(req);
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error });

  try {
    await handler({ req, res, supabase: createSupabaseAdminClient() });
  } catch (error) {
    console.error("Admin API error:", error);
    res.status(500).json({ error: "Admin request failed" });
  }
}

export function getId(req: ApiRequest) {
  const id = getQueryValue(req, "id");
  const parsed = idSchema.safeParse(id);
  return parsed.success ? parsed.data : null;
}

export function rejectMethod(res: ApiResponse) {
  return res.status(405).json({ error: "Method not allowed" });
}

export function rejectValidation(res: ApiResponse) {
  return res.status(400).json({ error: "Invalid admin payload." });
}

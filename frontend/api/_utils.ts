import { createClient } from "@supabase/supabase-js";

export type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  socket?: {
    remoteAddress?: string;
  };
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type AdminCheck =
  | { ok: true; email: string }
  | { ok: false; status: number; error: string };

const rateLimitStore = new Map<string, RateLimitEntry>();

export function getHeader(req: ApiRequest, name: string) {
  const value = req.headers?.[name.toLowerCase()] ?? req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

export function getClientIp(req: ApiRequest) {
  const forwardedFor = getHeader(req, "x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.socket?.remoteAddress || "unknown";
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function getBearerToken(req: ApiRequest) {
  const authHeader = getHeader(req, "authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim() || null;
}

export function getAdminEmails() {
  // VITE_ADMIN_EMAILS is already exposed to the client to gate the admin UI.
  // Reuse it server-side when a separate ADMIN_EMAILS value was not configured,
  // while still validating every request with Supabase Auth below.
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(req: ApiRequest): Promise<AdminCheck> {
  const token = getBearerToken(req);
  if (!token) return { ok: false, status: 401, error: "Unauthorized" };

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const adminEmails = getAdminEmails();

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, status: 500, error: "Supabase auth is not configured on the server." };
  }

  if (adminEmails.length === 0) {
    return { ok: false, status: 500, error: "Admin email allowlist is not configured on the server." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();

  if (error || !email || !adminEmails.includes(email)) {
    return { ok: false, status: 403, error: "Forbidden" };
  }

  return { ok: true, email };
}

export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin credentials are not configured on the server.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getQueryValue(req: ApiRequest, name: string) {
  const value = req.query?.[name];
  return Array.isArray(value) ? value[0] : value;
}

import crypto from "crypto";
import { createSupabaseAdminClient } from "./_utils.js";

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  socket?: {
    remoteAddress?: string;
  };
  body?: {
    message?: string;
    session_id?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

const SYSTEM_RULES = (
  "You are the AI assistant for this portfolio. Answer only using the provided portfolio context. " +
  "If something is unknown, say that the owner has not provided that detail yet and suggest contacting them. " +
  "Never invent employment history, clients, metrics, awards, certifications, pricing, timelines, or years of experience."
);

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

async function getPortfolioContext() {
  const supabase = createSupabaseAdminClient();
  const [profile, services, skills, projects, experience] = await Promise.all([
    supabase.from("profiles").select("full_name,title,bio,location,email,linkedin_url,github_url").limit(1).maybeSingle(),
    supabase.from("services").select("title,description,features").order("sort_order"),
    supabase.from("skills").select("name,category").order("sort_order"),
    supabase.from("projects").select("title,short_description,category,tech_stack").order("sort_order"),
    supabase.from("experience").select("role,company,type,description,highlights,start_date,end_date,current").order("start_date", { ascending: false }),
  ]);

  const firstError = [profile.error, services.error, skills.error, projects.error, experience.error].find(Boolean);
  if (firstError) throw firstError;

  return {
    profile: profile.data,
    services: services.data ?? [],
    skills: skills.data ?? [],
    projects: projects.data ?? [],
    experience: experience.data ?? [],
  };
}

function parseBody(body: ApiRequest["body"] | string | undefined) {
  if (typeof body !== "string") return body || {};

  try {
    return JSON.parse(body) as ApiRequest["body"];
  } catch {
    return {};
  }
}

function getHeader(req: ApiRequest, name: string) {
  const value = req.headers?.[name.toLowerCase()] ?? req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function getClientIp(req: ApiRequest) {
  const forwardedFor = getHeader(req, "x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const limit = 20;
  const windowMs = 60 * 60 * 1000;
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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    return await handleChat(req, res);
  } catch (error) {
    console.error("Chat API failed:", error);
    return res.status(500).json({
      error: "The AI assistant is temporarily unavailable. Please try again later or use the contact form.",
      configured: false
    });
  }
}

async function handleChat(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`chat:${ip}`);
  if (!rateLimit.ok) {
    return res.status(429).json({ error: "Too many chat messages. Try again later.", retry_after: rateLimit.retryAfter });
  }

  const body = parseBody(req.body);
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const providedSessionId = typeof body.session_id === "string" ? body.session_id.trim() : undefined;

  if (!message || message.length > 1000) {
    return res.status(400).json({ error: "Please enter a message between 1 and 1000 characters." });
  }

  const session_id = providedSessionId?.slice(0, 120) || crypto.randomUUID();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      message: "The AI assistant needs a Gemini API key before it can answer dynamically. You can still use the contact page to ask about skills, projects, services, or availability.",
      session_id,
      configured: false
    });
  }

  let answer = "I could not produce an answer from the configured portfolio context.";
  const portfolioContext = await getPortfolioContext();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `${SYSTEM_RULES}\n\nPortfolio context JSON:\n${JSON.stringify(portfolioContext)}\n\nQuestion: ${message}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      const data = await response.json();
      answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || answer;
    } else {
      console.error("Gemini API error:", await response.text());
      answer = "The portfolio data is connected, but the AI provider did not return an answer. Please use the contact form for this question.";
    }
  } catch (exc) {
    console.error("Gemini API request failed", exc);
    answer = "The portfolio data is connected, but the AI provider did not return an answer. Please use the contact form for this question.";
  }

  return res.status(200).json({
    message: answer,
    session_id,
    configured: true
  });
}

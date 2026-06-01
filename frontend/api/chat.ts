import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { portfolioSnapshot } from "../src/data/portfolioSnapshot";

type ApiRequest = {
  method?: string;
  body?: {
    message?: string;
    session_id?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

type SupabaseQuery = {
  select: (columns?: string) => SupabaseQuery;
  limit: (count: number) => SupabaseQuery;
  maybeSingle: () => Promise<{ data: unknown }>;
};

type SupabaseTable = {
  select: (columns?: string) => SupabaseQuery & Promise<{ data: unknown[] | null }>;
  insert: (payload: unknown) => Promise<unknown>;
};

type SupabaseClientLike = {
  from: (table: string) => SupabaseTable;
};

const SYSTEM_RULES = (
  "You are the AI assistant for this portfolio. Answer only using the provided portfolio context. " +
  "If something is unknown, say that the owner has not provided that detail yet and suggest contacting them. " +
  "Never invent employment history, clients, metrics, awards, certifications, pricing, timelines, or years of experience."
);

type PortfolioContext = Pick<typeof portfolioSnapshot, "profile" | "projects" | "services" | "skills" | "experience">;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, session_id: providedSessionId } = req.body || {};
  const session_id = providedSessionId || crypto.randomUUID();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      message: "The AI assistant needs a Gemini API key before it can answer dynamically. You can still use the contact page to ask about skills, projects, services, or availability.",
      session_id,
      configured: false
    });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  let context: PortfolioContext = {
    profile: portfolioSnapshot.profile,
    projects: portfolioSnapshot.projects,
    services: portfolioSnapshot.services,
    skills: portfolioSnapshot.skills,
    experience: portfolioSnapshot.experience,
  };
  let supabase: SupabaseClientLike | null = null;

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey) as unknown as SupabaseClientLike;
    try {
      const [profileRes, projectsRes, servicesRes, skillsRes, expRes] = await Promise.all([
        supabase.from("profiles").select("*").limit(1).maybeSingle(),
        supabase.from("projects").select("*"),
        supabase.from("services").select("*"),
        supabase.from("skills").select("*"),
        supabase.from("experience").select("*"),
      ]);

      context = {
        profile: (profileRes.data as PortfolioContext["profile"] | null) || portfolioSnapshot.profile,
        projects: projectsRes.data?.length ? (projectsRes.data as PortfolioContext["projects"]) : portfolioSnapshot.projects,
        services: servicesRes.data?.length ? (servicesRes.data as PortfolioContext["services"]) : portfolioSnapshot.services,
        skills: skillsRes.data?.length ? (skillsRes.data as PortfolioContext["skills"]) : portfolioSnapshot.skills,
        experience: expRes.data?.length ? (expRes.data as PortfolioContext["experience"]) : portfolioSnapshot.experience,
      };
    } catch (e) {
      console.error("Failed to load context for Gemini:", e);
    }
  }

  let answer = "I could not produce an answer from the configured portfolio context.";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `${SYSTEM_RULES}\n\nPortfolio context JSON:\n${JSON.stringify(context)}\n\nQuestion: ${message}`;
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

  // Insert chat logs if Supabase is available
  if (supabase) {
    try {
      await supabase.from("chat_logs").insert([
        { session_id, role: "user", message: message ?? "" },
        { session_id, role: "assistant", message: answer }
      ]);
    } catch (e) {
      console.error("Could not insert chat logs", e);
    }
  }

  return res.status(200).json({
    message: answer,
    session_id,
    configured: true
  });
}

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { checkRateLimit, getClientIp, type ApiRequest as BaseApiRequest } from "./_utils.js";

type ApiRequest = BaseApiRequest & {
  body?: {
    name?: string;
    email?: string;
    purpose?: string;
    message?: string;
    website?: string;
    company?: string;
    budget?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  purpose: z.enum(["job", "freelance", "general"]),
  message: z.string().trim().min(20).max(2000),
  website: z.string().trim().max(200).optional(),
  company: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(80).optional(),
});

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.ok) {
    return res.status(429).json({ error: "Too many contact submissions. Try again later.", retry_after: rateLimit.retryAfter });
  }

  const parsed = contactSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Please check the form fields and try again." });
  }

  const { name, email, purpose, message, website, company, budget } = parsed.data;

  if (website) {
    return res.status(200).json({
      status: "error",
      message: "Spam protection rejected this submission.",
      email_sent: false,
      stored: false,
    });
  }

  const payload = { name, email, purpose, message, company, budget };
  let stored = false;
  let inquiry_id = null;

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from("contact_inquiries").insert(payload).select().single();
      if (!error && data) {
        stored = true;
        inquiry_id = data.id;
      }
    }
  } catch (e) {
    console.error("Supabase insert error:", e);
  }

  let email_sent = false;
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.CONTACT_RECEIVER_EMAIL || process.env.VITE_ADMIN_EMAILS || "danish90654@gmail.com",
        subject: `New Portfolio Inquiry: ${purpose}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`,
      });
      email_sent = true;
    }
  } catch (e) {
    console.error("Resend error:", e);
  }

  return res.status(200).json({
    status: stored && email_sent ? "success" : "partial_success",
    message: "Message processed.",
    inquiry_id,
    email_sent,
    stored,
  });
}

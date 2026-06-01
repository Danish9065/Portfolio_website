import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

type ApiRequest = {
  method?: string;
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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, purpose, message, website, company, budget } = req.body || {};

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

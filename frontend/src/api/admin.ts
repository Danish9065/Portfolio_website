import { supabase } from "../lib/supabaseAuth";
import type { ExperienceFormValues, HomeFormValues, Inquiry, ProfileFormValues, ProjectFormValues, ServiceFormValues, TestimonialFormValues } from "../types/admin";
import type { Experience, HomeContent, Profile, Project, Service, Testimonial } from "../types/api";

const checkSupabase = () => {
  if (!supabase) throw new Error("Supabase is not configured.");
};

export const listInquiries = async () => {
  checkSupabase();
  const { data, error } = await supabase!.from("contact_inquiries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Inquiry[];
};

export const createProject = async (payload: ProjectFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("projects").insert(payload).select().single();
  if (error) throw error;
  return data as Project;
};

export const updateProject = async (id: string, payload: ProjectFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("projects").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Project;
};

export const deleteProject = async (id: string) => {
  checkSupabase();
  const { error } = await supabase!.from("projects").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
};

export const createExperience = async (payload: ExperienceFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("experience").insert(payload).select().single();
  if (error) throw error;
  return data as Experience;
};

export const updateExperience = async (id: string, payload: ExperienceFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("experience").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Experience;
};

export const deleteExperience = async (id: string) => {
  checkSupabase();
  const { error } = await supabase!.from("experience").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
};

export const updateProfile = async (payload: ProfileFormValues) => {
  checkSupabase();
  const { data: existing } = await supabase!.from("profiles").select("id").limit(1).maybeSingle();
  if (existing) {
    const { data, error } = await supabase!.from("profiles").update(payload).eq("id", existing.id).select().single();
    if (error) throw error;
    return data as Profile;
  } else {
    const { data, error } = await supabase!.from("profiles").insert(payload).select().single();
    if (error) throw error;
    return data as Profile;
  }
};

export const createService = async (payload: ServiceFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("services").insert(payload).select().single();
  if (error) throw error;
  return data as Service;
};

export const updateService = async (id: string, payload: ServiceFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("services").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Service;
};

export const deleteService = async (id: string) => {
  checkSupabase();
  const { error } = await supabase!.from("services").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
};

export const createTestimonial = async (payload: TestimonialFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("testimonials").insert(payload).select().single();
  if (error) throw error;
  return data as Testimonial;
};

export const updateTestimonial = async (id: string, payload: TestimonialFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("testimonials").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Testimonial;
};

export const deleteTestimonial = async (id: string) => {
  checkSupabase();
  const { error } = await supabase!.from("testimonials").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
};

export const updateHomeContent = async (payload: HomeFormValues) => {
  checkSupabase();
  const { data, error } = await supabase!.from("site_settings").upsert({ key: "home", value: payload as unknown }, { onConflict: "key" }).select().single();
  if (error) throw error;
  return data.value as HomeContent;
};

export interface UploadResponse {
  configured: boolean;
  secure_url?: string;
  optimized_url?: string;
  public_id?: string;
  asset_type?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  version?: number;
  message?: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export async function uploadProjectImage(file: File) {
  const { data: { session } } = await supabase!.auth.getSession();
  const token = session?.access_token;
  const base64File = await fileToBase64(file);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ file: base64File, type: "image" })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Image upload failed");
  return data as UploadResponse;
}

export async function uploadResume(file: File) {
  const { data: { session } } = await supabase!.auth.getSession();
  const token = session?.access_token;
  const base64File = await fileToBase64(file);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ file: base64File, type: "resume" })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Resume upload failed");
  return data as UploadResponse;
}

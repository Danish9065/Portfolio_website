import { supabase } from "../lib/supabaseAuth";
import type { ExperienceFormValues, HomeFormValues, Inquiry, ProfileFormValues, ProjectFormValues, ServiceFormValues, TestimonialFormValues } from "../types/admin";
import type { Experience, HomeContent, Profile, Project, Service, SiteContentMedia, Testimonial } from "../types/api";

const checkSupabase = () => {
  if (!supabase) throw new Error("Supabase is not configured.");
};

async function adminFetch<T>(path: string, init: RequestInit = {}) {
  checkSupabase();
  const { data: { session } } = await supabase!.auth.getSession();
  const token = session?.access_token;

  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers
    }
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || data?.message || "Admin request failed";
    throw new Error(message);
  }

  return data as T;
}

export const listInquiries = async () => {
  return adminFetch<Inquiry[]>("/api/admin/inquiries");
};

export const createProject = async (payload: ProjectFormValues) => {
  return adminFetch<Project>("/api/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateProject = async (id: string, payload: ProjectFormValues) => {
  return adminFetch<Project>(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteProject = async (id: string) => {
  return adminFetch<{ ok: true }>(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
};

export const createExperience = async (payload: ExperienceFormValues) => {
  return adminFetch<Experience>("/api/admin/experience", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateExperience = async (id: string, payload: ExperienceFormValues) => {
  return adminFetch<Experience>(`/api/admin/experience?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteExperience = async (id: string) => {
  return adminFetch<{ ok: true }>(`/api/admin/experience?id=${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
};

export const updateProfile = async (payload: ProfileFormValues) => {
  return adminFetch<Profile>("/api/admin/profile", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const createService = async (payload: ServiceFormValues) => {
  return adminFetch<Service>("/api/admin/services", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateService = async (id: string, payload: ServiceFormValues) => {
  return adminFetch<Service>(`/api/admin/services?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteService = async (id: string) => {
  return adminFetch<{ ok: true }>(`/api/admin/services?id=${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
};

export const createTestimonial = async (payload: TestimonialFormValues) => {
  return adminFetch<Testimonial>("/api/admin/testimonials", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateTestimonial = async (id: string, payload: TestimonialFormValues) => {
  return adminFetch<Testimonial>(`/api/admin/testimonials?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteTestimonial = async (id: string) => {
  return adminFetch<{ ok: true }>(`/api/admin/testimonials?id=${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
};

export const updateHomeContent = async (payload: HomeFormValues) => {
  return adminFetch<HomeContent>("/api/admin/home", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const saveSiteContentMedia = async (payload: SiteContentMedia) => {
  return adminFetch<SiteContentMedia>("/api/admin/site-content", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
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

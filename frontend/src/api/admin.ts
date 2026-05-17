import { apiFetch } from "./client";
import { API_BASE_URL } from "../lib/constants";
import { getAccessToken } from "../lib/supabaseAuth";
import type { HomeFormValues, Inquiry, ProjectFormValues, ServiceFormValues, TestimonialFormValues } from "../types/admin";
import type { HomeContent } from "../types/api";
import type { Project, Service, Testimonial } from "../types/api";

async function authHeaders() {
  const token = await getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } as Record<string, string> : {};
}

export async function adminFetch<T>(path: string, init: RequestInit = {}) {
  const existingHeaders = init.headers instanceof Headers ? Object.fromEntries(init.headers.entries()) : (init.headers as Record<string, string> | undefined) ?? {};
  return apiFetch<T>(path, { ...init, headers: { ...(await authHeaders()), ...existingHeaders } });
}

export const listInquiries = () => adminFetch<Inquiry[]>("/api/admin/inquiries");
export const createProject = (payload: ProjectFormValues) =>
  adminFetch<Project>("/api/admin/projects", { method: "POST", body: JSON.stringify(payload) });
export const updateProject = (id: string, payload: ProjectFormValues) =>
  adminFetch<Project>(`/api/admin/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteProject = (id: string) => adminFetch<{ ok: boolean }>(`/api/admin/projects/${id}`, { method: "DELETE" });
export const createService = (payload: ServiceFormValues) =>
  adminFetch<Service>("/api/admin/services", { method: "POST", body: JSON.stringify(payload) });
export const updateService = (id: string, payload: ServiceFormValues) =>
  adminFetch<Service>(`/api/admin/services/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteService = (id: string) => adminFetch<{ ok: boolean }>(`/api/admin/services/${id}`, { method: "DELETE" });
export const createTestimonial = (payload: TestimonialFormValues) =>
  adminFetch<Testimonial>("/api/admin/testimonials", { method: "POST", body: JSON.stringify(payload) });
export const updateTestimonial = (id: string, payload: TestimonialFormValues) =>
  adminFetch<Testimonial>(`/api/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteTestimonial = (id: string) =>
  adminFetch<{ ok: boolean }>(`/api/admin/testimonials/${id}`, { method: "DELETE" });
export const updateHomeContent = (payload: HomeFormValues) =>
  adminFetch<HomeContent>("/api/admin/home", { method: "PUT", body: JSON.stringify(payload) });

export interface UploadResponse {
  configured: boolean;
  secure_url?: string;
  public_id?: string;
  message?: string;
}

export async function uploadProjectImage(file: File) {
  const token = await getAccessToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData
  });
  const data = (await response.json()) as UploadResponse | { detail?: string };

  if (!response.ok) {
    throw new Error("detail" in data ? data.detail : "Image upload failed");
  }

  return data as UploadResponse;
}

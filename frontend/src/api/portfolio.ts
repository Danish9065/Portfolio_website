import { supabase } from "../lib/supabaseAuth";
import type { Experience, HomeContent, Profile, Project, Service, Skill, Testimonial } from "../types/api";

function requireSupabase() {
  if (!supabase) throw new Error("Portfolio data service is not configured.");
  return supabase;
}

export const getHomeContent = async (): Promise<HomeContent> => {
  const response = await fetch("/api/home");
  if (!response.ok) throw new Error("Home content could not be loaded.");
  return response.json() as Promise<HomeContent>;
};

export const getProfile = async (): Promise<Profile> => {
  const { data, error } = await requireSupabase().from("profiles").select("*").limit(1).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Portfolio profile is not configured.");
  return data as Profile;
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await requireSupabase().from("projects").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as Project[];
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const { data, error } = await requireSupabase().from("projects").select("*").eq("slug", slug).single();
  if (error || !data) throw new Error("Project not found");
  return data as Project;
};

export const getSkills = async (): Promise<Skill[]> => {
  const { data, error } = await requireSupabase().from("skills").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as Skill[];
};

export const getExperience = async (): Promise<Experience[]> => {
  const { data, error } = await requireSupabase().from("experience").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Experience[];
};

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await requireSupabase().from("services").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as Service[];
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await requireSupabase().from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Testimonial[];
};

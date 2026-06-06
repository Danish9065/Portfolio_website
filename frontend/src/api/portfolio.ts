import { supabase } from "../lib/supabaseAuth";
import type { Experience, HomeContent, Profile, Project, Service, Skill, Testimonial } from "../types/api";
import { portfolioSnapshot } from "../data/portfolioSnapshot";

export const getHomeContent = async (): Promise<HomeContent> => {
  const response = await fetch("/api/home");
  if (!response.ok) throw new Error("Home content could not be loaded.");
  return response.json() as Promise<HomeContent>;
};

export const getProfile = async (): Promise<Profile> => {
  if (!supabase) return portfolioSnapshot.profile;
  const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
  return (data as Profile) || portfolioSnapshot.profile;
};

export const getProjects = async (): Promise<Project[]> => {
  if (!supabase) return portfolioSnapshot.projects;
  const { data } = await supabase.from("projects").select("*").order("sort_order");
  return data?.length ? (data as Project[]) : portfolioSnapshot.projects;
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  if (!supabase) {
    const project = portfolioSnapshot.projects.find(p => p.slug === slug);
    if (!project) throw new Error("Project not found");
    return project;
  }
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
  if (!data) throw new Error("Project not found");
  return data as Project;
};

export const getSkills = async (): Promise<Skill[]> => {
  if (!supabase) return portfolioSnapshot.skills;
  const { data } = await supabase.from("skills").select("*").order("sort_order");
  return data?.length ? (data as Skill[]) : portfolioSnapshot.skills;
};

export const getExperience = async (): Promise<Experience[]> => {
  if (!supabase) return portfolioSnapshot.experience;
  const { data } = await supabase.from("experience").select("*").order("created_at", { ascending: false });
  return data?.length ? (data as Experience[]) : portfolioSnapshot.experience;
};

export const getServices = async (): Promise<Service[]> => {
  if (!supabase) return portfolioSnapshot.services;
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return data?.length ? (data as Service[]) : portfolioSnapshot.services;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  if (!supabase) return portfolioSnapshot.testimonials;
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  return data?.length ? (data as Testimonial[]) : portfolioSnapshot.testimonials;
};

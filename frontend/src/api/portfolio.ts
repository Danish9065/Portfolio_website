import { apiFetch } from "./client";
import type { Experience, HomeContent, Profile, Project, Service, Skill, Testimonial } from "../types/api";

export const getHomeContent = () => apiFetch<HomeContent>("/api/home");
export const getProfile = () => apiFetch<Profile>("/api/profile");
export const getProjects = () => apiFetch<Project[]>("/api/projects");
export const getProjectBySlug = (slug: string) => apiFetch<Project>(`/api/projects/slug/${slug}`);
export const getSkills = () => apiFetch<Skill[]>("/api/skills");
export const getExperience = () => apiFetch<Experience[]>("/api/experience");
export const getServices = () => apiFetch<Service[]>("/api/services");
export const getTestimonials = () => apiFetch<Testimonial[]>("/api/testimonials");

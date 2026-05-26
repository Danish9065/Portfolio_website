import type { Experience, HomeContent, Profile, Project, Service, Testimonial } from "./api";

export type ProjectFormValues = Omit<Project, "id"> & { id?: string };
export type ExperienceFormValues = Omit<Experience, "id"> & { id?: string };
export type ServiceFormValues = Omit<Service, "id"> & { id?: string };
export type TestimonialFormValues = Omit<Testimonial, "id"> & { id?: string };
export type HomeFormValues = HomeContent;
export type ProfileFormValues = Profile;

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  purpose: string;
  company?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  created_at: string;
}

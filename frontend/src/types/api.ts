export type Audience = "recruiter" | "client";

export interface Profile {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  website_url?: string | null;
  resume_url?: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number | null;
  icon?: string | null;
  sort_order: number;
  is_featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: string;
  tech_stack: string[];
  image_url?: string | null;
  cloudinary_public_id?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  featured: boolean;
  sort_order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  starting_price?: string | null;
  icon?: string | null;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  quote: string;
  avatar_url?: string | null;
  rating?: number | null;
}

export interface SiteContentMedia {
  id?: string | null;
  section_key: string;
  media_url?: string | null;
  optimized_url?: string | null;
  media_public_id?: string | null;
  media_type?: string | null;
  media_format?: string | null;
  media_width?: number | null;
  media_height?: number | null;
  media_bytes?: number | null;
  media_version?: number | null;
  updated_at?: string | null;
}

export interface HomeNavItem {
  label: string;
  to: string;
}

export interface HomeHeroContent {
  nav: HomeNavItem[];
  heading: string;
  tagline: string;
  portrait_url: string;
  contact_label: string;
}

export interface HomeAboutContent {
  heading: string;
  body: string;
  decor: {
    moon: string;
    object: string;
    lego: string;
    group: string;
  };
}

export interface HomeServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface HomeProjectItem {
  number: string;
  name: string;
  category: string;
  images: string[];
}

export interface HomeContent {
  hero: HomeHeroContent;
  marquee: {
    images: string[];
  };
  about: HomeAboutContent;
  services: {
    heading: string;
    items: HomeServiceItem[];
  };
  projects: {
    heading: string;
    items: HomeProjectItem[];
  };
}

export interface ContactPayload {
  name: string;
  email: string;
  purpose: "job" | "freelance" | "general";
  company?: string;
  budget?: string;
  message: string;
  website?: string;
}

export interface ContactResponse {
  status: "success" | "partial_success" | "error";
  message: string;
  inquiry_id?: string | null;
  email_sent: boolean;
  stored: boolean;
}

export interface ChatResponse {
  message: string;
  session_id: string;
  configured: boolean;
}

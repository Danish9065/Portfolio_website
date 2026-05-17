create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text not null,
  bio text not null,
  location text not null,
  email text not null,
  phone text,
  linkedin_url text,
  github_url text,
  website_url text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level int,
  icon text,
  sort_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text not null,
  description text not null,
  category text not null,
  tech_stack text[] not null default '{}',
  image_url text,
  cloudinary_public_id text,
  live_url text,
  github_url text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  type text not null,
  location text,
  start_date date not null,
  end_date date,
  current boolean not null default false,
  description text not null,
  highlights text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  features text[] not null default '{}',
  starting_price text,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  rating int,
  created_at timestamptz not null default now()
);

create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  purpose text not null check (purpose in ('job', 'freelance', 'general')),
  company text,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists chat_leads (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  name text,
  email text,
  purpose text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table services enable row level security;
alter table testimonials enable row level security;
alter table contact_inquiries enable row level security;
alter table chat_leads enable row level security;
alter table chat_logs enable row level security;
alter table site_settings enable row level security;

create policy "Public read profiles" on profiles for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read experience" on experience for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);

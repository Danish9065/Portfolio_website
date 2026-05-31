create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  media_url text,
  optimized_url text,
  media_public_id text,
  media_type text,
  media_format text,
  media_width integer,
  media_height integer,
  media_bytes bigint,
  media_version bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "Public read site content" on site_content for select using (true);

alter publication supabase_realtime add table site_content;

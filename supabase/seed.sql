insert into profiles (full_name, title, bio, location, email, linkedin_url, github_url)
values ('Demo Portfolio Owner', 'Full-stack Developer', 'Editable sample profile. Replace this before publishing.', 'Remote / Your City', 'hello@example.com', 'https://linkedin.com/', 'https://github.com/')
on conflict do nothing;

insert into skills (name, category, level, sort_order, is_featured) values
('React', 'Frontend', 90, 1, true),
('TypeScript', 'Frontend', 88, 2, true),
('FastAPI', 'Backend', 84, 3, true),
('PostgreSQL', 'Database', 82, 4, true),
('Supabase', 'Platform', 80, 5, true),
('Cloud integrations', 'Platform', 78, 6, true);

insert into projects (title, slug, short_description, description, category, tech_stack, featured, sort_order) values
('Sample Recruiter Dashboard', 'sample-recruiter-dashboard', 'Editable demo case study for hiring confidence.', 'Demo content. Replace with a real case study before publishing.', 'Full-stack', array['React','TypeScript','FastAPI','Supabase'], true, 1),
('Sample Client Portal', 'sample-client-portal', 'Editable demo project for client-facing delivery.', 'Demo content. Do not present as real client work.', 'SaaS', array['React','Python','PostgreSQL','Cloudinary'], true, 2),
('Sample AI Assistant', 'sample-ai-assistant', 'Editable demo showing grounded AI behavior.', 'Real AI behavior requires Gemini credentials and real context.', 'AI', array['Gemini','FastAPI','React','Supabase'], true, 3)
on conflict (slug) do nothing;

insert into experience (role, company, type, location, start_date, current, description, highlights) values
('Sample Full-stack Role', 'Editable Demo Company', 'Demo content', 'Remote', '2024-01-01', true, 'Replace with real experience, education, or certifications.', array['Built user-facing features','Integrated backend services','Improved documentation']);

insert into services (title, slug, description, features, starting_price, sort_order) values
('MVP build', 'mvp-build', 'Plan, design, and build a focused web app.', array['Product scoping','Full-stack implementation','Deployment guidance'], 'Quote after scope', 1),
('Frontend polish', 'frontend-polish', 'Improve UX, performance, accessibility, and visual quality.', array['Responsive UI','Design system cleanup','Build verification'], 'Quote after audit', 2),
('API integrations', 'api-integrations', 'Wire real services without exposing secrets.', array['Backend-owned secrets','Error handling','Documentation'], 'Quote after review', 3)
on conflict (slug) do nothing;

insert into testimonials (name, role, quote) values
('Demo testimonial', 'Replace before publishing', 'This is clearly marked sample testimonial content. Replace it with a real permissioned quote.'),
('Demo reviewer', 'Editable sample', 'Use this area only for real client, employer, or collaborator feedback once available.');

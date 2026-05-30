insert into profiles (full_name, title, bio, location, email, linkedin_url, github_url)
values ('Danish MD', 'Full-stack Developer', 'Full-stack developer focused on building practical, reliable, and polished digital products.', 'India', '', null, null)
on conflict do nothing;

insert into skills (name, category, level, sort_order, is_featured) values
('React', 'Frontend', 90, 1, true),
('TypeScript', 'Frontend', 88, 2, true),
('FastAPI', 'Backend', 84, 3, true),
('PostgreSQL', 'Database', 82, 4, true),
('Supabase', 'Platform', 80, 5, true),
('Cloud integrations', 'Platform', 78, 6, true);

insert into projects (title, slug, short_description, description, category, tech_stack, featured, sort_order) values
('Portfolio Website', 'portfolio-website', 'A responsive portfolio experience with project pages, contact flows, and admin-managed content.', 'A full-stack portfolio built to present skills, services, project work, and contact paths in a clear production experience.', 'Full-stack', array['React','TypeScript','FastAPI','Supabase'], true, 1),
('Client Portal Concept', 'client-portal-concept', 'A structured portal concept for requests, collaboration, assets, and delivery tracking.', 'A product concept showing how client requests, assets, project status, and delivery workflows can be organized in one place.', 'SaaS', array['React','Python','PostgreSQL','Cloudinary'], true, 2),
('Portfolio AI Assistant', 'portfolio-ai-assistant', 'A portfolio chat assistant designed to answer questions from structured project and profile context.', 'An AI-assisted portfolio feature that responds from available profile, project, service, and experience content.', 'AI', array['Gemini','FastAPI','React','Supabase'], true, 3)
on conflict (slug) do nothing;

insert into services (title, slug, description, features, starting_price, sort_order) values
('MVP build', 'mvp-build', 'Plan, design, and build a focused web app.', array['Product scoping','Full-stack implementation','Deployment guidance'], 'Quote after scope', 1),
('Frontend polish', 'frontend-polish', 'Improve UX, performance, accessibility, and visual quality.', array['Responsive UI','Design system cleanup','Build verification'], 'Quote after audit', 2),
('API integrations', 'api-integrations', 'Wire real services without exposing secrets.', array['Backend-owned secrets','Error handling','Documentation'], 'Quote after review', 3)
on conflict (slug) do nothing;

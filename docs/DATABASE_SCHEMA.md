# Database Schema

Tables:

- `profiles`
- `skills`
- `projects`
- `experience`
- `services`
- `testimonials`
- `contact_inquiries`
- `chat_leads`
- `chat_logs`
- `site_settings`

RLS is enabled for all tables. Public read policies are created only for public content tables. Sensitive inserts and admin writes are intended to go through the backend with the Supabase service role key.

# Architecture

Frontend:

- Vite React app in `frontend/`.
- React Router owns page routing.
- TanStack Query fetches API data.
- Supabase JS is used only for admin authentication.
- No service-role keys or external API secrets are exposed to the browser.

Backend:

- FastAPI app in `backend/app`.
- Public portfolio reads go through `/api/*`.
- Sensitive writes, uploads, email, and AI calls happen server-side.
- Admin mutation routes require a Supabase Auth bearer token.

Database:

- Supabase PostgreSQL schema lives in `supabase/migrations/001_initial_schema.sql`.
- Seed content is clearly editable demo data.

Integration boundaries:

- Supabase stores content, inquiries, chat logs, and admin-managed records.
- Cloudinary uploads media through protected backend endpoints.
- Resend sends owner notifications through the backend only.
- Gemini answers only from supplied portfolio context.

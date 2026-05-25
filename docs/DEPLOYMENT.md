# Deployment

Frontend:

- Deploy `frontend/` to Vercel or Netlify.
- Set `VITE_API_BASE_URL` to the deployed backend URL.
- Set Supabase frontend env vars if admin login should work.

Backend:

- Deploy `backend/` to Render, Railway, Fly.io, or another ASGI host.
- Python runtime is pinned in `.python-version`. On Render, also set `PYTHON_VERSION=3.13.9`.
- Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT --app-dir backend`
- Configure backend env vars from `backend/.env.example`.
- Add every deployed frontend origin to `FRONTEND_ORIGIN` or `APP_FRONTEND_URL`; comma-separated origins are supported.

Supabase:

- `SUPABASE_URL` must be the full project URL, for example `https://your-project-ref.supabase.co`.
- Apply every migration in `supabase/migrations/` to the same Supabase project used by `SUPABASE_URL`.
- Run `supabase/seed.sql` or add real content through the admin UI.
- Create an Auth user for admin login.
- Check `/api/ready` after deployment. It should return `ok: true` before launch.

Cloudinary, Resend, Gemini:

- Add credentials only to backend env vars.
- `GEMINI_MODEL` defaults to `gemini-2.5-flash`.

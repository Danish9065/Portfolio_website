# Portfolio Web App

Production-style full-stack portfolio for recruiters and freelance clients.

## Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod, Framer Motion, React Three Fiber, Drei, Lucide.
- Backend: FastAPI, Pydantic, Supabase Python client, Cloudinary SDK, Resend HTTP API, Gemini HTTP API.
- Data: Supabase PostgreSQL with migration and seed files.

## Local Setup

```bash
npm --prefix frontend install
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Copy env files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Run:

```bash
npm --prefix frontend run dev
uvicorn app.main:app --reload --app-dir backend
```

Frontend: `http://localhost:5173`
Backend health: `http://localhost:8000/api/health`

## Credentials

Without credentials, public pages use editable demo fallback data. Contact, admin, uploads, email, and AI return honest configured/unconfigured states.

Backend-only secrets:

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `GEMINI_API_KEY`

Frontend may only receive:

- `VITE_API_BASE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`

## Supabase

Run `supabase/migrations/001_initial_schema.sql`, then `supabase/seed.sql`.

Create an admin user in Supabase Auth. The frontend signs in with Supabase Auth, then sends the access token to FastAPI for protected admin operations.

Supabase free projects can pause after one week of inactivity. This repo includes a keep-alive script that performs a small public read against the `profiles` table:

```bash
npm run supabase:keepalive
```

The script reads `SUPABASE_URL` plus `SUPABASE_ANON_KEY` from the environment, or from `backend/.env` / `frontend/.env` during local runs. The GitHub Actions workflow in `.github/workflows/supabase-keepalive.yml` runs it every three days; add these repository secrets before enabling it:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Verification

```bash
npm --prefix frontend run build
npm --prefix frontend run lint
PYTHONPATH=backend pytest backend/tests
```

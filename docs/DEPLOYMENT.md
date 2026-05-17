# Deployment

Frontend:

- Deploy `frontend/` to Vercel or Netlify.
- Set `VITE_API_BASE_URL` to the deployed backend URL.
- Set Supabase frontend env vars if admin login should work.

Backend:

- Deploy `backend/` to Render, Railway, Fly.io, or another ASGI host.
- Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Configure backend env vars from `backend/.env.example`.

Supabase:

- Apply migration and seed.
- Create an Auth user for admin login.

Cloudinary, Resend, Gemini:

- Add credentials only to backend env vars.

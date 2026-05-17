# AI Features

The floating chat widget calls `POST /api/chat`.

The backend gathers portfolio context from Supabase or demo fallback data, then sends the context and user question to Gemini if `GEMINI_API_KEY` is configured.

If Gemini is missing, the backend returns a clear fallback message and does not fake an AI answer.

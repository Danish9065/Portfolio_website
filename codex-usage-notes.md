# Codex Usage Notes

## How to use

- Paste the main prompt into Codex as the primary build instruction.
- If Codex starts simplifying the app into a static portfolio only, restate that the project must be a **real web app** with Vite frontend, Python backend, Supabase, Cloudinary, Resend, and Gemini integrations.
- Ask Codex to work in phases: scaffold, frontend core, backend core, integrations, docs, QA.
- Keep each follow-up command focused on one phase so the implementation stays accurate and testable.
- After each phase, ask Codex to run the relevant checks before moving on.

## Good follow-up commands

- "Start by generating the full repo structure and package files."
- "Now implement the frontend layout, routing, theme, and hero with recruiter/client segmentation."
- "Now implement the FastAPI backend routes and integration service layers."
- "Now wire the contact form to Supabase and Resend with honest error handling."
- "Now wire the Gemini chatbot through the backend with anti-hallucination guardrails."
- "Now implement the protected admin dashboard for projects and inquiries."
- "Now write the markdown docs so they match the implemented code exactly."
- "Now run a consistency pass and remove any fake placeholders or dead code."
- "Now run frontend and backend verification commands and fix any errors."

## Reject the output if

- it becomes frontend-only with missing backend integration
- it exposes API keys in client code
- it shows fake email or chatbot success states
- it hardcodes fake clients, fake employers, or fake metrics as if they are real
- docs claim features that are not implemented
- environment setup is broken
- there is no recruiter/client segmentation
- 3D UI hurts readability or performance
- admin routes are public or only protected in the frontend
- the app cannot run locally after following the README

## Good upgrade ideas

- admin markdown editor for case studies
- recruiter FAQ suggestions based on your profile data
- meeting request workflow
- downloadable vCard
- lead tagging in Supabase
- event analytics hooks
- case study builder with image blocks and outcome fields
- AI-assisted project matching for recruiters and clients
- resume version selector for different role types
- contact intent scoring for inquiries

## My extra guidance

- Build the first version for trust, not feature count. A polished app with honest integrations beats a huge app full of fake surfaces.
- Keep demo content clearly labeled, then replace it with your real profile before sharing the portfolio publicly.
- When Codex generates code, ask it to explain which features need real API keys and which features work in demo mode.
- Use the admin dashboard only for content that genuinely changes often. Static brand copy can live in seed files or config until the project matures.
- Prioritize a clean local setup. If future you cannot run it easily, recruiters and clients will never see the polish.

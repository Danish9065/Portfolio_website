# Master Prompt: Build a Premium Full-Stack Portfolio Web App

Use this prompt exactly as the implementation brief.

You are a senior full-stack engineer, product designer, UX strategist, and technical architect. Build a **production-ready professional portfolio web application** for a developer/freelancer/job-seeker who wants to attract both **recruiters/hiring teams** and **freelance clients**.

The final output must be a **real runnable full-stack codebase**, not a mockup, not pseudocode, not a static landing page, and not a skeleton. The app should feel premium, trustworthy, technically serious, visually memorable, and ready to customize with real personal data.

Every feature included must either:
- be fully implemented and wired end-to-end, or
- be clearly marked in code and documentation as intentionally disabled until credentials are provided.

Do **not** hallucinate APIs, imports, SDK methods, package names, file paths, finished integrations, fake data pipelines, fake email sending, fake AI behavior, fake upload flows, fake dashboards, fake analytics, fake testimonials, fake employers, fake achievements, fake metrics, fake production URLs, or fake working code.

Before using a library method, verify it from installed package behavior, official conventions, or existing documentation in the repo. If unsure, implement the integration through plain HTTP requests instead of inventing SDK calls. Do not claim a feature works unless it is actually implemented.

---

## Product Goal

Create **one professional portfolio web app** that serves two audiences:

1. **Recruiters / hiring teams / companies**
   - They should quickly understand skills, experience, projects, resume, achievements, role fit, current availability, and how to contact/interview.

2. **Clients / freelance buyers**
   - They should quickly understand services, case studies, process, credibility, engagement style, pricing approach, and how to request work.

This is **one website**, not two disconnected sites or two codebases. The UX must contain two clear entry paths:
- **Hire Me for a Job**
- **Work With Me as a Client**

Also support equivalent audience labels where useful:
- **For Recruiters**
- **For Clients**

Use segmented experiences inside one app. Good patterns include:
- segmented hero CTA buttons
- recruiter/client mode switch persisted in app state
- targeted sections that update based on selected audience
- route or scroll behavior that highlights relevant content

The website should feel like a **premium productized personal brand web app**, not a generic portfolio template.

---

## Core Quality Bar

The final app should feel like a strong developer could use it immediately after inserting real data, resume, credentials, and project assets.

It should be:
- professional
- attention seeking without being gimmicky
- premium
- credible
- product-level polished
- technically serious
- fast and responsive
- accessible
- easy to scan in under 30 seconds
- visually memorable without being messy

The final result must include:
- working frontend
- working backend
- Supabase schema and seed data
- real integration code paths for Supabase, Cloudinary, Resend, and Gemini
- graceful fallback behavior when external credentials are missing
- documentation that matches the actual implementation
- environment examples
- clear setup and deployment instructions

---

## Non-Negotiable Rules

1. Do not use fake APIs.
2. Do not leave broken imports.
3. Do not expose secret keys in frontend code.
4. Do not rely on frontend-only security.
5. Do not leave admin write endpoints open.
6. Do not create placeholder buttons that do nothing unless clearly labeled disabled.
7. Do not write "TODO: implement later" for core features.
8. Do not invent production URLs.
9. Do not invent personal experience, achievements, employers, clients, metrics, awards, certifications, or testimonials and present them as real.
10. Do not build only the UI and ignore backend integrations.
11. Do not skip validation, loading states, empty states, success states, and error states.
12. Do not generate huge unnecessary files.
13. Do not add random packages without a clear purpose.
14. Do not create a generic portfolio template with superficial edits.
15. Do not say "complete" unless the code actually matches the claim.

Use editable demo/sample data only, and clearly mark it as replaceable demo content.

---

## Required Tech Stack

Use exactly this stack unless there is a strong technical blocker.

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- React Hook Form
- Zod
- TanStack Query for API calls
- Lucide React for icons

### Backend

- Python 3.11+
- FastAPI
- Uvicorn
- Pydantic
- Async-first structure where practical
- Supabase Python client
- Cloudinary Python SDK or secure HTTP integration
- Resend email API
- Gemini API for AI chatbot/features

### Database / Auth / Storage

- Supabase PostgreSQL for structured data
- Supabase Auth for admin login/authentication
- Row Level Security-ready schema
- Supabase tables for profile, projects, skills, services, experience, testimonials, messages, leads, chatbot data, site settings, and admin-related data where needed
- Cloudinary for media assets and resume upload/delivery where appropriate

### Deployment Targets

- Frontend: Vercel or Netlify
- Backend: Render, Railway, Fly.io, or any ASGI-friendly platform
- Database/Auth: Supabase
- Media: Cloudinary
- Email: Resend
- AI: Gemini

---

## Visual and UX Direction

Build a premium dark-first portfolio with:
- deep navy/black foundation
- refined neutral surfaces
- one polished accent color
- subtle gradients
- restrained glassmorphism
- soft shadows
- layered depth
- smooth hover effects
- professional spacing
- clean typography
- subtle neon accent glow where appropriate, but not childish
- elegant light and dark mode if practical
- asymmetric but disciplined layouts
- strong information hierarchy
- memorable 3D presence

Avoid:
- childish gaming-heavy visuals
- neon-only design
- loud rainbow gradients
- cheap template sections
- overly animated UI
- cluttered decorative effects
- fake loading states unless truly needed

The website must look like a modern mix of:
- premium developer portfolio
- startup-grade product website
- professional service business
- technically polished software product

### 3D Requirements

Use React Three Fiber and Drei for tasteful 3D.

Acceptable 3D usage:
- 3D animated hero background or identity object
- subtle floating geometric object
- interactive laptop/device/project showcase
- abstract AI/full-stack neural mesh
- depth/parallax accents on project cards
- subtle animated 3D elements that support the brand

3D must:
- not block readability
- not distract from conversion goals
- perform well on mid-range laptops and phones
- degrade gracefully on low-power devices
- respect `prefers-reduced-motion`
- not harm Core Web Vitals

---

## Core Pages and Routes

Public routes:
- `/`
- `/about`
- `/projects`
- `/projects/:slug`
- `/experience`
- `/services`
- `/resume`
- `/testimonials`
- `/contact`

Admin routes:
- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/inquiries`
- `/admin/services`
- `/admin/testimonials`

Main navigation should include:
- Home
- About
- Projects
- Experience
- Services
- Resume
- Testimonials
- Contact
- Optional Admin

Also include a floating AI chat assistant available across public pages.

---

## Frontend Feature Requirements

### 1. Home / Premium Landing Experience

Build a high-impact first screen with:
- professional headline
- short intro
- availability status
- location
- current role/status
- 3D animated background or 3D object
- two primary CTA buttons:
  - Hire Me for a Job
  - Work With Me as a Client
- equivalent recruiter/client segmented UX where useful
- animated skill badges
- featured projects
- social links
- resume download button
- client/employer split section
- clean responsive layout

### 2. About Page

Include:
- profile summary
- skills
- tools and technologies
- work values
- professional timeline
- education section
- achievement highlights
- tech stack clusters
- downloadable resume link from frontend public assets or Cloudinary

### 3. Projects Page

Include:
- grid of projects
- featured projects
- filter by category
- search/filter by stack, domain, type, or keyword
- project cards with image, title, description, tech stack, live link, GitHub link
- project detail modal or routed detail page
- case-study format where possible:
  - problem
  - role
  - stack
  - process
  - result
- screenshots/images from Cloudinary URLs stored in Supabase
- optional admin-managed project data from Supabase

### 4. Experience Page

Include:
- work history
- internships
- freelance experience
- education/certifications
- professional timeline
- download resume button
- employer-focused summary

### 5. Services Page

Include:
- service cards
- services offered
- engagement process
- project types
- turnaround / collaboration model
- pricing optional
- "Request Quote" CTA
- service inquiry form or contact CTA

### 6. Resume Page

Include:
- resume preview section
- download resume
- recruiter-focused summary
- preferred roles
- strengths
- experience snapshot
- contact/interview CTA

### 7. Testimonials Page

Include:
- client/employer testimonials
- animated testimonial cards
- optional logos or project/client names
- Supabase-backed data where possible
- clearly marked demo testimonials if sample data is used

### 8. Contact Page and Smart Contact Flow

Build a real contact flow:
- frontend form with validation using React Hook Form + Zod
- backend API endpoint
- save inquiry to Supabase
- send acknowledgement email to sender via Resend
- send notification email to owner via Resend
- user-friendly success/error/partial-success states
- spam protection strategy such as honeypot, backend validation, and rate limiting if feasible

Contact form fields:
- name
- email
- purpose: job / freelance / general
- company
- budget optional
- message

On submit:
- validate input
- save inquiry to Supabase
- send notification email using Resend
- optionally send confirmation email to visitor
- show success/failure/partial-success state honestly

If Resend API key is missing:
- save inquiry if Supabase is configured
- return success with an internal server log warning only where appropriate
- do not claim email was sent
- show a graceful and honest user-facing message if email delivery cannot be confirmed

### 9. AI Chat Assistant

Create a floating chatbot widget available on all pages.

The chatbot must:
- use Gemini API through the Python backend only
- never expose Gemini API key in frontend
- answer questions about:
  - skills
  - projects
  - experience
  - services
  - availability
  - contact details
- support recruiter and client intents
- guide employers and clients to the correct CTA
- use portfolio data from Supabase where possible
- derive context from structured local or database portfolio content
- optionally log conversations to Supabase
- store chat leads in Supabase when the user provides name/email/project details
- include safe fallback if Gemini API key is missing
- never invent owner experience or credentials

Gemini system instruction must enforce:

> You are the AI assistant for this portfolio. Answer only using the provided portfolio context. If something is unknown, say that the owner has not provided that detail yet and suggest contacting them.

Additional chatbot guardrails:
- answer only from supplied portfolio context and user question
- if context is missing, say the information is not available in the portfolio data
- never invent employment history, clients, metrics, awards, certifications, pricing, timelines, or years of experience
- never claim a project is deployed unless the project data says so
- use low temperature for factual answers
- include graceful error handling
- prefer structured context payloads:
  - profile JSON
  - projects JSON
  - services JSON
  - FAQs / knowledge snippets

### 10. Admin Dashboard / Content Management

Build a protected admin dashboard using Supabase Auth.

Admin can:
- add/edit/delete projects
- add/edit/delete skills
- add/edit/delete services
- add/edit/delete testimonials
- view contact inquiries
- update profile info where practical
- update resume URL where practical
- manage chatbot knowledge snippets where practical
- upload project images/resume files through backend to Cloudinary

If full CRUD is too large, implement at least:
- complete real CRUD for projects
- read-only inquiries
- protected auth flow
- documentation of remaining extensions

The admin dashboard must be real, not fake.

Admin rules:
- protected by Supabase Auth
- admin write operations must send an access token to backend
- backend must verify token before admin operations
- do not leave admin write endpoints open
- admin UI should be clean and professional

### 11. Analytics-Ready Structure

Add clean event hooks or architecture for future analytics:
- CTA clicks
- contact submissions
- recruiter/client audience selections
- chatbot lead captures

Do not fake an analytics dashboard unless it is actually wired.

---

## Frontend Components to Include

Create reusable, typed components such as:
- `Navbar`
- `Footer`
- `Hero3D`
- `CTAButtons`
- `SectionHeader`
- `ProjectCard`
- `SkillBadge`
- `ExperienceTimeline`
- `ServiceCard`
- `TestimonialCard`
- `ContactForm`
- `ChatWidget`
- `AdminLayout`
- `AdminProjectForm`
- `LoadingSpinner`
- `ErrorMessage`

Frontend expectations:
- clean component architecture
- reusable UI components
- typed DTOs/interfaces
- route structure
- API service layer
- TanStack Query for server state
- loading states
- empty states
- error states
- toast notifications
- accessible forms
- responsive design
- reduced-motion handling
- lazy loading where appropriate
- code splitting where useful

---

## Accessibility and Performance Requirements

Must include:
- semantic HTML
- keyboard navigation
- visible focus states
- accessible contrast
- alt text for images
- responsive design for desktop, tablet, and mobile
- reduced motion support where possible
- performance-conscious 3D
- graceful behavior when network/API calls fail

The app must be easy to scan in under 30 seconds. Important information must be visible quickly.

---

## Backend Architecture

Use FastAPI with clean structure.

Suggested structure:

```text
backend/
  app/
    main.py
    core/
      config.py
      security.py
    api/
      routes/
        health.py
        portfolio.py
        contact.py
        chat.py
        uploads.py
        admin_projects.py
    services/
      supabase_service.py
      cloudinary_service.py
      resend_service.py
      gemini_service.py
    schemas/
      contact.py
      chat.py
      project.py
    models/
    utils/
  requirements.txt
  .env.example
```

Backend standards:
- env-based config
- CORS config for frontend origin
- Pydantic validation
- clean error handling
- structured logging
- no hardcoded secrets
- rate limiting for chat/contact if feasible
- modular services
- typed schemas
- integration clients for Supabase, Cloudinary, Resend, and Gemini
- proper exception handling

---

## Required API Endpoints

### Health

- `GET /api/health`

### Portfolio Data

- `GET /api/profile`
- `GET /api/projects`
- `GET /api/projects/{id}`
- `GET /api/projects/{slug}`
- `GET /api/skills`
- `GET /api/services`
- `GET /api/experience`
- `GET /api/testimonials`

### Contact

- `POST /api/contact`
  - validate input
  - save to Supabase
  - send owner notification through Resend
  - optionally send visitor acknowledgement
  - return success/partial-success/error response honestly

### AI

- `POST /api/chat`
  - input: message, optional session_id, optional visitor context
  - fetch relevant portfolio context from Supabase
  - call Gemini API securely from backend
  - return assistant response
  - never expose API key
  - if API key is missing, return helpful fallback message
  - optionally log conversation and leads

### Uploads

- `POST /api/uploads/image`
  - protected admin endpoint
  - upload image to Cloudinary
  - return secure URL and public ID

- `POST /api/uploads/resume`
  - protected admin endpoint
  - upload resume PDF to Cloudinary or configured storage
  - return secure URL

- `POST /api/upload`
  - acceptable consolidated upload endpoint if the implementation intentionally uses one route and documents it

### Admin

- protected project CRUD endpoints
- protected service/testimonial CRUD endpoints if practical
- `POST /api/admin/login` only if a custom login flow is used
- Supabase-auth based protected flow is preferred

Protect all write endpoints with Supabase Auth JWT verification. Do not leave admin operations public.

Frontend should call backend for sensitive operations. Public portfolio reads may go through backend endpoints.

---

## Supabase Database Requirements

Create SQL migration files and seed data.

Required files:
- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed.sql`

Seed data must be realistic demo data and clearly marked as editable sample content.

Use Supabase properly, not superficially.

### Required Tables

#### `profiles`

- `id uuid primary key`
- `full_name text`
- `title text`
- `bio text`
- `location text`
- `email text`
- `phone text nullable`
- `linkedin_url text nullable`
- `github_url text nullable`
- `website_url text nullable`
- `resume_url text nullable`
- `created_at timestamp`
- `updated_at timestamp`

#### `skills`

- `id uuid primary key`
- `name text`
- `category text`
- `level int nullable`
- `icon text nullable`
- `sort_order int`
- `is_featured boolean`
- `created_at timestamp`

#### `projects`

- `id uuid primary key`
- `title text`
- `slug text unique`
- `short_description text`
- `description text`
- `category text`
- `tech_stack text[]`
- `image_url text nullable`
- `cloudinary_public_id text nullable`
- `live_url text nullable`
- `github_url text nullable`
- `featured boolean`
- `sort_order int`
- `created_at timestamp`
- `updated_at timestamp`

#### `experience`

- `id uuid primary key`
- `role text`
- `company text`
- `type text`
- `location text nullable`
- `start_date date`
- `end_date date nullable`
- `current boolean`
- `description text`
- `highlights text[]`
- `created_at timestamp`

#### `services`

- `id uuid primary key`
- `title text`
- `slug text unique`
- `description text`
- `features text[]`
- `starting_price text nullable`
- `icon text nullable`
- `sort_order int`
- `created_at timestamp`

#### `testimonials`

- `id uuid primary key`
- `name text`
- `role text nullable`
- `company text nullable`
- `quote text`
- `avatar_url text nullable`
- `rating int nullable`
- `created_at timestamp`

#### `contact_inquiries`

- `id uuid primary key`
- `name text`
- `email text`
- `purpose text`
- `company text nullable`
- `budget text nullable`
- `message text`
- `status text default 'new'`
- `created_at timestamp`

#### `chat_leads`

- `id uuid primary key`
- `session_id text`
- `name text nullable`
- `email text nullable`
- `purpose text nullable`
- `message text nullable`
- `created_at timestamp`

### Additional Tables to Consider

Add if helpful and document them:
- `contact_messages`
- `chat_logs`
- `site_settings`
- `admin_users` if not relying only on Supabase Auth
- chatbot knowledge snippets / FAQs

### Security Rules

- Read-only public data can be accessible publicly.
- Contact inserts should happen through backend.
- Admin writes must be protected.
- Do not rely on frontend-only security.
- Row Level Security policies should be documented and implemented where practical.
- Never commit real API keys.
- Use `.env` files and `.env.example`.

---

## Integration Requirements

### Supabase

- Use Supabase Postgres for structured content.
- Use Supabase Auth for admin where practical.
- Backend should use service role only on server side.
- Frontend may use anon key only for safe auth/public reads if needed.
- Sensitive writes must be backend-driven.

### Cloudinary

- Uploads happen through backend.
- Store returned `secure_url` and `public_id` in Supabase.
- Do not upload directly from frontend with API secret.
- Use server-side secure upload or signed upload flow.
- Include fallback when credentials are missing.
- Do not hardcode asset URLs pretending uploads exist.

### Resend

- Email sending must happen through backend only.
- Use env vars.
- Support:
  - owner notification email
  - sender confirmation email
- Do not say email was sent unless the API actually succeeds.
- If DB save succeeds but email fails, return partial-success response and surface it honestly.

### Gemini

- Gemini calls must happen through backend only.
- Use low temperature for factual answers.
- Use grounded system prompt and structured portfolio context.
- Include safe fallback if the API key is missing.
- Do not fabricate unknown data.

---

## Environment Variables

Create `.env.example` files and document all variables.

### Root `.env.example`

Include project-level notes if useful.

### Frontend `.env.example`

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
```

Only include `VITE_CLOUDINARY_CLOUD_NAME` if needed for non-sensitive rendering.

### Backend `.env.example`

```env
APP_ENV=development
APP_FRONTEND_URL=http://localhost:5173
FRONTEND_ORIGIN=http://localhost:5173
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
SUPABASE_JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_RECEIVER_EMAIL=
OWNER_NOTIFICATION_EMAIL=
GEMINI_API_KEY=
JWT_SECRET=
```

Only use env vars that serve a real purpose. If duplicate variables are supported for compatibility, document which one is preferred.

Important:
- Supabase service role key, Cloudinary API secret, Resend API key, Gemini API key, JWT secret, and Supabase JWT secret must only be used on the backend.
- Do not expose secret keys to Vite frontend.
- Validate all backend inputs.

---

## Documentation Requirements

Create a serious `docs/` folder. Documentation must match the actual implementation.

Required docs:

1. `docs/PRODUCT_REQUIREMENTS.md`
   - app goal
   - target users: employers/recruiters and clients
   - feature list

2. `docs/DESIGN_PROMPT.md`
   - visual direction
   - 3D UI style
   - color palette
   - typography
   - animation guidelines
   - mobile design notes

3. `docs/DESIGN-SYSTEM.md`
   - color tokens
   - typography
   - spacing
   - motion principles
   - 3D usage rules
   - component patterns

4. `docs/ARCHITECTURE.md`
   - frontend/backend/database architecture
   - API flow
   - data flow
   - integration boundaries
   - security notes
   - how Supabase, Cloudinary, Resend, and Gemini connect

5. `docs/API_SPEC.md`
   - all API endpoints
   - request/response examples

6. `docs/API-CONTRACT.md`
   - endpoints
   - request/response shapes
   - error behavior

7. `docs/DATABASE_SCHEMA.md`
   - every table
   - relationships
   - RLS/security notes

8. `docs/SUPABASE-SCHEMA.md`
   - tables
   - fields
   - relationships
   - RLS guidance
   - seed strategy

9. `docs/AI_FEATURES.md`
   - chatbot behavior
   - Gemini prompt design
   - safe fallback behavior
   - how hallucinated answers are prevented

10. `docs/AI-GUARDRAILS.md`
    - Gemini grounding approach
    - system prompt rules
    - hallucination prevention
    - fallback/error handling

11. `docs/DEPLOYMENT.md`
    - local setup
    - frontend deployment on Vercel/Netlify
    - backend deployment on Render/Fly.io/Railway
    - Supabase setup
    - Cloudinary setup
    - Resend setup
    - required env vars

12. `docs/TESTING.md`
    - frontend testing
    - backend testing
    - manual QA checklist

13. `docs/ENVIRONMENT.md`
    - required env vars
    - examples
    - frontend vs backend variables
    - warnings about secret exposure

14. `docs/TODO.md`
    - only real remaining work
    - no fake completed claims

15. `docs/CONTENT-GUIDE.md`
    - how to update portfolio text
    - how to update projects
    - how to update services
    - how to update resume
    - how to update testimonials
    - how to update chatbot knowledge

### Main `README.md`

Include:
- project overview
- tech stack
- setup instructions
- environment variables
- commands to run frontend and backend
- Supabase migration instructions
- demo admin instructions
- deployment notes
- troubleshooting

Do not generate docs that describe features that do not exist.

---

## Expected Folder Structure

Use this structure or a very close equivalent:

```text
portfolio-webapp/
  frontend/
    src/
      components/
      pages/
      layouts/
      hooks/
      lib/
      api/
      types/
      assets/
      styles/
    public/
    package.json
    vite.config.ts
    tailwind.config.js
    index.html
    .env.example

  backend/
    app/
      main.py
      core/
        config.py
        security.py
      api/
        routes/
          health.py
          portfolio.py
          contact.py
          chat.py
          uploads.py
          admin_projects.py
      services/
        supabase_service.py
        cloudinary_service.py
        resend_service.py
        gemini_service.py
      schemas/
        contact.py
        chat.py
        project.py
      models/
      utils/
    requirements.txt
    .env.example

  supabase/
    migrations/
      001_initial_schema.sql
    seed.sql

  docs/
    PRODUCT_REQUIREMENTS.md
    DESIGN_PROMPT.md
    DESIGN-SYSTEM.md
    ARCHITECTURE.md
    API_SPEC.md
    API-CONTRACT.md
    DATABASE_SCHEMA.md
    SUPABASE-SCHEMA.md
    AI_FEATURES.md
    AI-GUARDRAILS.md
    DEPLOYMENT.md
    TESTING.md
    ENVIRONMENT.md
    TODO.md
    CONTENT-GUIDE.md

  README.md
  .env.example
```

---

## Implementation Quality Requirements

- Use TypeScript types.
- Use reusable frontend components.
- Use clean backend service layers.
- Add proper error handling.
- Add loading states.
- Add empty states.
- Add toast notifications.
- Add form validation.
- Add responsive design.
- Avoid hardcoded personal data except seed/demo data.
- Make all demo data easy to edit.
- Use accessible design.
- Use structured APIs/parsers instead of fragile string manipulation where practical.
- Keep implementation scoped and practical.
- Prefer existing official SDK conventions or plain HTTP over invented SDK behavior.

---

## Testing and Verification Requirements

After implementation, run and fix issues from:

### Frontend

- `npm install`
- `npm run build`
- `npm run lint` if configured
- practical route/component tests if setup is not too heavy

### Backend

- create Python virtual environment
- install requirements
- run import checks
- start FastAPI app
- test `GET /api/health`
- add backend API tests for contact/chat/health or key routes where practical
- add validation tests for schemas where practical

Do not finish until:
- the app has real working pages
- the backend has real FastAPI endpoints
- Supabase schema exists
- Cloudinary service is implemented
- Resend service is implemented
- Gemini service is implemented
- `.env.example` files exist
- docs exist
- README exists
- frontend build errors are fixed
- backend import errors are fixed
- key error paths have graceful behavior

Include a final manual QA checklist in docs.

---

## Implementation Plan

Follow this order:

1. Initialize frontend and backend projects.
2. Define folder architecture.
3. Set up Tailwind, routing, theme system, and design tokens.
4. Build shared layout and navigation.
5. Create homepage and segmented recruiter/client UX.
6. Implement projects, experience, services, resume, and testimonials pages.
7. Set up FastAPI backend with health/profile/projects/skills/experience/services/testimonials routes.
8. Integrate Supabase schema and seed flow.
9. Implement contact form end-to-end with Supabase and Resend.
10. Implement Gemini chatbot through backend with guardrails.
11. Add Cloudinary upload flow for admin/media.
12. Add admin/content management.
13. Add analytics-ready event hooks.
14. Write all docs to match actual code.
15. Validate responsiveness, accessibility, integrations, fallbacks, and error paths.
16. Run frontend and backend verification commands.
17. Provide final setup instructions, known limitations, and credential notes.

---

## Final Deliverable Response Format

At the end, provide:

1. Summary of what was built.
2. Project tree.
3. Exact commands to run locally.
4. Required environment variables.
5. What features are fully working.
6. What requires real API keys to fully test.
7. Any remaining limitations.
8. Testing/verification results.

Do not summarize features that were not implemented.
Do not say "complete" unless the implementation truly matches the claim.

from __future__ import annotations

from uuid import uuid4
from app.core.config import Settings


DEMO_PROFILE = {
    "id": "00000000-0000-4000-8000-000000000001",
    "full_name": "Demo Portfolio Owner",
    "title": "Full-stack Developer",
    "bio": "Editable sample profile for a developer portfolio. Replace this with real biography, role focus, and proof before publishing.",
    "location": "Remote / Your City",
    "email": "hello@example.com",
    "phone": None,
    "linkedin_url": "https://linkedin.com/",
    "github_url": "https://github.com/",
    "website_url": None,
    "resume_url": None,
}

DEMO_SKILLS = [
    {"id": "skill-react", "name": "React", "category": "Frontend", "level": 90, "icon": None, "sort_order": 1, "is_featured": True},
    {"id": "skill-typescript", "name": "TypeScript", "category": "Frontend", "level": 88, "icon": None, "sort_order": 2, "is_featured": True},
    {"id": "skill-fastapi", "name": "FastAPI", "category": "Backend", "level": 84, "icon": None, "sort_order": 3, "is_featured": True},
    {"id": "skill-postgres", "name": "PostgreSQL", "category": "Database", "level": 82, "icon": None, "sort_order": 4, "is_featured": True},
    {"id": "skill-supabase", "name": "Supabase", "category": "Platform", "level": 80, "icon": None, "sort_order": 5, "is_featured": True},
    {"id": "skill-cloud", "name": "Cloud integrations", "category": "Platform", "level": 78, "icon": None, "sort_order": 6, "is_featured": True},
]

DEMO_PROJECTS = [
    {
        "id": "project-portfolio",
        "title": "Sample Recruiter Dashboard",
        "slug": "sample-recruiter-dashboard",
        "short_description": "Editable demo case study showing how to present role fit, project evidence, and contact paths.",
        "description": "Demo project content. Replace this with a real case study covering problem, role, stack, process, and measurable result if available.",
        "category": "Full-stack",
        "tech_stack": ["React", "TypeScript", "FastAPI", "Supabase"],
        "image_url": None,
        "cloudinary_public_id": None,
        "live_url": None,
        "github_url": None,
        "featured": True,
        "sort_order": 1,
    },
    {
        "id": "project-client-portal",
        "title": "Sample Client Portal",
        "slug": "sample-client-portal",
        "short_description": "Editable demo project for client-facing delivery, collaboration, and request workflows.",
        "description": "Demo project content. Do not present this as a real client project until replaced with actual work.",
        "category": "SaaS",
        "tech_stack": ["React", "Python", "PostgreSQL", "Cloudinary"],
        "image_url": None,
        "cloudinary_public_id": None,
        "live_url": None,
        "github_url": None,
        "featured": True,
        "sort_order": 2,
    },
    {
        "id": "project-ai-assistant",
        "title": "Sample AI Assistant",
        "slug": "sample-ai-assistant",
        "short_description": "Editable demo showing grounded AI answers and clear fallback behavior.",
        "description": "Demo project content for an AI assistant. Real behavior depends on Gemini credentials and structured portfolio context.",
        "category": "AI",
        "tech_stack": ["Gemini", "FastAPI", "React", "Supabase"],
        "image_url": None,
        "cloudinary_public_id": None,
        "live_url": None,
        "github_url": None,
        "featured": True,
        "sort_order": 3,
    },
]

DEMO_EXPERIENCE = [
    {
        "id": "experience-demo",
        "role": "Sample Full-stack Role",
        "company": "Editable Demo Company",
        "type": "Demo content",
        "location": "Remote",
        "start_date": "2024-01-01",
        "end_date": None,
        "current": True,
        "description": "Replace this with real experience, internship, freelance, education, or certification details.",
        "highlights": ["Built user-facing features", "Integrated backend services", "Improved reliability and documentation"],
    }
]

DEMO_SERVICES = [
    {"id": "service-mvp", "title": "MVP build", "slug": "mvp-build", "description": "Plan, design, and build a focused web app from idea to deployable first version.", "features": ["Product scoping", "Full-stack implementation", "Deployment guidance"], "starting_price": "Quote after scope", "icon": None, "sort_order": 1},
    {"id": "service-frontend", "title": "Frontend polish", "slug": "frontend-polish", "description": "Improve UX, performance, accessibility, and visual quality for existing apps.", "features": ["Responsive UI", "Design system cleanup", "Build verification"], "starting_price": "Quote after audit", "icon": None, "sort_order": 2},
    {"id": "service-integration", "title": "API integrations", "slug": "api-integrations", "description": "Wire real services without exposing secrets or faking success states.", "features": ["Backend-owned secrets", "Error handling", "Documentation"], "starting_price": "Quote after integration review", "icon": None, "sort_order": 3},
]

DEMO_TESTIMONIALS = [
    {"id": "testimonial-demo-1", "name": "Demo testimonial", "role": "Replace before publishing", "company": None, "quote": "This is clearly marked sample testimonial content. Replace it with a real permissioned quote.", "avatar_url": None, "rating": None},
    {"id": "testimonial-demo-2", "name": "Demo reviewer", "role": "Editable sample", "company": None, "quote": "Use this area only for real client, employer, or collaborator feedback once available.", "avatar_url": None, "rating": None},
]

DEMO_HOME_CONTENT = {
    "hero": {
        "nav": [
            {"label": "About", "to": "/about"},
            {"label": "Price", "to": "/services"},
            {"label": "Projects", "to": "/projects"},
            {"label": "Contact", "to": "/contact"},
        ],
        "heading": "Hi, i'm danish",
        "tagline": "a 3d creator driven by crafting striking and unforgettable projects",
        "portrait_url": "/images/danish-portrait.png",
        "contact_label": "Contact Me",
    },
    "marquee": {
        "images": [
            "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
            "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
            "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
            "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
            "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
            "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
            "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
            "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
            "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
            "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
            "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
            "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
            "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
            "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
            "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
            "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
            "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
            "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
            "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
            "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
            "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
        ]
    },
    "about": {
        "heading": "About me",
        "body": "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
        "decor": {
            "moon": "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
            "object": "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
            "lego": "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
            "group": "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
        },
    },
    "services": {
        "heading": "Services",
        "items": [
            {"number": "01", "name": "3D Modeling", "description": "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."},
            {"number": "02", "name": "Rendering", "description": "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."},
            {"number": "03", "name": "Motion Design", "description": "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."},
            {"number": "04", "name": "Branding", "description": "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."},
            {"number": "05", "name": "Web Design", "description": "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."},
        ],
    },
    "projects": {
        "heading": "Project",
        "items": [
            {
                "number": "01",
                "name": "Nextlevel Studio",
                "category": "Client",
                "images": [
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
                ],
            },
            {
                "number": "02",
                "name": "Aura Brand Identity",
                "category": "Personal",
                "images": [
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
                ],
            },
            {
                "number": "03",
                "name": "Solaris Digital",
                "category": "Client",
                "images": [
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
                ],
            },
        ],
    },
}


class SupabaseService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._client = None

    @property
    def configured(self) -> bool:
        return self.settings.supabase_configured

    def client(self):
        if not self.configured:
            return None
        if self._client is None:
            from supabase import create_client

            self._client = create_client(self.settings.supabase_url, self.settings.supabase_service_role_key)
        return self._client

    async def table_all(self, table: str, fallback: list[dict]) -> list[dict]:
        client = self.client()
        if not client:
            return fallback
        query = client.table(table).select("*")
        if table in {"skills", "projects", "services"}:
            query = query.order("sort_order")
        else:
            query = query.order("created_at", desc=True)
        result = query.execute()
        return result.data or []

    async def first_profile(self) -> dict:
        client = self.client()
        if not client:
            return DEMO_PROFILE
        result = client.table("profiles").select("*").limit(1).execute()
        return result.data[0] if result.data else DEMO_PROFILE

    async def project_by_slug(self, slug: str) -> dict | None:
        projects = await self.table_all("projects", DEMO_PROJECTS)
        return next((project for project in projects if project["slug"] == slug), None)

    async def insert_contact(self, payload: dict) -> str | None:
        client = self.client()
        if not client:
            return None
        result = client.table("contact_inquiries").insert(payload).execute()
        return result.data[0]["id"] if result.data else None

    async def insert_chat_log(self, payload: dict) -> None:
        client = self.client()
        if client:
            client.table("chat_logs").insert(payload).execute()

    async def verify_user_token(self, token: str) -> dict | None:
        client = self.client()
        if not client:
            return None
        try:
            user_response = client.auth.get_user(token)
            user = getattr(user_response, "user", None)
            return {"id": user.id, "email": user.email} if user else None
        except Exception:
            return None

    async def admin_list(self, table: str) -> list[dict]:
        client = self.client()
        if not client:
            return []
        result = client.table(table).select("*").execute()
        return result.data or []

    async def admin_create(self, table: str, payload: dict) -> dict:
        client = self.client()
        if not client:
            return {"id": str(uuid4()), **payload}
        payload.pop("id", None)
        result = client.table(table).insert(payload).execute()
        return result.data[0]

    async def admin_update(self, table: str, row_id: str, payload: dict) -> dict:
        client = self.client()
        if not client:
            return {"id": row_id, **payload}
        payload.pop("id", None)
        result = client.table(table).update(payload).eq("id", row_id).execute()
        return result.data[0]

    async def admin_delete(self, table: str, row_id: str) -> None:
        client = self.client()
        if client:
            client.table(table).delete().eq("id", row_id).execute()

    async def site_setting(self, key: str, fallback: dict) -> dict:
        client = self.client()
        if not client:
            return fallback
        result = client.table("site_settings").select("value").eq("key", key).limit(1).execute()
        return result.data[0]["value"] if result.data else fallback

    async def upsert_site_setting(self, key: str, value: dict) -> dict:
        client = self.client()
        if not client:
            return value
        result = client.table("site_settings").upsert({"key": key, "value": value}).execute()
        return result.data[0]["value"]

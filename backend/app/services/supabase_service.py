from __future__ import annotations

from datetime import datetime, timezone

from app.core.config import Settings
from app.core.errors import integration_unavailable


DEMO_PROFILE = {
    "id": "00000000-0000-4000-8000-000000000001",
    "full_name": "Danish MD",
    "title": "Full-stack Developer",
    "bio": "Full-stack developer focused on building practical, reliable, and polished digital products.",
    "location": "India",
    "email": "",
    "phone": None,
    "linkedin_url": None,
    "github_url": None,
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
        "title": "Portfolio Website",
        "slug": "portfolio-website",
        "short_description": "A responsive portfolio experience with project pages, contact flows, and admin-managed content.",
        "description": "A full-stack portfolio built to present skills, services, project work, and contact paths in a clear production experience.",
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
        "title": "Client Portal Concept",
        "slug": "client-portal-concept",
        "short_description": "A structured portal concept for requests, collaboration, assets, and delivery tracking.",
        "description": "A product concept showing how client requests, assets, project status, and delivery workflows can be organized in one place.",
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
        "title": "Portfolio AI Assistant",
        "slug": "portfolio-ai-assistant",
        "short_description": "A portfolio chat assistant designed to answer questions from structured project and profile context.",
        "description": "An AI-assisted portfolio feature that responds from available profile, project, service, and experience content.",
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

DEMO_EXPERIENCE = []

DEMO_SERVICES = [
    {"id": "service-mvp", "title": "MVP build", "slug": "mvp-build", "description": "Plan, design, and build a focused web app from idea to deployable first version.", "features": ["Product scoping", "Full-stack implementation", "Deployment guidance"], "starting_price": "Quote after scope", "icon": None, "sort_order": 1},
    {"id": "service-frontend", "title": "Frontend polish", "slug": "frontend-polish", "description": "Improve UX, performance, accessibility, and visual quality for existing apps.", "features": ["Responsive UI", "Design system cleanup", "Build verification"], "starting_price": "Quote after audit", "icon": None, "sort_order": 2},
    {"id": "service-integration", "title": "API integrations", "slug": "api-integrations", "description": "Wire real services with backend-owned secrets and clear error handling.", "features": ["Backend-owned secrets", "Error handling", "Documentation"], "starting_price": "Quote after integration review", "icon": None, "sort_order": 3},
]

DEMO_TESTIMONIALS = []

DEMO_HOME_CONTENT = {
    "hero": {
        "nav": [
            {"label": "About", "to": "/about"},
            {"label": "Price", "to": "/services"},
            {"label": "Projects", "to": "/projects"},
            {"label": "Contact", "to": "/contact"},
        ],
        "heading": "Hi, i'm danish",
        "tagline": "a full-stack developer focused on practical, reliable digital products",
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
        "body": "I build practical web experiences with a focus on clean interfaces, reliable backend flows, and clear communication from idea to launch.",
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
            {"number": "01", "name": "Full-stack development", "description": "Build responsive web apps with polished frontends, backend APIs, and practical deployment paths."},
            {"number": "02", "name": "Frontend polish", "description": "Improve layout, interaction, accessibility, and performance so products feel clear and reliable."},
            {"number": "03", "name": "API integrations", "description": "Connect real services with backend-owned secrets, validation, and clear error handling."},
            {"number": "04", "name": "Admin dashboards", "description": "Create maintainable content and workflow tools for managing portfolio or product data."},
            {"number": "05", "name": "Product iteration", "description": "Turn rough ideas into focused, testable features with thoughtful user experience decisions."},
        ],
    },
    "projects": {
        "heading": "Project",
        "items": [
            {
                "number": "01",
                "name": "Portfolio Website",
                "category": "Full-stack",
                "images": [
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
                ],
            },
            {
                "number": "02",
                "name": "Client Portal Concept",
                "category": "SaaS",
                "images": [
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
                    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
                ],
            },
            {
                "number": "03",
                "name": "Portfolio AI Assistant",
                "category": "AI",
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
        if not result.data:
            raise RuntimeError("Profile content is not configured.")
        return result.data[0]

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
            raise integration_unavailable("Supabase")
        payload.pop("id", None)
        result = client.table(table).insert(payload).execute()
        return result.data[0]

    async def admin_update(self, table: str, row_id: str, payload: dict) -> dict:
        client = self.client()
        if not client:
            raise integration_unavailable("Supabase")
        payload.pop("id", None)
        result = client.table(table).update(payload).eq("id", row_id).execute()
        return result.data[0]

    async def admin_upsert_profile(self, payload: dict) -> dict:
        client = self.client()
        if not client:
            raise integration_unavailable("Supabase")

        existing = client.table("profiles").select("id").limit(1).execute()
        existing_id = existing.data[0]["id"] if existing.data else None
        if existing_id:
            payload.pop("id", None)
            result = client.table("profiles").update(payload).eq("id", existing_id).execute()
        else:
            result = client.table("profiles").insert(payload).execute()
        return result.data[0]

    async def admin_delete(self, table: str, row_id: str) -> None:
        client = self.client()
        if not client:
            raise integration_unavailable("Supabase")
        client.table(table).delete().eq("id", row_id).execute()

    async def site_setting(self, key: str, fallback: dict) -> dict:
        client = self.client()
        if not client:
            return fallback
        result = client.table("site_settings").select("value").eq("key", key).limit(1).execute()
        if not result.data:
            raise RuntimeError(f"{key} content is not configured.")
        return result.data[0]["value"]

    async def readiness(self) -> dict:
        if not self.configured:
            return {"ok": False, "error": self.settings.supabase_configuration_error or "Supabase is not configured."}
        try:
            result = self.client().table("profiles").select("id").limit(1).execute()
            return {"ok": True, "rows": len(result.data or [])}
        except Exception as exc:
            message = getattr(exc, "message", None) or str(exc)
            return {"ok": False, "error": message}

    async def upsert_site_setting(self, key: str, value: dict) -> dict:
        client = self.client()
        if not client:
            raise integration_unavailable("Supabase")
        result = client.table("site_settings").upsert({"key": key, "value": value}, on_conflict="key").execute()
        return result.data[0]["value"]

    async def site_content_all(self) -> list[dict]:
        client = self.client()
        if not client:
            return []
        result = client.table("site_content").select("*").order("updated_at", desc=True).execute()
        return result.data or []

    async def site_content_by_key(self, section_key: str) -> dict | None:
        client = self.client()
        if not client:
            return None
        result = client.table("site_content").select("*").eq("section_key", section_key).limit(1).execute()
        return result.data[0] if result.data else None

    async def upsert_site_content_media(self, section_key: str, payload: dict) -> dict:
        client = self.client()
        if not client:
            raise integration_unavailable("Supabase")
        payload = {key: value for key, value in payload.items() if key != "id"}
        payload["section_key"] = section_key
        payload["updated_at"] = datetime.now(timezone.utc).isoformat()
        result = client.table("site_content").upsert(payload, on_conflict="section_key").execute()
        return result.data[0]

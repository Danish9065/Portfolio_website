from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import admin_experience, admin_home, admin_inquiries, admin_profile, admin_projects, admin_services, admin_site_content, admin_testimonials, chat, contact, health, portfolio, site_content, uploads
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title="Portfolio API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in [
    health.router,
    portfolio.router,
    site_content.router,
    contact.router,
    chat.router,
    uploads.router,
    admin_experience.router,
    admin_projects.router,
    admin_profile.router,
    admin_home.router,
    admin_services.router,
    admin_testimonials.router,
    admin_site_content.router,
    admin_inquiries.router,
]:
    app.include_router(router, prefix="/api")

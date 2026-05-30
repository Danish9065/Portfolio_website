from fastapi import APIRouter, Depends, HTTPException, status
from app.core.config import Settings, get_settings
from app.services.supabase_service import (
    DEMO_EXPERIENCE,
    DEMO_HOME_CONTENT,
    DEMO_PROJECTS,
    DEMO_SERVICES,
    DEMO_SKILLS,
    DEMO_TESTIMONIALS,
    SupabaseService,
)

router = APIRouter()


def service(settings: Settings) -> SupabaseService:
    return SupabaseService(settings)


@router.get("/profile")
async def profile(settings: Settings = Depends(get_settings)):
    return await service(settings).first_profile()


@router.get("/home")
async def home(settings: Settings = Depends(get_settings)):
    return await service(settings).site_setting("home", DEMO_HOME_CONTENT)


@router.get("/projects")
async def projects(settings: Settings = Depends(get_settings)):
    return await service(settings).table_all("projects", DEMO_PROJECTS)


@router.get("/projects/slug/{slug}")
async def project_by_slug(slug: str, settings: Settings = Depends(get_settings)):
    item = await service(settings).project_by_slug(slug)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    return item


@router.get("/projects/{project_id}")
async def project(project_id: str, settings: Settings = Depends(get_settings)):
    rows = await service(settings).table_all("projects", DEMO_PROJECTS)
    item = next((row for row in rows if row["id"] == project_id), None)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    return item


@router.get("/skills")
async def skills(settings: Settings = Depends(get_settings)):
    return await service(settings).table_all("skills", DEMO_SKILLS)


@router.get("/services")
async def services(settings: Settings = Depends(get_settings)):
    return await service(settings).table_all("services", DEMO_SERVICES)


@router.get("/experience")
async def experience(settings: Settings = Depends(get_settings)):
    return await service(settings).table_all("experience", DEMO_EXPERIENCE)


@router.get("/testimonials")
async def testimonials(settings: Settings = Depends(get_settings)):
    return await service(settings).table_all("testimonials", DEMO_TESTIMONIALS)

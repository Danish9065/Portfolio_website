from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import Settings, get_settings
from app.schemas.site_content import SiteContentMedia
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.get("/site-content/{section_key}", response_model=SiteContentMedia | None)
async def site_content_by_key(section_key: str, settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).site_content_by_key(section_key)


@router.get("/site-content", response_model=list[SiteContentMedia])
async def site_content(settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).site_content_all()

from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.site_content import SiteContentMedia, SiteContentMediaInput
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.put("/admin/site-content/{section_key}", response_model=SiteContentMedia)
async def upsert_site_content(
    section_key: str,
    payload: SiteContentMediaInput,
    _: dict = Depends(require_admin),
    settings: Settings = Depends(get_settings),
):
    values = payload.model_dump()
    values["section_key"] = section_key
    return await SupabaseService(settings).upsert_site_content_media(section_key, values)

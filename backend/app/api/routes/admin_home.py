from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.home import HomeContent
from app.services.supabase_service import DEMO_HOME_CONTENT, SupabaseService

router = APIRouter()


@router.put("/admin/home", response_model=HomeContent)
async def update_home(payload: HomeContent, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).upsert_site_setting("home", payload.model_dump())

from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.profile import Profile
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.put("/admin/profile", response_model=Profile)
async def update_profile(payload: Profile, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_upsert_profile(payload.model_dump())

from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.get("/admin/inquiries")
async def inquiries(_: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_list("contact_inquiries")

from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings

router = APIRouter()


@router.get("/health")
async def health(settings: Settings = Depends(get_settings)):
    return {
        "ok": True,
        "environment": settings.app_env,
        "integrations": {
            "supabase": settings.supabase_configured,
            "cloudinary": settings.cloudinary_configured,
            "resend": settings.resend_configured,
            "gemini": settings.gemini_configured,
        },
    }

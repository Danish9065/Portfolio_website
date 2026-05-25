from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.get("/health")
async def health(settings: Settings = Depends(get_settings)):
    supabase_error = settings.supabase_configuration_error
    return {
        "ok": not supabase_error,
        "environment": settings.app_env,
        "integrations": {
            "supabase": {
                "configured": settings.supabase_configured,
                "error": supabase_error,
            },
            "cloudinary": {"configured": settings.cloudinary_configured},
            "resend": {"configured": settings.resend_configured},
            "gemini": {"configured": settings.gemini_configured},
        },
    }


@router.get("/ready")
async def ready(settings: Settings = Depends(get_settings)):
    supabase = await SupabaseService(settings).readiness()
    integrations = {
        "supabase": supabase,
        "cloudinary": {"ok": settings.cloudinary_configured},
        "resend": {"ok": settings.resend_configured},
        "gemini": {"ok": settings.gemini_configured},
    }
    return {
        "ok": all(item.get("ok", False) for item in integrations.values()),
        "environment": settings.app_env,
        "integrations": integrations,
    }

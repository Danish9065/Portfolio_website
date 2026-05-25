from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import ValidationError

from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.home import HomeContent
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.put("/admin/home", response_model=HomeContent)
async def update_home(request: Request, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    try:
        payload = HomeContent.model_validate(await request.json())
    except ValidationError as exc:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.errors()) from exc
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON body.") from exc

    return await SupabaseService(settings).upsert_site_setting("home", payload.model_dump())

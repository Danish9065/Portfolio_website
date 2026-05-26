from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.common import DeleteResponse
from app.schemas.experience import ExperienceSchema
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.post("/admin/experience", response_model=ExperienceSchema)
async def create_experience(payload: ExperienceSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_create("experience", payload.model_dump())


@router.put("/admin/experience/{experience_id}", response_model=ExperienceSchema)
async def update_experience(experience_id: str, payload: ExperienceSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_update("experience", experience_id, payload.model_dump())


@router.delete("/admin/experience/{experience_id}", response_model=DeleteResponse)
async def delete_experience(experience_id: str, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    await SupabaseService(settings).admin_delete("experience", experience_id)
    return DeleteResponse(ok=True)

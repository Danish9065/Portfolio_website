from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.common import DeleteResponse
from app.schemas.service import ServiceSchema
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.post("/admin/services", response_model=ServiceSchema)
async def create_service(payload: ServiceSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_create("services", payload.model_dump())


@router.put("/admin/services/{service_id}", response_model=ServiceSchema)
async def update_service(service_id: str, payload: ServiceSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_update("services", service_id, payload.model_dump())


@router.delete("/admin/services/{service_id}", response_model=DeleteResponse)
async def delete_service(service_id: str, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    await SupabaseService(settings).admin_delete("services", service_id)
    return DeleteResponse(ok=True)

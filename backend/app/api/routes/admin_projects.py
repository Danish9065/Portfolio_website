from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.common import DeleteResponse
from app.schemas.project import Project
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.post("/admin/projects", response_model=Project)
async def create_project(payload: Project, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_create("projects", payload.model_dump())


@router.put("/admin/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, payload: Project, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_update("projects", project_id, payload.model_dump())


@router.delete("/admin/projects/{project_id}", response_model=DeleteResponse)
async def delete_project(project_id: str, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    await SupabaseService(settings).admin_delete("projects", project_id)
    return DeleteResponse(ok=True)

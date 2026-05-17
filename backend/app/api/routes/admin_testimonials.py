from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.schemas.common import DeleteResponse
from app.schemas.testimonial import TestimonialSchema
from app.services.supabase_service import SupabaseService

router = APIRouter()


@router.post("/admin/testimonials", response_model=TestimonialSchema)
async def create_testimonial(payload: TestimonialSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_create("testimonials", payload.model_dump())


@router.put("/admin/testimonials/{testimonial_id}", response_model=TestimonialSchema)
async def update_testimonial(testimonial_id: str, payload: TestimonialSchema, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await SupabaseService(settings).admin_update("testimonials", testimonial_id, payload.model_dump())


@router.delete("/admin/testimonials/{testimonial_id}", response_model=DeleteResponse)
async def delete_testimonial(testimonial_id: str, _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    await SupabaseService(settings).admin_delete("testimonials", testimonial_id)
    return DeleteResponse(ok=True)

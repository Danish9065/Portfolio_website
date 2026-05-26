from fastapi import APIRouter, Depends, File, UploadFile
from app.core.config import Settings, get_settings
from app.core.security import require_admin
from app.services.cloudinary_service import CloudinaryService

router = APIRouter()


@router.post("/uploads/image")
async def upload_image(file: UploadFile = File(...), _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await CloudinaryService(settings).upload(file, folder="portfolio/images", resource_type="image")


@router.post("/uploads/resume")
async def upload_resume(file: UploadFile = File(...), _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await CloudinaryService(settings).upload(file, folder="portfolio/resumes", resource_type="raw")


@router.post("/upload")
async def upload(file: UploadFile = File(...), _: dict = Depends(require_admin), settings: Settings = Depends(get_settings)):
    return await CloudinaryService(settings).upload(file, folder="portfolio/uploads", resource_type="auto")

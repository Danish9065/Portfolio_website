import cloudinary
import cloudinary.uploader
from fastapi import UploadFile
from app.core.config import Settings


class CloudinaryService:
    def __init__(self, settings: Settings):
        self.settings = settings
        if settings.cloudinary_configured:
            cloudinary.config(
                cloud_name=settings.cloudinary_cloud_name,
                api_key=settings.cloudinary_api_key,
                api_secret=settings.cloudinary_api_secret,
                secure=True,
            )

    @property
    def configured(self) -> bool:
        return self.settings.cloudinary_configured

    async def upload(self, file: UploadFile, folder: str, resource_type: str = "auto") -> dict:
        if not self.configured:
            return {"configured": False, "message": "Cloudinary credentials are missing."}
        result = cloudinary.uploader.upload(file.file, folder=folder, resource_type=resource_type)
        return {"configured": True, "secure_url": result.get("secure_url"), "public_id": result.get("public_id")}

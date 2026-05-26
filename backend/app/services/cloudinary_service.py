from io import BytesIO
from typing import BinaryIO

import cloudinary
import cloudinary.uploader
from fastapi import UploadFile
from PIL import Image, ImageOps, UnidentifiedImageError

from app.core.config import Settings

MAX_IMAGE_EDGE = 1600
IMAGE_QUALITY = 78


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
        upload_file = self._prepare_file(file) if resource_type == "image" else file.file
        upload_options = {"folder": folder, "resource_type": resource_type}
        if resource_type == "image":
            upload_options["format"] = "webp"
        result = cloudinary.uploader.upload(upload_file, **upload_options)
        return {"configured": True, "secure_url": result.get("secure_url"), "public_id": result.get("public_id")}

    def _prepare_file(self, file: UploadFile) -> BytesIO | BinaryIO:
        try:
            file.file.seek(0)
            image = Image.open(file.file)
            image = ImageOps.exif_transpose(image)
        except (UnidentifiedImageError, OSError):
            file.file.seek(0)
            return file.file

        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        image.thumbnail((MAX_IMAGE_EDGE, MAX_IMAGE_EDGE), Image.Resampling.LANCZOS)

        output = BytesIO()
        image.save(output, format="WEBP", quality=IMAGE_QUALITY, method=6, optimize=True)
        output.seek(0)
        return output

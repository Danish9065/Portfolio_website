from io import BytesIO

import pytest
from fastapi import UploadFile
from PIL import Image

from app.api.routes.uploads import upload_resume
from app.core.config import Settings
from app.services.cloudinary_service import MAX_IMAGE_EDGE, CloudinaryService


class FakeCloudinaryService:
    def __init__(self, settings: Settings):
        self.settings = settings

    async def upload(self, file: UploadFile, folder: str, resource_type: str = "auto") -> dict:
        return {
            "configured": True,
            "folder": folder,
            "resource_type": resource_type,
            "secure_url": "https://res.cloudinary.com/demo/raw/upload/v1/portfolio/resumes/resume.pdf",
        }


@pytest.mark.asyncio
async def test_resume_upload_uses_raw_resource_type(monkeypatch):
    monkeypatch.setattr("app.api.routes.uploads.CloudinaryService", FakeCloudinaryService)
    file = UploadFile(filename="resume.pdf", file=BytesIO(b"%PDF-1.4"))

    result = await upload_resume(file=file, _={"email": "admin@example.com"}, settings=Settings())

    assert result["folder"] == "portfolio/resumes"
    assert result["resource_type"] == "raw"


@pytest.mark.asyncio
async def test_image_upload_is_compressed_to_webp(monkeypatch):
    captured = {}

    def fake_upload(upload_file, **options):
        captured["options"] = options
        captured["bytes"] = upload_file.read()
        return {
            "secure_url": "https://res.cloudinary.com/demo/image/upload/v1/portfolio/images/photo.webp",
            "public_id": "portfolio/images/photo",
        }

    monkeypatch.setattr("app.services.cloudinary_service.cloudinary.uploader.upload", fake_upload)
    image_bytes = BytesIO()
    Image.new("RGB", (2400, 1200), color=(35, 120, 220)).save(image_bytes, format="JPEG", quality=95)
    image_bytes.seek(0)
    file = UploadFile(filename="photo.jpg", file=image_bytes)
    service = CloudinaryService(
        Settings(
            cloudinary_cloud_name="demo",
            cloudinary_api_key="key",
            cloudinary_api_secret="secret",
        )
    )

    result = await service.upload(file, folder="portfolio/images", resource_type="image")
    uploaded = Image.open(BytesIO(captured["bytes"]))

    assert result["secure_url"].endswith(".webp")
    assert captured["options"] == {"folder": "portfolio/images", "resource_type": "image", "format": "webp"}
    assert uploaded.format == "WEBP"
    assert max(uploaded.size) <= MAX_IMAGE_EDGE

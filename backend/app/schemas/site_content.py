from pydantic import BaseModel


class SiteContentMedia(BaseModel):
    id: str | None = None
    section_key: str
    media_url: str | None = None
    optimized_url: str | None = None
    media_public_id: str | None = None
    media_type: str | None = None
    media_format: str | None = None
    media_width: int | None = None
    media_height: int | None = None
    media_bytes: int | None = None
    media_version: int | None = None
    updated_at: str | None = None


class SiteContentMediaInput(BaseModel):
    section_key: str
    media_url: str
    optimized_url: str | None = None
    media_public_id: str | None = None
    media_type: str | None = None
    media_format: str | None = None
    media_width: int | None = None
    media_height: int | None = None
    media_bytes: int | None = None
    media_version: int | None = None

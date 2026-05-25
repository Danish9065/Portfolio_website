from functools import lru_cache
from pathlib import Path
from urllib.parse import urlparse

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_DIR / ".env"


def _has_http_url(value: str | None) -> bool:
    if not value:
        return False
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_FILE, env_file_encoding="utf-8", extra="ignore")

    app_env: str = "development"
    app_frontend_url: str = "http://localhost:5173"
    frontend_origin: str = "http://localhost:5173"
    supabase_url: str | None = None
    supabase_service_role_key: str | None = None
    supabase_anon_key: str | None = None
    supabase_jwt_secret: str | None = None
    admin_emails: str | None = None
    cloudinary_cloud_name: str | None = None
    cloudinary_api_key: str | None = None
    cloudinary_api_secret: str | None = None
    resend_api_key: str | None = None
    resend_from_email: str | None = None
    contact_receiver_email: str | None = None
    owner_notification_email: str | None = None
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.5-flash"
    jwt_secret: str | None = Field(default=None)

    @property
    def supabase_configured(self) -> bool:
        return bool(_has_http_url(self.supabase_url) and self.supabase_service_role_key)

    @property
    def supabase_configuration_error(self) -> str | None:
        if self.supabase_url and not _has_http_url(self.supabase_url):
            return "SUPABASE_URL must be the full project URL, for example https://your-project-ref.supabase.co."
        if self.supabase_service_role_key and not self.supabase_url:
            return "SUPABASE_URL is required when SUPABASE_SERVICE_ROLE_KEY is set."
        if self.supabase_url and not self.supabase_service_role_key:
            return "SUPABASE_SERVICE_ROLE_KEY is required when SUPABASE_URL is set."
        return None

    @property
    def admin_email_set(self) -> set[str]:
        return {
            email.strip().lower()
            for email in (self.admin_emails or "").split(",")
            if email.strip()
        }

    @property
    def cloudinary_configured(self) -> bool:
        return bool(self.cloudinary_cloud_name and self.cloudinary_api_key and self.cloudinary_api_secret)

    @property
    def resend_configured(self) -> bool:
        return bool(self.resend_api_key and self.resend_from_email and (self.contact_receiver_email or self.owner_notification_email))

    @property
    def gemini_configured(self) -> bool:
        return bool(self.gemini_api_key)

    @property
    def cors_origins(self) -> list[str]:
        values = [self.frontend_origin, self.app_frontend_url]
        origins: list[str] = []
        for value in values:
            for origin in value.split(","):
                normalized = origin.strip().rstrip("/")
                if normalized and normalized not in origins:
                    origins.append(normalized)
        return origins or ["http://localhost:5173"]


@lru_cache
def get_settings() -> Settings:
    return Settings()

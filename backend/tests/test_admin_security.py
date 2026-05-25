import pytest
from fastapi import HTTPException
from starlette.requests import Request

from app.core.config import Settings
from app.core.security import require_admin


def request_with_token(token: str | None) -> Request:
    headers = []
    if token:
        headers.append((b"authorization", f"Bearer {token}".encode()))
    return Request({"type": "http", "headers": headers})


class FakeSupabaseService:
    def __init__(self, settings: Settings):
        self.settings = settings

    async def verify_user_token(self, token: str):
        if token == "valid":
            return {"id": "user-1", "email": "admin@example.com"}
        if token == "other":
            return {"id": "user-2", "email": "other@example.com"}
        return None


@pytest.mark.asyncio
async def test_require_admin_rejects_missing_token():
    with pytest.raises(HTTPException) as exc:
        await require_admin(request_with_token(None), Settings(admin_emails="admin@example.com"))

    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_require_admin_rejects_non_admin_email(monkeypatch):
    monkeypatch.setattr("app.core.security.SupabaseService", FakeSupabaseService)

    with pytest.raises(HTTPException) as exc:
        await require_admin(request_with_token("other"), Settings(admin_emails="admin@example.com"))

    assert exc.value.status_code == 403


@pytest.mark.asyncio
async def test_require_admin_allows_configured_admin_email(monkeypatch):
    monkeypatch.setattr("app.core.security.SupabaseService", FakeSupabaseService)

    user = await require_admin(request_with_token("valid"), Settings(admin_emails="Admin@Example.com"))

    assert user["email"] == "admin@example.com"

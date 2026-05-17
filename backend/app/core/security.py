from fastapi import Depends, HTTPException, Request, status
from app.core.config import Settings, get_settings
from app.services.supabase_service import SupabaseService


async def require_admin(request: Request, settings: Settings = Depends(get_settings)) -> dict:
    authorization = request.headers.get("authorization", "")
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token.")
    token = authorization.split(" ", 1)[1].strip()
    user = await SupabaseService(settings).verify_user_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin token.")
    return user

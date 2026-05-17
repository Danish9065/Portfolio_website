from uuid import uuid4
from fastapi import APIRouter, Depends, Request
from app.core.config import Settings, get_settings
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.gemini_service import GeminiService
from app.services.supabase_service import SupabaseService
from app.utils.rate_limit import chat_limiter

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request, settings: Settings = Depends(get_settings)):
    chat_limiter.check(request)
    session_id = payload.session_id or str(uuid4())
    supabase = SupabaseService(settings)
    context = {
        "profile": await supabase.first_profile(),
        "projects": await supabase.table_all("projects", []),
        "services": await supabase.table_all("services", []),
        "skills": await supabase.table_all("skills", []),
        "experience": await supabase.table_all("experience", []),
    }
    gemini = GeminiService(settings)
    answer = await gemini.answer(payload.message, context)
    await supabase.insert_chat_log({"session_id": session_id, "role": "user", "message": payload.message})
    await supabase.insert_chat_log({"session_id": session_id, "role": "assistant", "message": answer})
    return ChatResponse(message=answer, session_id=session_id, configured=gemini.configured)

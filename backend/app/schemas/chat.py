from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=2, max_length=1500)
    session_id: str | None = None
    visitor_context: dict | None = None


class ChatResponse(BaseModel):
    message: str
    session_id: str
    configured: bool

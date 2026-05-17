from typing import Literal
from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    purpose: Literal["job", "freelance", "general"]
    company: str | None = Field(default=None, max_length=160)
    budget: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=20, max_length=4000)
    website: str | None = None


class ContactResponse(BaseModel):
    status: Literal["success", "partial_success", "error"]
    message: str
    inquiry_id: str | None = None
    email_sent: bool
    stored: bool

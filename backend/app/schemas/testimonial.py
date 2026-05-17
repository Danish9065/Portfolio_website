from pydantic import BaseModel, Field


class TestimonialSchema(BaseModel):
    id: str | None = None
    name: str = Field(min_length=2)
    role: str | None = None
    company: str | None = None
    quote: str = Field(min_length=8)
    avatar_url: str | None = None
    rating: int | None = None

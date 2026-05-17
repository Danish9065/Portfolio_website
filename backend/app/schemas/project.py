from pydantic import BaseModel, Field


class Project(BaseModel):
    id: str | None = None
    title: str = Field(min_length=2)
    slug: str = Field(min_length=2)
    short_description: str = Field(min_length=2)
    description: str = Field(min_length=2)
    category: str = "Full-stack"
    tech_stack: list[str] = []
    image_url: str | None = None
    cloudinary_public_id: str | None = None
    live_url: str | None = None
    github_url: str | None = None
    featured: bool = False
    sort_order: int = 0

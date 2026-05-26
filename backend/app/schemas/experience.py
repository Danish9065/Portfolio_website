from pydantic import BaseModel, Field


class ExperienceSchema(BaseModel):
    id: str | None = None
    role: str = Field(min_length=2)
    company: str = Field(min_length=2)
    type: str = Field(min_length=2)
    location: str | None = None
    start_date: str
    end_date: str | None = None
    current: bool = False
    description: str = Field(min_length=2)
    highlights: list[str] = []

from pydantic import BaseModel, Field


class ServiceSchema(BaseModel):
    id: str | None = None
    title: str = Field(min_length=2)
    slug: str = Field(min_length=2)
    description: str = Field(min_length=2)
    features: list[str] = []
    starting_price: str | None = None
    icon: str | None = None
    sort_order: int = 0

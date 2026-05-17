from typing import Any

from pydantic import BaseModel, Field


class HomeContent(BaseModel):
    hero: dict[str, Any] = Field(default_factory=dict)
    marquee: dict[str, Any] = Field(default_factory=dict)
    about: dict[str, Any] = Field(default_factory=dict)
    services: dict[str, Any] = Field(default_factory=dict)
    projects: dict[str, Any] = Field(default_factory=dict)

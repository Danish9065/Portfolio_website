from pydantic import BaseModel


class Profile(BaseModel):
    id: str
    full_name: str
    title: str
    bio: str
    location: str
    email: str
    phone: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None
    website_url: str | None = None
    resume_url: str | None = None

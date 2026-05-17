from pydantic import BaseModel


class DeleteResponse(BaseModel):
    ok: bool

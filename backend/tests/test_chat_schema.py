import pytest
from pydantic import ValidationError
from app.schemas.chat import ChatRequest


def test_chat_schema_accepts_message():
    payload = ChatRequest(message="What projects are featured?")
    assert payload.message


def test_chat_schema_rejects_empty_message():
    with pytest.raises(ValidationError):
        ChatRequest(message="")

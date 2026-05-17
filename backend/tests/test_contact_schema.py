import pytest
from pydantic import ValidationError
from app.schemas.contact import ContactRequest


def test_contact_schema_accepts_valid_payload():
    payload = ContactRequest(name="Demo User", email="demo@example.com", purpose="job", message="This is a valid message with enough detail.")
    assert payload.email == "demo@example.com"


def test_contact_schema_rejects_short_message():
    with pytest.raises(ValidationError):
        ContactRequest(name="D", email="bad", purpose="job", message="short")

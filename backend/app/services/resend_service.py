import httpx
from app.core.config import Settings


class ResendService:
    def __init__(self, settings: Settings):
        self.settings = settings

    @property
    def configured(self) -> bool:
        return self.settings.resend_configured

    async def send_contact_emails(self, inquiry: dict) -> bool:
        if not self.configured:
            return False
        receiver = self.settings.contact_receiver_email or self.settings.owner_notification_email
        payload = {
            "from": self.settings.resend_from_email,
            "to": [receiver],
            "subject": f"Portfolio inquiry from {inquiry['name']}",
            "text": f"Purpose: {inquiry['purpose']}\nEmail: {inquiry['email']}\nCompany: {inquiry.get('company')}\nBudget: {inquiry.get('budget')}\n\n{inquiry['message']}",
        }
        async with httpx.AsyncClient(timeout=12) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {self.settings.resend_api_key}", "Content-Type": "application/json"},
                json=payload,
            )
            response.raise_for_status()
        return True

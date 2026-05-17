from fastapi import APIRouter, Depends, Request
from app.core.config import Settings, get_settings
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.resend_service import ResendService
from app.services.supabase_service import SupabaseService
from app.utils.rate_limit import contact_limiter

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
async def contact(payload: ContactRequest, request: Request, settings: Settings = Depends(get_settings)):
    contact_limiter.check(request)
    if payload.website:
        return ContactResponse(status="error", message="Spam protection rejected this submission.", email_sent=False, stored=False)

    inquiry = payload.model_dump(exclude={"website"})
    stored_id = await SupabaseService(settings).insert_contact(inquiry)
    stored = bool(stored_id)
    email_sent = False
    try:
        email_sent = await ResendService(settings).send_contact_emails(inquiry)
    except Exception:
        email_sent = False

    if stored and email_sent:
        return ContactResponse(status="success", message="Message saved and email notification sent.", inquiry_id=stored_id, email_sent=True, stored=True)
    if stored and not email_sent:
        return ContactResponse(status="partial_success", message="Message saved. Email delivery is not configured or did not confirm.", inquiry_id=stored_id, email_sent=False, stored=True)
    if not settings.supabase_configured and email_sent:
        return ContactResponse(status="partial_success", message="Email sent, but Supabase storage is not configured.", email_sent=True, stored=False)
    return ContactResponse(status="error", message="Contact storage and email delivery are not configured. Add Supabase and Resend credentials to enable this flow.", email_sent=False, stored=False)

import json
import logging
import httpx
from app.core.config import Settings


SYSTEM_RULES = (
    "You are the AI assistant for this portfolio. Answer only using the provided portfolio context. "
    "If something is unknown, say that the owner has not provided that detail yet and suggest contacting them. "
    "Never invent employment history, clients, metrics, awards, certifications, pricing, timelines, or years of experience."
)

logger = logging.getLogger(__name__)


class GeminiService:
    def __init__(self, settings: Settings):
        self.settings = settings

    @property
    def configured(self) -> bool:
        return self.settings.gemini_configured

    async def answer(self, question: str, context: dict) -> str:
        if not self.configured:
            return "The AI assistant needs a Gemini API key before it can answer dynamically. You can still use the contact page to ask about skills, projects, services, or availability."
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.settings.gemini_model}:generateContent?key={self.settings.gemini_api_key}"
        prompt = f"{SYSTEM_RULES}\n\nPortfolio context JSON:\n{json.dumps(context, default=str)}\n\nQuestion: {question}"
        payload = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.2, "maxOutputTokens": 500}}
        try:
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.post(url, json=payload)
                response.raise_for_status()
                data = response.json()
        except httpx.HTTPStatusError as exc:
            message = ""
            try:
                error = exc.response.json().get("error", {})
                message = error.get("message", "")
            except ValueError:
                message = exc.response.text[:200]
            logger.warning("Gemini API request failed status=%s model=%s message=%s", exc.response.status_code, self.settings.gemini_model, message)
            return "The portfolio data is connected, but the AI provider did not return an answer. Please use the contact form for this question."
        except httpx.HTTPError as exc:
            logger.warning("Gemini API request failed model=%s error=%s", self.settings.gemini_model, exc.__class__.__name__)
            return "The portfolio data is connected, but the AI provider did not return an answer. Please use the contact form for this question."
        return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "I could not produce an answer from the configured portfolio context.")

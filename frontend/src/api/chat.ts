import { apiFetch } from "./client";
import type { ChatResponse } from "../types/api";

export function sendChatMessage(message: string, sessionId?: string) {
  return apiFetch<ChatResponse>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message, session_id: sessionId })
  });
}

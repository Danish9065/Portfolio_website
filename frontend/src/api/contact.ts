import { apiFetch } from "./client";
import type { ContactPayload, ContactResponse } from "../types/api";

export function submitContact(payload: ContactPayload) {
  return apiFetch<ContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export type PortfolioEvent =
  | "audience_selected"
  | "cta_clicked"
  | "contact_submitted"
  | "chat_opened"
  | "chat_lead_captured";

export function trackEvent(name: PortfolioEvent, payload: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent("portfolio:event", { detail: { name, payload } }));
}

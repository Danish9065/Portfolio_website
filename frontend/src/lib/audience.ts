import type { Audience } from "../types/api";

const key = "portfolio_audience";

export function getStoredAudience(): Audience {
  const value = window.localStorage.getItem(key);
  return value === "client" || value === "recruiter" ? value : "recruiter";
}

export function storeAudience(audience: Audience) {
  window.localStorage.setItem(key, audience);
}

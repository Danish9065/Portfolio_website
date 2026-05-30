import { API_BASE_URL } from "../lib/constants";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function errorMessage(data: unknown): string {
  if (data && typeof data === "object") {
    const detail = "detail" in data ? data.detail : undefined;
    const message = "message" in data ? data.message : undefined;

    if (typeof detail === "string") return detail;
    if (typeof message === "string") return message;
    if (detail) return JSON.stringify(detail);
    if (message) return JSON.stringify(message);
  }

  return "Request failed";
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...init.headers
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(errorMessage(data), response.status);
  }

  return data as T;
}

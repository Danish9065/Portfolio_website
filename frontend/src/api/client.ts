import { API_BASE_URL } from "../lib/constants";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function errorMessage(data: unknown): string {
  if (typeof data === "string" && data.trim()) return data;

  if (data && typeof data === "object") {
    const detail = "detail" in data ? data.detail : undefined;
    const message = "message" in data ? data.message : undefined;
    const error = "error" in data ? data.error : undefined;

    if (typeof detail === "string") return detail;
    if (typeof message === "string") return message;
    if (typeof error === "string") return error;
    if (detail) return JSON.stringify(detail);
    if (message) return JSON.stringify(message);
    if (error) return JSON.stringify(error);
  }

  return "Request failed";
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers
    }
  });

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(errorMessage(data), response.status);
  }

  if (typeof data === "string") {
    throw new ApiError("The server returned an invalid response. Please try again later.", response.status);
  }

  return data as T;
}

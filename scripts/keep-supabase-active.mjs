#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFiles = [".env", "backend/.env", "frontend/.env"];

for (const file of envFiles) {
  loadEnvFile(resolve(process.cwd(), file));
}

const supabaseUrl = pickEnv("SUPABASE_URL", "VITE_SUPABASE_URL");
const supabaseKey = pickEnv("SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY");
const table = process.env.SUPABASE_KEEPALIVE_TABLE || "profiles";
const select = process.env.SUPABASE_KEEPALIVE_SELECT || "id";

if (!supabaseUrl) {
  fail("Missing SUPABASE_URL or VITE_SUPABASE_URL.");
}

if (!supabaseKey) {
  fail("Missing SUPABASE_ANON_KEY, VITE_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY.");
}

const endpoint = new URL(`/rest/v1/${encodeURIComponent(table)}`, supabaseUrl);
endpoint.searchParams.set("select", select);
endpoint.searchParams.set("limit", "1");

try {
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  const body = await response.text();

  if (!response.ok) {
    fail(`Supabase keep-alive failed with HTTP ${response.status}: ${body}`);
  }

  const rows = body ? JSON.parse(body) : [];
  console.log(
    `Supabase keep-alive succeeded for ${new URL(supabaseUrl).host}.${table}; rows checked: ${
      Array.isArray(rows) ? rows.length : 0
    }`,
  );
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

function pickEnv(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return "";
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();

    if (!key || process.env[key] !== undefined) continue;

    process.env[key] = stripQuotes(rawValue);
  }
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

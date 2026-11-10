// config.ts: where the API lives. The only file that knows the server address.
// Read on the server only: API_BASE_URL has no NEXT_PUBLIC_ prefix, so it never reaches the
// browser bundle.
import "server-only";

const DEFAULT_API_BASE_URL = "https://shopboard-api.vercel.app/api";

// Reads API_BASE_URL from .env.local, or uses the default. Never ends with "/".
function readBaseUrl(): string {
  const fromEnv = process.env.API_BASE_URL;
  const url = fromEnv !== undefined && fromEnv !== "" ? fromEnv : DEFAULT_API_BASE_URL;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const API_BASE_URL = readBaseUrl();

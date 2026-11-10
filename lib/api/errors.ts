// errors.ts: the error type every request throws. Server only in practice: products.api.ts
// reads `status` to turn a 404 into "no such product". The browser never sees an ApiError:
// in production Next.js replaces a server error's message, so error.tsx shows a fixed message.

// What went wrong with a request.
export type ApiErrorKind = "network" | "timeout" | "http" | "invalid-response";

// An error from a request. `kind` says what failed; `status` is set only for HTTP errors.
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | undefined;

  constructor(kind: ApiErrorKind, message: string, status?: number, cause?: unknown) {
    super(message, { cause });
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

// error-boundary.tsx: ours. An error boundary for one part of a page, so a failure there
// doesn't take the rest down (an error.tsx covers a whole route folder). Built with Next.js's
// catchError (next/error), which keeps notFound() working and gives retry(). It shows the
// same ErrorMessage as every error.tsx: a fixed message and "Try again".
// <ErrorBoundary message="We couldn't load …">…</ErrorBoundary>
"use client";

import { catchError, type ErrorInfo } from "next/error";
import { ErrorMessage } from "./error-message";

interface ErrorBoundaryProps {
  message: string;
}

// The thrown value is not shown: in production Next.js replaces a server error's message
// (AGENTS.md "Data, loading and errors").
function ErrorFallback({ message }: ErrorBoundaryProps, { retry }: ErrorInfo) {
  return <ErrorMessage message={message} retry={retry} />;
}

export const ErrorBoundary = catchError(ErrorFallback);

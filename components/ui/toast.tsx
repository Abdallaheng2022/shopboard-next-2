// toast.tsx: ours. A short message at the bottom of the screen (DESIGN.md "Toast"): full width
// on mobile, bottom right and `toast` wide from md, sliding up. role="status": a screen reader
// says it without moving focus. It knows nothing about what happened: it gets the text.
import type { ReactNode } from "react";

interface ToastProps {
  children: ReactNode;
}

function Toast({ children }: ToastProps) {
  return (
    <ul
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 grid gap-2 md:left-auto md:w-toast"
      role="status"
    >
      <li className="pointer-events-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-md bg-primary px-4 py-3 text-primary-foreground shadow-dialog motion-safe:animate-slide-up">
        {children}
      </li>
    </ul>
  );
}

export { Toast };

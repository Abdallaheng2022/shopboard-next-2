// select.tsx: ours (shadcn's Select is a custom Radix list; the filters need a native one).
// A native <select> that looks exactly like Input (inputClasses), with its own arrow: an SVG
// in currentColor, so the arrow follows the token in dark mode instead of a fixed color.
import * as React from "react";
import { cn } from "@/lib/utils";
import { inputClasses } from "./input";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <span data-slot="select" className="relative block">
      {/* appearance-none hides the browser's arrow; pe-9.5 leaves room for ours. */}
      <select className={cn(inputClasses, "appearance-none pe-9.5", className)} {...props}>
        {children}
      </select>
      <svg
        viewBox="0 0 12 8"
        aria-hidden="true"
        className="pointer-events-none absolute end-3.5 top-1/2 h-2 w-3 -translate-y-1/2 text-muted-foreground"
      >
        <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}

export { Select };

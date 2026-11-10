// input.tsx: shadcn/ui's Input (`pnpm dlx shadcn@latest add input`), adapted to DESIGN.md
// "Inputs and selects". Kept: the structure and data-slot. Changed: the classes (card
// background, border, rounded-md, 44px tall, 16px text so iOS doesn't zoom, the primary
// focus ring, the destructive border when aria-invalid). Removed: the file-input and dark:
// classes (no file inputs; the tokens already switch in dark mode).
// inputClasses is exported so the kit's Select looks the same from one source.
import * as React from "react";
import { cn } from "@/lib/utils";

export const inputClasses =
  "min-h-tap w-full min-w-0 rounded-md border border-border bg-card px-3.5 py-2.5 text-base text-foreground transition duration-150 outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive motion-reduce:transition-none";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(inputClasses, className)} {...props} />;
}

export { Input };

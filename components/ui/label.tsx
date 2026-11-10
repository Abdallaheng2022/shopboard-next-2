// label.tsx: shadcn/ui's Label (`pnpm dlx shadcn@latest add label`), adapted to DESIGN.md's
// `label` type: 0.875rem, semibold, subtle-foreground. Kept: Radix Label, data-slot, the
// disabled-peer classes. Removed: leading-none, so a label wraps like v1's.
import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm font-semibold text-subtle-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

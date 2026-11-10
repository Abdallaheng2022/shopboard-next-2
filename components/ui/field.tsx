// field.tsx: shadcn/ui's Field (`pnpm dlx shadcn@latest add field`), cut to what ShopBoard uses
// and adapted to DESIGN.md "Form fields": the label above the input, a hint or the error under
// it, 4px apart; fields 16px apart. Kept: the names, data-slot, role="group", the
// `orientation` variant and FieldError's `errors` prop (what react-hook-form gives).
// Removed: FieldSet, FieldLegend, FieldContent, FieldTitle, FieldSeparator (unused), the
// container queries, and the red label on error (DESIGN.md: only the border and the message).
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "./label";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("grid gap-4", className)} {...props} />;
}

const fieldVariants = cva("", {
  variants: {
    orientation: {
      // Label, input, then the hint or the error.
      vertical: "grid gap-1",
      // A checkbox and its label on one line.
      horizontal: "flex items-center gap-2",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

function Field({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldLabel(props: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// Shows the first message of `errors`, or nothing. role="alert": a screen reader says it.
function FieldError({
  className,
  errors,
  ...props
}: React.ComponentProps<"p"> & { errors?: ({ message?: string } | undefined)[] }) {
  const message = errors?.find((error) => error?.message !== undefined)?.message;
  if (message === undefined) return null;
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  );
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel };

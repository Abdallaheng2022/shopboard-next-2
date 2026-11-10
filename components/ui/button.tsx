// button.tsx: shadcn/ui's Button (`pnpm dlx shadcn@latest add button`), adapted to DESIGN.md.
// Kept from the CLI: the structure, data-slot and asChild (Radix Slot).
// Changed: the classes, to DESIGN.md's buttons (v1's .btn look), and the variants, to the
// Day 6 assignment's names: variant primary | secondary | ghost, size sm | md | lg.
//   primary = v1 .btn-primary, secondary = v1 .btn-secondary (white, foreground border),
//   ghost = v1 .btn-ghost; md = v1 .btn, lg = v1 .btn-lg, sm = less padding and smaller
//   text, still 44px tall (DESIGN.md: every clickable thing is at least 44px).
// Removed: the CLI's destructive, outline, link and icon variants (not in DESIGN.md).
// A <Link> that looks like a button: <Button asChild><Link href="/">Shop</Link></Button>.
import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { focusRing } from "./focus-ring";

const buttonVariants = cva(
  // Every button: at least 44px (min-h-tap), pressed = 98%, disabled = half opacity, no
  // transition for reduced motion, and DESIGN.md's focus outline (focusRing).
  // not-disabled: (not enabled:) so a <Link>, which is never "enabled", still scales.
  [
    "inline-flex min-h-tap min-w-tap cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-5 leading-none font-semibold no-underline transition duration-150 not-disabled:active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground not-disabled:hover:brightness-94",
        secondary: "border-foreground bg-card text-foreground",
        // Looks like a nav link: the body's weight, a nav link's padding.
        ghost: "px-3 font-normal text-link not-disabled:hover:bg-muted",
      },
      size: {
        sm: "px-3 text-sm",
        md: "",
        lg: "min-h-12 px-6.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // asChild: render the child (a <Link>) with these classes instead of a <button>.
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

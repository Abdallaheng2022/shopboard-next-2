// button.tsx: shadcn/ui's Button (`pnpm dlx shadcn@latest add button`), adapted to DESIGN.md.
// Kept from the CLI: the structure, data-slot, asChild (Radix Slot) and the variant names.
// Changed: the classes, to v1's .btn look, and only the variants ShopBoard uses:
//   default = v1 .btn-primary, outline = v1 .btn-secondary, ghost = v1 .btn-ghost,
//   size lg = v1 .btn-lg. Removed: destructive, secondary, link, sm, icon (unused).
// A <Link> that looks like a button: <Button asChild><Link href="/">Shop</Link></Button>.
import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Every button: at least 44px (min-h-tap), pressed = 98%, disabled = half opacity, no
  // transition for reduced motion, and DESIGN.md's focus outline (3px, link color).
  // not-disabled: (not enabled:) so a <Link>, which is never "enabled", still scales.
  "inline-flex min-h-tap min-w-tap cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-5 leading-none font-semibold no-underline transition duration-150 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-link focus-visible:outline-solid motion-reduce:transition-none not-disabled:active:scale-98 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground not-disabled:hover:brightness-94",
        outline: "border-foreground bg-card text-foreground",
        // Looks like a nav link: the body's weight, a nav link's padding.
        ghost: "px-3 font-normal text-link not-disabled:hover:bg-muted",
      },
      size: {
        default: "",
        lg: "min-h-12 px-6.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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

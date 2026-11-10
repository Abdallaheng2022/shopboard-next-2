// badge.tsx: shadcn/ui's Badge (`pnpm dlx shadcn@latest add badge`), adapted to DESIGN.md.
// Kept: the structure, data-slot, asChild. Changed: the variants, to ShopBoard's two:
//   count    = the cart count: a 20px coral pill with dark ink, tabular digits.
//   category = the category label: small uppercase muted text (the `eyebrow` type).
// Removed: the CLI's default, secondary, destructive and outline variants (not in DESIGN.md).
import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex w-fit shrink-0 items-center whitespace-nowrap", {
  variants: {
    variant: {
      count:
        "h-5 min-w-5 justify-center rounded-full bg-highlight px-1.5 text-xs leading-5 font-bold text-highlight-foreground tabular-nums",
      category: "text-xs font-semibold tracking-eyebrow text-muted-foreground uppercase",
    },
  },
  defaultVariants: { variant: "category" },
});

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };

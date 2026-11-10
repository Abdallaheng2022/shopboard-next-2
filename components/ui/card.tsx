// card.tsx: shadcn/ui's Card (`pnpm dlx shadcn@latest add card`), adapted to DESIGN.md's two
// surfaces. Kept: the name, data-slot. Changed: one Card with variants instead of the CLI's
// CardHeader/CardTitle/CardContent/CardFooter (each ShopBoard card lays out its own content).
//   layout tile  = "product-card": 20px, rounded-lg, a column with 8px gaps, full height.
//   layout panel = "panel": 20px, rounded-md, a grid with 12px gaps (summary, cart line…).
//   tone: the surface color. muted and soft are the product grid's bento tints.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("text-card-foreground", {
  variants: {
    layout: {
      tile: "flex h-full flex-col gap-2 rounded-lg p-5",
      panel: "grid gap-3 rounded-md p-5",
    },
    tone: {
      card: "bg-card",
      muted: "bg-muted",
      soft: "bg-primary-soft",
    },
  },
  defaultVariants: { layout: "panel", tone: "card" },
});

function Card({
  className,
  layout,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div data-slot="card" className={cn(cardVariants({ layout, tone }), className)} {...props} />
  );
}

export { Card };

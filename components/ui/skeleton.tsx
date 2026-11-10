// skeleton.tsx: shadcn/ui's Skeleton (`pnpm dlx shadcn@latest add skeleton`), adapted to
// DESIGN.md "Skeleton card": a muted block with a moving light (the CLI's is a pulse).
// Kept: the name, data-slot, the className prop for the size. motion-safe: no light moves
// for users who asked for reduced motion.
import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "rounded-lg bg-muted bg-(image:--skeleton-shine) bg-(length:--skeleton-shine-size) bg-no-repeat motion-safe:animate-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

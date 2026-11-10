// button.ts: the three button looks from DESIGN.md "Components", as classes. A <button> and
// a <Link> both use them: className={buttonVariants({ variant: "primary" })}.
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  // Every button: at least 44px (min-h-tap), pressed = 98%, disabled = half opacity.
  // not-disabled: (not enabled:) so a <Link>, which is never "enabled", still scales.
  "inline-flex min-h-tap min-w-tap cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-5 leading-none font-semibold no-underline transition duration-150 not-disabled:active:scale-98 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground not-disabled:hover:brightness-94",
        secondary: "border-foreground bg-card text-foreground",
        // Looks like a nav link: the body's weight, a nav link's padding.
        ghost: "px-3 font-normal text-link not-disabled:hover:bg-muted",
      },
      size: {
        md: "",
        lg: "min-h-12 px-6.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

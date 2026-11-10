// cart-link.tsx: the header's cart button: a round 44px link to /cart with the item count on
// a Badge (DESIGN.md "Cart badge"). It reads the cart, so it re-renders on every cart change;
// the rest of the header doesn't. Client code already: header.tsx is a Client Component.
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { focusRing } from "@/components/ui/focus-ring";
import { useCart } from "@/features/cart/cart.hooks";
import { getItemCount } from "@/features/cart/cart.logic";
import { cn } from "@/lib/utils";

export function CartLink() {
  // Computed from the cart on every render, never stored.
  const itemCount = getItemCount(useCart());
  return (
    <Link
      className={cn(
        "relative inline-flex size-tap items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted motion-reduce:transition-none",
        focusRing,
      )}
      href="/cart"
      aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" />
      </svg>
      <Badge variant="count" className="absolute top-0.5 right-0.5" aria-hidden="true">
        {itemCount}
      </Badge>
    </Link>
  );
}

// shop-link.tsx: the "Shop" link in the header. It reads the current URL to mark itself as the
// current page (aria-current="page" on /products), so it sits inside <Suspense> in the header
// (AGENTS.md rule 2). Client code already: header.tsx is a Client Component.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { focusRing } from "@/components/ui/focus-ring";
import { cn } from "@/lib/utils";

// DESIGN.md "Header": a nav link is 44px tall, link-colored, with a muted hover. One source for
// the link and for the header's <Suspense> fallback.
export const navLinkClasses = cn(
  "inline-flex min-h-tap items-center rounded-md px-3 text-link no-underline hover:bg-muted",
  focusRing,
);

export const SHOP_HREF = "/products";

export function ShopLink() {
  const isShopPage = usePathname() === SHOP_HREF;
  return (
    <Link
      className={navLinkClasses}
      href={SHOP_HREF}
      aria-current={isShopPage ? "page" : undefined}
    >
      Shop
    </Link>
  );
}

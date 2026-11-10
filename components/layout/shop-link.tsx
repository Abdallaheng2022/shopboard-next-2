// shop-link.tsx: the "Shop" link in the header. It reads the current URL to mark itself as the
// current page (aria-current="page" on /products), so it sits inside <Suspense> in the header
// (AGENTS.md rule 2). Client code already: header.tsx is a Client Component.
// It looks like the "Sign up" button next to it: the kit's ghost Button rendering a <Link>
// (asChild), so the nav look has one source, button.tsx.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const SHOP_HREF = "/products";

export function ShopLink() {
  const isShopPage = usePathname() === SHOP_HREF;
  return (
    <Button asChild variant="ghost">
      <Link href={SHOP_HREF} aria-current={isShopPage ? "page" : undefined}>
        Shop
      </Link>
    </Button>
  );
}

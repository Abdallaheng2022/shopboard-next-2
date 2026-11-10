// product-price.tsx: a price in DESIGN.md's `price` type, with tabular digits.
// One source for the product card, the product page, the cart line and the cart total.
// The margins are the card's; a caller with another layout replaces them through className.
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  className?: string;
}

export function ProductPrice({ price, className }: ProductPriceProps) {
  return (
    <p className={cn("mt-1 mb-3 text-price font-bold tracking-heading tabular-nums", className)}>
      {formatPrice(price)}
    </p>
  );
}

// product-price.tsx: a product's price in DESIGN.md's `price` type, with tabular digits.
// One source for the card in the grid and the product page.
import { formatPrice } from "@/lib/format";

export function ProductPrice({ price }: { price: number }) {
  return (
    <p className="mt-1 mb-3 text-price font-bold tracking-heading tabular-nums">
      {formatPrice(price)}
    </p>
  );
}

// product-card.tsx: one product in the grid: the art, the name (a link to its page), the
// category, the price and "Add to cart" (DESIGN.md "Product card").
import Link from "next/link";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { focusRing } from "@/components/ui/focus-ring";
import { headingVariants } from "@/components/ui/heading";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "../products.types";

// The bento rhythm: v1 tinted every 4n+2 card muted and every 5n+3 card soft (5n+3 wins when
// both match). index is 0-based, so the 2nd card is index 1.
function getTone(index: number): "card" | "muted" | "soft" {
  if (index % 5 === 2) return "soft";
  if (index % 4 === 1) return "muted";
  return "card";
}

interface ProductCardProps {
  product: Product;
  // The card's place in the grid, for its tint.
  index: number;
}

// memo: with thousands of products, typing in search re-renders ProductsSection; a card whose
// `product` and `index` are the same is skipped. "Add to cart" reads only the cart's actions,
// which never change, so adding doesn't re-render every card either.
export const ProductCard = memo(function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Card
      layout="tile"
      tone={getTone(index)}
      className="transition duration-200 focus-within:-translate-y-0.75 focus-within:shadow-lift hover:-translate-y-0.75 hover:shadow-lift motion-safe:animate-rise motion-reduce:transition-none"
    >
      <div
        aria-hidden="true"
        className="mb-3 aspect-4/3 rounded-3xl bg-(image:--product-art) bg-(length:--product-art-size)"
      />
      <h3 className={headingVariants({ level: 3 })}>
        {/* Looks like the title, not a blue link; the underline shows on hover and focus. */}
        <Link
          href={`/products/${product.id}`}
          className={cn(
            "text-inherit no-underline hover:underline focus-visible:underline",
            focusRing,
          )}
        >
          {product.name}
        </Link>
      </h3>
      <Badge variant="category">{product.category}</Badge>
      <p className="mt-1 mb-3 text-price font-bold tracking-heading tabular-nums">
        {formatPrice(product.price)}
      </p>
      <AddToCartButton product={product} className="mt-auto self-start" />
    </Card>
  );
});

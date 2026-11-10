// add-to-cart-button.tsx: "Add to cart" for one product, or a disabled "Out of stock".
// One source for the product card and the product page. A Client Component: the click changes
// the cart, which lives in the browser. The product page is a Server Component, so only this
// button's JavaScript reaches the browser there.
"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/products.types";
import { useCartActions } from "../cart.hooks";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  // Only the actions: they never change, so a cart change doesn't re-render this button.
  const { add } = useCartActions();

  if (!product.inStock) {
    return (
      <Button className={className} disabled>
        Out of stock
      </Button>
    );
  }
  return (
    <Button
      className={className}
      aria-label={`Add ${product.name} to cart`}
      onClick={() => add(product)}
    >
      Add to cart
    </Button>
  );
}

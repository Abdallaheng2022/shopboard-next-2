// order-summary.tsx: the checkout's summary (DESIGN.md "Order summary"): every cart line and
// the total. The page starts loading the products and passes the Promise without awaiting it,
// so the form shows at once; use() waits for it here, inside the page's <Suspense>, and a
// failure goes to the page's ErrorBoundary, not to the form. A Client Component: the cart
// lives in the browser.
"use client";

import { use } from "react";
import { Card } from "@/components/ui/card";
import { headingVariants } from "@/components/ui/heading";
import { useCart, useRemoveUnavailable } from "@/features/cart/cart.hooks";
import { getCartLines, getTotal } from "@/features/cart/cart.logic";
import { ProductPrice } from "@/features/products/components/product-price";
import type { Product } from "@/features/products/products.types";
import { formatPrice } from "@/lib/format";

interface OrderSummaryProps {
  products: Promise<readonly Product[]>;
}

export function OrderSummary({ products: productsPromise }: OrderSummaryProps) {
  const products = use(productsPromise);
  const cart = useCart();
  useRemoveUnavailable(products);
  // Computed in the render, never stored.
  const lines = getCartLines(cart, products);

  return (
    <Card aria-labelledby="summary-title">
      <h2 id="summary-title" className={headingVariants({ level: 3 })}>
        Order summary
      </h2>
      <ul className="grid gap-2">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-baseline justify-between gap-4">
            <span>
              {product.name}{" "}
              <span className="text-muted-foreground tabular-nums">× {quantity}</span>
            </span>
            <span className="font-semibold tabular-nums">
              {formatPrice(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
        <p className="font-semibold">Total</p>
        <ProductPrice price={getTotal(cart, products)} className="my-0" />
      </div>
    </Card>
  );
}

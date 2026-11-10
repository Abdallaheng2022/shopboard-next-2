// cart-content.tsx: the /cart page's content: the title, the cart lines and the total.
// It gets the products already loaded (the page awaited them on the server) and reads the
// cart, which lives in the browser. A Client Component: the cart is browser state, and the
// buttons change it.
"use client";

import Link from "next/link";
import { useCallback } from "react";
import { PageSection, PageTitle } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusMessage } from "@/components/ui/status-message";
import { ProductPrice } from "@/features/products/components/product-price";
import type { Product } from "@/features/products/products.types";
import { useCart, useCartActions, useCartLoaded } from "../cart.hooks";
import { getCartLines, getTotal } from "../cart.logic";
import type { CartAction } from "../cart.types";
import { CartRow } from "./cart-row";

interface CartContentProps {
  products: readonly Product[];
}

export function CartContent({ products }: CartContentProps) {
  const cart = useCart();
  const isLoaded = useCartLoaded();
  const { increase, decrease, remove } = useCartActions();

  // useCallback: CartRow is memo, so onAction must stay the same function between renders.
  // The actions never change, so neither does this.
  const handleAction = useCallback(
    (action: CartAction, product: Product) => {
      switch (action) {
        case "increase":
          increase(product);
          return;
        case "decrease":
          decrease(product.id);
          return;
        case "remove":
          remove(product.id);
          return;
      }
    },
    [increase, decrease, remove],
  );

  // Computed in the render, never stored.
  const lines = getCartLines(cart, products);

  return (
    <PageSection aria-labelledby="cart-title">
      <PageTitle id="cart-title">Your cart</PageTitle>
      {!isLoaded ? (
        // The server can't read the saved cart: wait for the browser instead of flashing
        // "Your cart is empty" (AGENTS.md "State").
        <StatusMessage message="Loading cart…" />
      ) : lines.length === 0 ? (
        <StatusMessage
          message="Your cart is empty."
          action={
            <Button asChild>
              <Link href="/products">Browse products</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3">
          <ul className="grid gap-3">
            {lines.map(({ product, quantity }) => (
              <li key={product.id}>
                <CartRow product={product} quantity={quantity} onAction={handleAction} />
              </li>
            ))}
          </ul>
          <Card className="md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-4 md:justify-start">
              <p className="font-semibold">Total</p>
              <ProductPrice price={getTotal(cart, products)} className="my-0" />
            </div>
            <Button asChild size="lg">
              <Link href="/checkout">Go to checkout</Link>
            </Button>
          </Card>
        </div>
      )}
    </PageSection>
  );
}

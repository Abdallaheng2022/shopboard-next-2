// checkout-content.tsx: the /checkout page's content: one of three screens (the cart is
// loading, the cart is empty, or the form beside the summary) and what placing the order
// does. The form is CheckoutForm; the summary is passed in by the page (a Client Component
// can't import the page's Server parts, but can show them as a prop). A Client Component:
// the cart and the navigation after placing the order live in the browser.
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { PageSection, PageTitle } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { useCart, useCartActions, useCartLoaded } from "@/features/cart/cart.hooks";
import type { Checkout } from "../checkout.schema";
import { CheckoutForm } from "./checkout-form";

interface CheckoutContentProps {
  // The order summary, already wrapped by the page in its ErrorBoundary and <Suspense>.
  summary: ReactNode;
}

export function CheckoutContent({ summary }: CheckoutContentProps) {
  const cart = useCart();
  const isLoaded = useCartLoaded();
  const { clear } = useCartActions();
  const router = useRouter();
  // true after "Place order": clear() empties the cart before the page changes, and this
  // keeps "Your cart is empty" from flashing in between.
  const [orderPlaced, setOrderPlaced] = useState(false);

  function placeOrder(checkout: Checkout): void {
    setOrderPlaced(true);
    clear();
    // replace, not push: "Back" from the thank-you page skips the emptied checkout.
    const query = new URLSearchParams({ name: checkout.name });
    router.replace(`/checkout/success?${query.toString()}`);
  }

  let content: ReactNode;
  if (!isLoaded) {
    // The server can't read the saved cart (AGENTS.md "State").
    content = <StatusMessage message="Loading cart…" />;
  } else if (cart.length === 0 && !orderPlaced) {
    content = (
      <StatusMessage
        message="Your cart is empty. Add a product before you check out."
        action={
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        }
      />
    );
  } else {
    content = (
      // DESIGN.md "Layout": the form then the summary; side by side from checkout-split.
      <div className="grid gap-8 checkout-split:flex checkout-split:items-start">
        <CheckoutForm onPlaceOrder={placeOrder} />
        <div className="w-full max-w-checkout-summary">{summary}</div>
      </div>
    );
  }

  return (
    <PageSection aria-labelledby="checkout-title">
      <PageTitle id="checkout-title">Checkout</PageTitle>
      {content}
    </PageSection>
  );
}

// checkout-content.tsx: the /checkout page's content: the form and, beside it, the summary
// the page passes in (a Client Component can't import the page's Server parts, but can show
// them as a prop). A Client Component: the form, the cart and the navigation after placing
// the order all live in the browser.
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { PageSection, PageTitle } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { useCart, useCartActions, useCartLoaded } from "@/features/cart/cart.hooks";
import { checkoutSchema, type Checkout } from "../checkout.schema";

interface CheckoutContentProps {
  // The order summary, already wrapped by the page in its ErrorBoundary and <Suspense>.
  summary: ReactNode;
}

// Every field starts empty; react-hook-form needs them so the inputs are controlled from the
// first render.
const DEFAULT_VALUES: Checkout = { name: "", email: "", address: "" };

export function CheckoutContent({ summary }: CheckoutContentProps) {
  const cart = useCart();
  const isLoaded = useCartLoaded();
  const { clear } = useCartActions();
  const router = useRouter();
  // true after "Place order": clear() empties the cart before the page changes, and this
  // keeps "Your cart is empty" from flashing in between.
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Checkout>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: DEFAULT_VALUES,
    // Check a field when it loses focus, then on every change: no error while first typing.
    mode: "onTouched",
  });

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
        {/* noValidate: the Zod rules give the messages, not the browser's bubbles. */}
        <form className="w-full max-w-120" noValidate onSubmit={handleSubmit(placeOrder)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="checkout-name">Full name</FieldLabel>
              <Input
                id="checkout-name"
                type="text"
                autoComplete="name"
                aria-invalid={errors.name !== undefined}
                aria-describedby="checkout-name-error"
                {...register("name")}
              />
              <FieldError id="checkout-name-error" errors={[errors.name]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-email">Email</FieldLabel>
              <Input
                id="checkout-email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email !== undefined}
                aria-describedby="checkout-email-error"
                {...register("email")}
              />
              <FieldError id="checkout-email-error" errors={[errors.email]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-address">Address</FieldLabel>
              <Input
                id="checkout-address"
                type="text"
                autoComplete="street-address"
                aria-invalid={errors.address !== undefined}
                aria-describedby="checkout-address-error"
                {...register("address")}
              />
              <FieldError id="checkout-address-error" errors={[errors.address]} />
            </Field>
            <Button type="submit" size="lg" className="justify-self-start">
              Place order
            </Button>
          </FieldGroup>
        </form>
        <div className="w-full max-w-90">{summary}</div>
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

// header.tsx: the Navbar on every page (it lives in app/layout.tsx, not in the pages): the logo,
// the "Shop" link, sign-up, and the cart link with its count. It owns the sign-up dialog
// (open or not) and the welcome message after it. A Client Component: it has state, and the
// count comes from the cart, which lives in the browser.
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { focusRing } from "@/components/ui/focus-ring";
import { Modal } from "@/components/ui/modal";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useCart } from "@/features/cart/cart.hooks";
import { getItemCount } from "@/features/cart/cart.logic";
import { cn } from "@/lib/utils";
import { SHOP_HREF, ShopLink } from "./shop-link";

export function Header() {
  const cart = useCart();
  // Computed from the cart on every render, never stored.
  const itemCount = getItemCount(cart);
  const [showRegister, setShowRegister] = useState(false);
  // The name of the user who just signed up, for the welcome message. Empty until then.
  const [welcomeName, setWelcomeName] = useState("");

  function handleRegister(name: string): void {
    setWelcomeName(name);
    setShowRegister(false);
  }

  return (
    <>
      {/* Sticky, blurred and 82% opaque (DESIGN.md "Layout"); the content in the 1200px column. */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/82 backdrop-blur-md backdrop-saturate-140">
        <div className="mx-auto flex min-h-header max-w-frame flex-wrap items-center justify-between gap-4 px-page py-2">
          <Link
            className={cn("font-display font-bold text-foreground no-underline", focusRing)}
            href="/"
          >
            ShopBoard
          </Link>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              <li>
                {/* The prerendered page shows a plain link; the marked one replaces it per visit. */}
                <Suspense
                  fallback={
                    <Button asChild variant="ghost">
                      <Link href={SHOP_HREF}>Shop</Link>
                    </Button>
                  }
                >
                  <ShopLink />
                </Suspense>
              </li>
              <li>
                <Button variant="ghost" onClick={() => setShowRegister(true)}>
                  Sign up
                </Button>
              </li>
            </ul>
          </nav>
          <Link
            className={cn(
              "relative inline-flex size-tap items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted motion-reduce:transition-none",
              focusRing,
            )}
            href="/cart"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" />
            </svg>
            <Badge variant="count" className="absolute top-0.5 right-0.5" aria-hidden="true">
              {itemCount}
            </Badge>
          </Link>
        </div>
      </header>
      <Modal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        title="Create your account"
        titleId="register-title"
      >
        <RegisterForm onRegister={handleRegister} />
      </Modal>
      {welcomeName !== "" && (
        // DESIGN.md "Toast": bottom of the screen on mobile, bottom right and 360px from md.
        <ul
          className="pointer-events-none fixed inset-x-4 bottom-4 z-50 grid gap-2 md:left-auto md:w-toast"
          role="status"
        >
          <li className="pointer-events-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-md bg-primary px-4 py-3 text-primary-foreground shadow-dialog motion-safe:animate-slide-up">
            Account created. Welcome, {welcomeName}!
          </li>
        </ul>
      )}
    </>
  );
}

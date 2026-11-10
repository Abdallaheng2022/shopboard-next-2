// header.tsx: the Navbar on every page (it lives in app/layout.tsx, not in the pages): the logo,
// the "Shop" link, sign-up, and the cart link with its count. It owns the sign-up dialog
// (open or not) and the welcome Toast after it. A Client Component: it has state.
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { focusRing } from "@/components/ui/focus-ring";
import { Modal } from "@/components/ui/modal";
import { Toast } from "@/components/ui/toast";
import { RegisterForm } from "@/features/auth/components/register-form";
import { cn } from "@/lib/utils";
import { CartLink } from "./cart-link";
import { SHOP_HREF, ShopLink } from "./shop-link";

export function Header() {
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
          <CartLink />
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
      {welcomeName !== "" && <Toast>Account created. Welcome, {welcomeName}!</Toast>}
    </>
  );
}

// page.tsx: the page at "/checkout". The form shows at once: the page starts loading the
// products but doesn't await them. The summary waits for them alone, in its own <Suspense>,
// and if they fail its ErrorBoundary shows "Try again" while the form keeps working
// (AGENTS.md "Data, loading and errors"). No loading.tsx: the page itself never waits.
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { StatusMessage } from "@/components/ui/status-message";
import { CheckoutContent } from "@/features/checkout/components/checkout-content";
import { OrderSummary } from "@/features/checkout/components/order-summary";
import { loadProducts } from "@/features/products/products.api";

export default function CheckoutPage() {
  // Not awaited: OrderSummary reads the Promise with use() (Next.js docs, "Streaming data
  // with the use API").
  const products = loadProducts();
  return (
    <CheckoutContent
      summary={
        <ErrorBoundary message="We couldn't load your order summary. Please try again.">
          <Suspense fallback={<StatusMessage message="Loading summary…" />}>
            <OrderSummary products={products} />
          </Suspense>
        </ErrorBoundary>
      }
    />
  );
}

// error.tsx: shown when /cart can't load the products it needs for the lines (try
// API_BASE_URL with /fail/500). The saved cart is safe in the browser; only this page breaks.
// The message is fixed (AGENTS.md "Data, loading and errors").
"use client";

import { PageSection } from "@/components/layout/page-section";
import { ErrorMessage } from "@/components/ui/error-message";

interface CartErrorProps {
  retry: () => void;
}

export default function CartError({ retry }: CartErrorProps) {
  return (
    <PageSection>
      <ErrorMessage message="We couldn't load your cart. Please try again." retry={retry} />
    </PageSection>
  );
}

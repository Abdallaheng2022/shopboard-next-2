// error.tsx: shown when one product fails to load (a timeout, a 500). A product that doesn't
// exist is not an error: the page calls notFound(). Without this file, app/products/error.tsx
// would catch it and say "the products". The message is fixed (AGENTS.md rule 3).
"use client";

import { PageSection } from "@/components/layout/page-section";
import { ErrorMessage } from "@/components/ui/error-message";

interface ProductErrorProps {
  retry: () => void;
}

export default function ProductError({ retry }: ProductErrorProps) {
  return (
    <PageSection>
      <ErrorMessage message="We couldn't load this product. Please try again." retry={retry} />
    </PageSection>
  );
}

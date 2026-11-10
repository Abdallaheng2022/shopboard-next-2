// error.tsx: shown when /products fails to load (try API_BASE_URL with /fail/500). Only this
// folder breaks: the Navbar and the other pages keep working. "Try again" calls retry(), which
// loads the page again. A Client Component: it has a button. The message is fixed
// (AGENTS.md rule 3).
"use client";

import { PageSection } from "@/components/layout/page-section";
import { ErrorMessage } from "@/components/ui/error-message";

interface ProductsErrorProps {
  retry: () => void;
}

export default function ProductsError({ retry }: ProductsErrorProps) {
  return (
    <PageSection>
      <ErrorMessage message="We couldn't load the products. Please try again." retry={retry} />
    </PageSection>
  );
}

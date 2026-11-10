// error.tsx: the last safety net. An error no folder's error.tsx catches shows this instead of
// the page, inside the layout: the header and footer keep working. It must be a Client
// Component: it has a button. The message is fixed (AGENTS.md rule 3).
"use client";

import { PageSection } from "@/components/layout/page-section";
import { ErrorMessage } from "@/components/ui/error-message";

interface ErrorPageProps {
  // From Next.js: loads the page again, and shows it if it works.
  retry: () => void;
}

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <PageSection>
      <ErrorMessage message="Something went wrong. Please try again." retry={retry} />
    </PageSection>
  );
}

// not-found.tsx: the 404. It shows for every URL with no route (React Router's path="*") and
// for every notFound(), like /products/999 or /products/abc. Inside the layout: the Navbar stays.
import Link from "next/link";
import { PageSection, PageTitle } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";

export default function NotFoundPage() {
  return (
    <PageSection aria-labelledby="not-found-title">
      <StatusMessage
        message="There is no page at this address."
        action={
          <Button asChild>
            <Link href="/products">Back to the products</Link>
          </Button>
        }
      >
        <PageTitle id="not-found-title" className="mb-0">
          Page not found
        </PageTitle>
      </StatusMessage>
    </PageSection>
  );
}

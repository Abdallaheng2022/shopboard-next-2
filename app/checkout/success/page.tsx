// page.tsx: the page at "/checkout/success" (DESIGN.md "Thank-you"). Everything but the
// name is the same for everyone, so it is prerendered; the title with the name from ?name=
// streams in its own <Suspense>.
import Link from "next/link";
import { Suspense } from "react";
import { PageSection } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { ThankYouTitle } from "@/features/checkout/components/thank-you-title";

export default function CheckoutSuccessPage(props: PageProps<"/checkout/success">) {
  return (
    <PageSection aria-labelledby="success-title" className="grid justify-items-start gap-4">
      <Suspense fallback={<ThankYouTitle />}>
        <ThankYouTitle searchParams={props.searchParams} />
      </Suspense>
      <p className="text-muted-foreground">Your order is placed.</p>
      <Button asChild size="lg">
        <Link href="/products">Keep shopping</Link>
      </Button>
    </PageSection>
  );
}

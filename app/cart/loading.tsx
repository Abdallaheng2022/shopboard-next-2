// loading.tsx: shown at once when someone opens /cart, while the page waits for the
// products. The same message CartContent shows while the browser reads the saved cart, so
// the two waits look like one.
import { PageSection } from "@/components/layout/page-section";
import { StatusMessage } from "@/components/ui/status-message";

export default function CartLoading() {
  return (
    <PageSection aria-busy="true">
      <StatusMessage message="Loading cart…" />
    </PageSection>
  );
}

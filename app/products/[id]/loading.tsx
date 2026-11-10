// loading.tsx: shown at once when someone opens a product, while the page waits for it.
import { PageSection } from "@/components/layout/page-section";
import { StatusMessage } from "@/components/ui/status-message";

export default function ProductLoading() {
  return (
    <PageSection aria-busy="true">
      <StatusMessage message="Loading product…" />
    </PageSection>
  );
}

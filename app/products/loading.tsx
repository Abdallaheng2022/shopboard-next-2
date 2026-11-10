// loading.tsx: shown at once when someone opens /products, while the page waits for the
// products. The layout and the Navbar keep working. Six grey cards the size of real ones, in
// the same grid, so the page doesn't jump when the products arrive.
import { PageSection } from "@/components/layout/page-section";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusMessage } from "@/components/ui/status-message";
import { ProductGrid } from "@/features/products/components/product-grid";

// One id per placeholder card. Fixed ids, never the index.
const SKELETON_IDS = [
  "skeleton-1",
  "skeleton-2",
  "skeleton-3",
  "skeleton-4",
  "skeleton-5",
  "skeleton-6",
];

export default function ProductsLoading() {
  return (
    <PageSection aria-busy="true">
      <StatusMessage message="Loading products…" className="mb-4" />
      <ProductGrid>
        {SKELETON_IDS.map((id) => (
          <Skeleton key={id} className="min-h-75" />
        ))}
      </ProductGrid>
    </PageSection>
  );
}

// products-content.tsx: one of the three screens of the loaded products: empty store, no
// match, or the grid. It holds no state: ProductsSection picks the view. Empty and no-match
// are not errors, so they are messages here, not error.tsx.
import { StatusMessage } from "@/components/ui/status-message";
import type { ProductsView } from "../products.state";
import type { Product } from "../products.types";
import { ProductCard } from "./product-card";
import { ProductGrid } from "./product-grid";

interface ProductsContentProps {
  view: ProductsView;
  // The products that match the filters.
  products: readonly Product[];
}

export function ProductsContent({ view, products }: ProductsContentProps) {
  switch (view) {
    case "empty-store":
      return (
        <StatusMessage message="No products are available right now. Please check back later." />
      );
    case "no-match":
      return (
        <StatusMessage message="No products match your search. Try another name or category." />
      );
    case "list":
      return (
        <ProductGrid>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </ProductGrid>
      );
  }
}

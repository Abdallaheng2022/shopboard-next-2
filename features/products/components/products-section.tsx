// products-section.tsx: the /products page's content: the title, the filters and the products.
// It gets the products already loaded (the page awaited them on the server) and owns the
// filters. A Client Component: the filters are state, and the user changes them.
"use client";

import { useMemo, useState } from "react";
import { PageSection, PageTitle } from "@/components/layout/page-section";
import { applyFilters, getCategories } from "../products.logic";
import { getProductsView, INITIAL_FILTERS } from "../products.state";
import type { Filters, Product } from "../products.types";
import { ProductControls } from "./product-controls";
import { ProductsContent } from "./products-content";

interface ProductsSectionProps {
  products: readonly Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  // Only this part uses the filters, so the state stays here.
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  // Computed from state and the loaded products, never stored.
  // useMemo: the categories depend on the products only. Typing changes `filters`, not
  // `products`, so with thousands of products this loop is skipped on every key.
  const categories = useMemo(() => getCategories(products), [products]);
  // No useMemo here: this component renders only when `filters` changes, and then the filter
  // must run again anyway, so useMemo would never skip (it would only add a comparison).
  const visibleProducts = applyFilters(products, filters);

  return (
    <PageSection aria-labelledby="products-title">
      <PageTitle id="products-title">Products</PageTitle>
      {/* From lg: the filters in a 260px sidebar, the products beside them. */}
      <div className="grid items-start gap-x-8 gap-y-5 lg:grid-cols-(--sidebar-columns)">
        <ProductControls
          filters={filters}
          categories={categories}
          disabled={products.length === 0}
          onChange={setFilters}
        />
        <div>
          <ProductsContent
            view={getProductsView(products.length, visibleProducts.length)}
            products={visibleProducts}
          />
        </div>
      </div>
    </PageSection>
  );
}

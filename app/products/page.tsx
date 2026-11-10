// page.tsx: the page at "/products". It awaits the products on the server (no useEffect, no
// loading state here): loading.tsx shows while it waits, error.tsx if it fails. The filters
// are state, so the products go to a Client Component.
import { ProductsSection } from "@/features/products/components/products-section";
import { loadProducts } from "@/features/products/products.api";

export default async function ProductsPage() {
  const products = await loadProducts();
  return <ProductsSection products={products} />;
}

// page.tsx: the page at "/cart". The cart lives in the browser, but its lines need the
// products' names and prices: the page awaits them on the server (no useEffect), loading.tsx
// shows while it waits, error.tsx if it fails. The cart is browser state, so the products go
// to a Client Component.
import { CartContent } from "@/features/cart/components/cart-content";
import { loadProducts } from "@/features/products/products.api";

export default async function CartPage() {
  const products = await loadProducts();
  return <CartContent products={products} />;
}

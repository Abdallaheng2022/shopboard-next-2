// page.tsx: the page at "/products/:id": one product, loaded from the API by its id.
// A Server Component: only AddToCartButton's JavaScript reaches the browser. loading.tsx shows
// while it waits; an unknown or invalid id calls notFound(), so app/not-found.tsx shows.
import { notFound } from "next/navigation";
import { PageSection } from "@/components/layout/page-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { headingVariants } from "@/components/ui/heading";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { ProductArt } from "@/features/products/components/product-art";
import { ProductPrice } from "@/features/products/components/product-price";
import { loadProduct } from "@/features/products/products.api";

// PageProps (from `next typegen`) types params from the folder path: { id: string }.
export default async function ProductPage(props: PageProps<"/products/[id]">) {
  // params is a Promise in Next.js 16. The ":id" part is always a string: "abc" or "1.5"
  // is not a product id, so it gets the 404 without asking the API.
  const { id } = await props.params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId <= 0) notFound();

  // null: the API has no product with this id (like /products/99999).
  const product = await loadProduct(productId);
  if (product === null) notFound();

  return (
    <PageSection>
      <Card layout="tile">
        <ProductArt />
        <h1 className={headingVariants({ level: 1 })}>{product.name}</h1>
        <Badge variant="category">{product.category}</Badge>
        <ProductPrice price={product.price} />
        <AddToCartButton product={product} className="mt-auto self-start" />
      </Card>
    </PageSection>
  );
}

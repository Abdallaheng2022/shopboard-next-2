// cart-row.tsx: one line of the cart (DESIGN.md "Cart line"): the product, its quantity with
// − and +, "Remove" and the line total. It holds no state: a click tells CartContent which
// action, through onAction.
import Link from "next/link";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { focusRing } from "@/components/ui/focus-ring";
import { headingVariants } from "@/components/ui/heading";
import { ProductPrice } from "@/features/products/components/product-price";
import type { Product } from "@/features/products/products.types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CartAction } from "../cart.types";

interface CartRowProps {
  product: Product;
  quantity: number;
  onAction: (action: CartAction, product: Product) => void;
}

// memo: a click on one line re-renders CartContent; a line whose product, quantity and
// onAction are the same is skipped (v1 measured this with a 300-line cart).
export const CartRow = memo(function CartRow({ product, quantity, onAction }: CartRowProps) {
  return (
    <Card className="md:flex md:items-center md:justify-between md:gap-6">
      <div className="grid gap-1">
        <h2 className={headingVariants({ level: 3 })}>
          {/* Like the product card's name: the title's look, underlined on hover and focus. */}
          <Link
            href={`/products/${product.id}`}
            className={cn(
              "text-inherit no-underline hover:underline focus-visible:underline",
              focusRing,
            )}
          >
            {product.name}
          </Link>
        </h2>
        <Badge variant="category">{product.category}</Badge>
        <p className="text-sm text-muted-foreground tabular-nums">
          {formatPrice(product.price)} each
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          aria-label={`Remove one ${product.name}`}
          onClick={() => onAction("decrease", product)}
        >
          −
        </Button>
        <span className="min-w-8 text-center font-semibold tabular-nums">
          <span className="sr-only">Quantity: </span>
          {quantity}
        </span>
        {/* Out of stock: one more can't be added (increase checks it too). */}
        <Button
          variant="secondary"
          size="sm"
          aria-label={`Add one more ${product.name}`}
          disabled={!product.inStock}
          onClick={() => onAction("increase", product)}
        >
          +
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Remove ${product.name} from the cart`}
          onClick={() => onAction("remove", product)}
        >
          Remove
        </Button>
        <ProductPrice price={product.price * quantity} className="my-0 ml-auto md:ml-0" />
      </div>
    </Card>
  );
});

// product-grid.tsx: the grid of product cards (DESIGN.md "Product grid"): as many 210px+
// columns as fit, with a fluid gap. One source for the real cards and the loading skeleton.
import type { ReactNode } from "react";

export function ProductGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-(--product-grid-columns) gap-grid">{children}</div>;
}

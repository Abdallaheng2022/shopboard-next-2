// product-art.tsx: the 4:3 placeholder art at the top of a product (DESIGN.md "Product card":
// a dot grid over a primary-soft → muted gradient, until products have images). One source for
// the card in the grid and the product page.
export function ProductArt() {
  return (
    <div
      aria-hidden="true"
      className="mb-3 aspect-4/3 rounded-3xl bg-(image:--product-art) bg-(length:--product-art-size)"
    />
  );
}

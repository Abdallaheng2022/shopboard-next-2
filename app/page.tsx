// page.tsx: the page at "/": the hero, with "Shop now" to /products. Nothing here waits for
// data, so the whole page is prerendered and shows at once.
import { Hero } from "@/features/products/components/hero";

export default function HomePage() {
  return <Hero />;
}

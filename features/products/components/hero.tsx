// hero.tsx: the big title on "/", with a link to the products (DESIGN.md "Hero").
// One column on mobile; from hero-split (900px), the text on the left and the art on the right.
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headingVariants } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      className="py-hero hero-split:grid hero-split:grid-cols-(--hero-columns) hero-split:items-center hero-split:gap-x-12"
      aria-labelledby="hero-title"
    >
      {/* text-hero after headingVariants: cn() keeps the hero size, not h1's. */}
      <h1
        id="hero-title"
        className={cn(
          headingVariants({ level: 1 }),
          "max-w-hero-title text-hero motion-safe:animate-hero",
        )}
      >
        Sell smarter.
      </h1>
      <p className="mt-4 mb-6 max-w-hero-text text-lead text-muted-foreground motion-safe:animate-hero">
        Everything your shop needs, in one board.
      </p>
      <div className="motion-safe:animate-hero">
        <Button asChild size="lg">
          <Link href="/products">Shop now</Link>
        </Button>
      </div>
      {/* The art: only from hero-split, in the second column, beside the three rows of text. */}
      <div
        aria-hidden="true"
        className="hidden min-h-80 rounded-lg bg-muted bg-(image:--hero-art) hero-split:col-start-2 hero-split:row-span-3 hero-split:row-start-1 hero-split:block"
      />
    </section>
  );
}
